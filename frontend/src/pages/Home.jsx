import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import { sendMessage } from "../services/api";
import { ITM } from "../theme";

let idCounter = 100;
const nextId = () => idCounter++;

export default function Home({ user, onLogout }) {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const handleNewChat = () => setActiveChatId(null);
  const handleSelectChat = (chatId) => setActiveChatId(chatId);
  const handleClearChats = () => {
    setChats([]);
    setActiveChatId(null);
  };

  const handleSend = async (text) => {
    const userMessage = { id: nextId(), sender: "user", text };
    let chatId = activeChatId;

    setChats((prev) => {
      if (chatId && prev.some((c) => c.id === chatId)) {
        return prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, userMessage] } : c
        );
      }
      const newChat = { id: nextId(), title: text.slice(0, 30), messages: [userMessage] };
      chatId = newChat.id;
      return [newChat, ...prev];
    });

    setActiveChatId(chatId);
    setIsTyping(true);

    try {
      const response = await sendMessage(text);
      const botMessage = { id: nextId(), sender: "bot", text: response.answer };
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, botMessage] } : c
        )
      );
    } catch (error) {
      console.error(error);
      const botMessage = {
        id: nextId(),
        sender: "bot",
        text: "Unable to connect to the server. Please try again.",
      };
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, botMessage] } : c
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full" style={{ background: ITM.bg }}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClearChats={handleClearChats}
        user={user}
        onLogout={onLogout}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <header
          style={{
            background: ITM.white,
            borderBottom: `1px solid ${ITM.border}`,
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "16px", color: ITM.navy }}>
              ITM Student Support
            </div>
            <div style={{ fontSize: "12px", color: ITM.muted }}>AI-powered student assistant</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span style={{ fontSize: "13px", color: ITM.muted, fontWeight: 500 }}>Online</span>
          </div>
        </header>

        <main
          className="flex flex-col flex-1 min-h-0"
          style={{ background: "#f8fafc" }}
        >
          <ChatBox
            messages={activeChat?.messages ?? []}
            isTyping={isTyping}
            onSuggestion={handleSend}
          />
          <MessageInput onSend={handleSend} disabled={isTyping} />
        </main>
      </div>
    </div>
  );
}
