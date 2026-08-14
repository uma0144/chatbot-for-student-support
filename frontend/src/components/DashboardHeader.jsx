import { ITM } from "../theme";

const VIEW_META = {
  chat: { title: "ITM Student Support", subtitle: "AI-powered student assistant" },
  kb: { title: "Knowledge Base", subtitle: "Official ITM University information" },
  faqs: { title: "FAQs", subtitle: "Frequently asked admission questions" },
  tickets: { title: "My Tickets", subtitle: "Support requests and status" },
  profile: { title: "Profile", subtitle: "Your account and activity" },
};

export default function DashboardHeader({ activeView }) {
  const meta = VIEW_META[activeView] || VIEW_META.chat;

  return (
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
        <div style={{ fontWeight: 800, fontSize: "17px", color: ITM.navy }}>{meta.title}</div>
        <div style={{ fontSize: "13px", color: ITM.muted, marginTop: "2px" }}>{meta.subtitle}</div>
      </div>
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
    </header>
  );
}
