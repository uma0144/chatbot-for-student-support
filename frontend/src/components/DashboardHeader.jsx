import { Menu } from "lucide-react";

const VIEW_META = {
  chat: { title: "ITM Student Support", subtitle: "AI-powered student assistant" },
  history: { title: "Chat History", subtitle: "Your saved questions and answers" },
  kb: { title: "Knowledge Base", subtitle: "Official ITM University information" },
  faqs: { title: "FAQs", subtitle: "Frequently asked admission questions" },
  tickets: { title: "My Tickets", subtitle: "Support requests and status" },
  profile: { title: "Profile", subtitle: "Your account and activity" },
  admin: { title: "Admin Dashboard", subtitle: "Users, stats, and PDF uploads" },
};

export default function DashboardHeader({ activeView, language, onLanguageChange, onMenuClick }) {
  const meta = VIEW_META[activeView] || VIEW_META.chat;

  return (
    <header className="itm-dashboard-header">
      <div className="itm-header-left">
        <button
          type="button"
          className="itm-header-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={2.25} />
        </button>
        <div className="itm-header-titles">
          <div className="itm-header-title">{meta.title}</div>
          <div className="itm-header-subtitle">{meta.subtitle}</div>
        </div>
      </div>

      <div className="itm-header-actions">
        {(activeView === "chat" || activeView === "history") && onLanguageChange && (
          <select
            className="itm-lang-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Response language"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        )}

        {activeView === "chat" && (
          <div className="itm-header-online">
            <span className="itm-online-dot" />
            <span>Online</span>
          </div>
        )}
      </div>
    </header>
  );
}
