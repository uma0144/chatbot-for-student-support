import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import DashboardHeader from "../components/DashboardHeader";
import KnowledgeBase from "./KnowledgeBase";
import FAQs from "./FAQs";
import Tickets from "./Tickets";
import Profile from "./Profile";
import ChatHistory from "./ChatHistory";
import AdminDashboard from "./AdminDashboard";
import { clearChatHistory, sendMessageStream } from "../services/api";
import { ITM, formatMessageTime } from "../theme";

let idCounter = 100;
const nextId = () => idCounter++;

export default function Home({ user, onLogout }) {
  const [activeView, setActiveView] = useState("chat");
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  const closeMobileNav = () => setMobileNavOpen(false);

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
    closeMobileNav();
  };

  const handleNewChat = () => {
    setActiveView("chat");
    setActiveChatId(null);
    closeMobileNav();
  };

  const handleSelectChat = (chatId) => {
    setActiveView("chat");
    setActiveChatId(chatId);
    closeMobileNav();
  };

  const handleClearChats = async () => {
    setChats([]);
    setActiveChatId(null);
    try {
      await clearChatHistory();
    } catch (err) {
      console.warn("Could not clear server history:", err);
    }
  };

  const handleAskInChat = (question) => {
    setActiveView("chat");
    closeMobileNav();
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
        language,
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
      case "history":
        return <ChatHistory onAskChat={handleAskInChat} />;
      case "admin":
        return isAdmin ? <AdminDashboard /> : <Profile user={user} />;
      default:
        return (
          <div className="itm-chat-layout">
            <ChatBox
              messages={activeChat?.messages ?? []}
              isTyping={isTyping}
              onSuggestion={handleSend}
              language={language}
            />
            <MessageInput onSend={handleSend} disabled={isTyping} language={language} />
          </div>
        );
    }
  };

  return (
    <div className="itm-app-shell" style={{ background: ITM.bg }}>
      {mobileNavOpen && (
        <button
          type="button"
          className="itm-sidebar-overlay"
          aria-label="Close menu"
          onClick={closeMobileNav}
        />
      )}

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
        isAdmin={isAdmin}
        isMobileOpen={mobileNavOpen}
        onClose={closeMobileNav}
      />

      <div className="itm-main-column">
        <DashboardHeader
          activeView={activeView}
          language={language}
          onLanguageChange={setLanguage}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main
          className={`itm-main-content${activeView === "chat" ? " itm-chat-main" : " itm-dashboard-main"}`}
        >
          {renderMain()}
        </main>
      </div>
    </div>
  );
}
