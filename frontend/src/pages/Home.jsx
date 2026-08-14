import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import DashboardHeader from "../components/DashboardHeader";
import KnowledgeBase from "./KnowledgeBase";
import FAQs from "./FAQs";
import Tickets from "./Tickets";
import Profile from "./Profile";
import { sendMessageStream } from "../services/api";
import { ITM, formatMessageTime } from "../theme";

let idCounter = 100;
const nextId = () => idCounter++;

export default function Home({ user, onLogout }) {
  const [activeView, setActiveView] = useState("chat");
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const appendToBotMessage = (chatId, botId, updater) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: c.messages.map((m) => (m.id === botId ? { ...m, ...updater(m) } : m)),
            }
          : c
      )
    );
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    if (view === "chat") {
      setActiveChatId(null);
    }
  };

  const handleNewChat = () => {
    setActiveView("chat");
    setActiveChatId(null);
  };

  const handleSelectChat = (chatId) => {
    setActiveView("chat");
    setActiveChatId(chatId);
  };

  const handleClearChats = () => {
    setChats([]);
    setActiveChatId(null);
  };

  const handleAskInChat = (question) => {
    setActiveView("chat");
    handleSend(question);
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

    const botId = nextId();
    let streamStarted = false;

    const ensureBotMessage = () => {
      if (streamStarted) return;
      streamStarted = true;
      setIsTyping(false);
      const botMessage = {
        id: botId,
        sender: "bot",
        text: "",
        time: formatMessageTime(),
        streaming: true,
      };
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, botMessage] } : c))
      );
    };

    try {
      await sendMessageStream(text, {
        onToken: (chunk) => {
          ensureBotMessage();
          appendToBotMessage(chatId, botId, (m) => ({ text: m.text + chunk }));
        },
        onReplace: (content) => {
          ensureBotMessage();
          appendToBotMessage(chatId, botId, () => ({ text: content }));
        },
        onDone: () => {
          ensureBotMessage();
          appendToBotMessage(chatId, botId, () => ({ streaming: false }));
        },
      });
    } catch (error) {
      console.error(error);
      const detail =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";

      if (streamStarted) {
        appendToBotMessage(chatId, botId, () => ({
          text: detail,
          streaming: false,
        }));
      } else {
        const botMessage = {
          id: botId,
          sender: "bot",
          text: detail,
          time: formatMessageTime(),
        };
        setChats((prev) =>
          prev.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, botMessage] } : c
          )
        );
      }
    } finally {
      setIsTyping(false);
    }
  };

  const renderMain = () => {
    switch (activeView) {
      case "kb":
        return <KnowledgeBase onAskChat={handleAskInChat} />;
      case "faqs":
        return <FAQs onAskChat={handleAskInChat} />;
      case "tickets":
        return <Tickets />;
      case "profile":
        return <Profile user={user} />;
      default:
        return (
          <>
            <ChatBox
              messages={activeChat?.messages ?? []}
              isTyping={isTyping}
              onSuggestion={handleSend}
            />
            <MessageInput onSend={handleSend} disabled={isTyping} />
          </>
        );
    }
  };

  return (
    <div className="flex h-screen w-full" style={{ background: ITM.bg }}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        activeView={activeView}
        onNavigate={handleNavigate}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClearChats={handleClearChats}
        user={user}
        onLogout={onLogout}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <DashboardHeader activeView={activeView} />
        <main
          className={`flex flex-col flex-1 min-h-0${activeView === "chat" ? " itm-chat-main" : " itm-dashboard-main"}`}
        >
          {renderMain()}
        </main>
      </div>
    </div>
  );
}
