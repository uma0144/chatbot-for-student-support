import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import ITMLogo from "../components/ITMLogo";
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
    <div
      className="flex flex-col h-screen w-full"
      style={{ background: ITM.bg }}
    >
      <header
        style={{
          background: ITM.navy,
          color: ITM.white,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <ITMLogo height={40} />
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>ITM Student Support</div>
            <div style={{ fontSize: "12px", color: ITM.goldLight }}>AI Assistant</div>
          </div>
        </div>
        {user?.email && (
          <span style={{ fontSize: "13px", opacity: 0.9 }}>{user.email}</span>
        )}
      </header>

      <div className="flex flex-1 min-h-0" style={{ padding: "12px", gap: "12px" }}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onClearChats={handleClearChats}
          user={user}
          onLogout={onLogout}
        />

        <main
          className="flex flex-col flex-1 min-w-0"
          style={{
            background: ITM.white,
            borderRadius: "6px",
            borderTop: `3px solid ${ITM.navy}`,
            overflow: "hidden",
          }}
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
