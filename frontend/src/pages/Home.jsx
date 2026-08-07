import { useState } from "react";
import { ChevronDown, UserCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import { sendMessage } from "../services/api";

let idCounter = 100;
const nextId = () => idCounter++;

export default function Home({ user, onLogout }) {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const handleNewChat = () => {
    setActiveChatId(null);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  const handleClearChats = () => {
    setChats([]);
    setActiveChatId(null);
  };

  const handleSend = async (text) => {
    const userMessage = {
      id: nextId(),
      sender: "user",
      text,
    };

    let chatId = activeChatId;

    setChats((prev) => {
      if (chatId && prev.some((c) => c.id === chatId)) {
        return prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, userMessage] }
            : c
        );
      }

      const newChat = {
        id: nextId(),
        title: text.slice(0, 30),
        messages: [userMessage],
      };

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
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, botMessage] }
            : c
        )
      );
    } catch (error) {
      console.error(error);

      const botMessage = {
        id: nextId(),
        sender: "bot",
        text: "❌ Unable to connect to the backend.",
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, botMessage] }
            : c
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#eef1f6]">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClearChats={handleClearChats}
        user={user}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px",
          }}
        >
          <button
            className="text-gray-800 bg-white hover:bg-gray-50 shadow-sm"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "16px",
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: "999px",
              border: "none",
              cursor: "default",
            }}
          >
            Student AI
            <ChevronDown size={17} className="text-gray-400" />
          </button>

          <div
            className="bg-white shadow-sm"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserCircle size={24} className="text-gray-400" />
          </div>
        </div>

        <ChatBox
          messages={activeChat?.messages ?? []}
          isTyping={isTyping}
          onSuggestion={handleSend}
        />

        <MessageInput
          onSend={handleSend}
          disabled={isTyping}
        />
      </div>
    </div>
  );
}