import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import { sendMessage } from "../services/api";
import { ITM, formatMessageTime } from "../theme";

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
    const now = formatMessageTime();
    const userMessage = { id: nextId(), sender: "user", text, time: now };
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
      const botMessage = {
        id: nextId(),
        sender: "bot",
        text: response.answer,
        time: formatMessageTime(),
      };
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
        time: formatMessageTime(),
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
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            boxShadow: ITM.shadowSm,
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: "17px", color: ITM.navy }}>
              ITM Student Support
            </div>
            <div style={{ fontSize: "13px", color: ITM.muted, marginTop: "2px" }}>
              AI-powered student assistant
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: ITM.radiusFull,
              background: ITM.surface,
              border: `1px solid ${ITM.border}`,
            }}
          >
            <span
              className="itm-online-dot"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: ITM.success,
              }}
            />
            <span style={{ fontSize: "13px", color: ITM.text, fontWeight: 600 }}>Online</span>
          </div>
        </header>

        <main
          className="flex flex-col flex-1 min-h-0"
          style={{ background: ITM.surface }}
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
