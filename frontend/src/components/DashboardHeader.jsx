import { ITM } from "../theme";

const VIEW_META = {
  chat: { title: "ITM Student Support", subtitle: "AI-powered student assistant" },
  history: { title: "Chat History", subtitle: "Your saved questions and answers" },
  kb: { title: "Knowledge Base", subtitle: "Official ITM University information" },
  faqs: { title: "FAQs", subtitle: "Frequently asked admission questions" },
  tickets: { title: "My Tickets", subtitle: "Support requests and status" },
  profile: { title: "Profile", subtitle: "Your account and activity" },
  admin: { title: "Admin Dashboard", subtitle: "Users, stats, and PDF uploads" },
};

export default function DashboardHeader({ activeView, language, onLanguageChange }) {
  const meta = VIEW_META[activeView] || VIEW_META.chat;

  return (
    <header
      className="itm-dashboard-header"
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
        <div style={{ fontWeight: 800, fontSize: "17px", color: ITM.navy }}>{meta.title}</div>
        <div style={{ fontSize: "13px", color: ITM.muted, marginTop: "2px" }}>{meta.subtitle}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {(activeView === "chat" || activeView === "history") && onLanguageChange && (
          <select
            className="itm-lang-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Response language"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
        )}

        {activeView === "chat" && (
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
        )}
      </div>
    </header>
  );
}
