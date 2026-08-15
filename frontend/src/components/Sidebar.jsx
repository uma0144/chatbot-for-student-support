import {
  BookOpen,
  Clock,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Ticket,
  User,
} from "lucide-react";
import { ITM } from "../theme";

const NAV_ITEMS = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "history", label: "Chat History", icon: Clock },
  { id: "kb", label: "Knowledge Base", icon: BookOpen },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "tickets", label: "My Tickets", icon: Ticket },
  { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar({
  chats,
  activeChatId,
  activeView,
  onNavigate,
  onNewChat,
  onSelectChat,
  onClearChats,
  user,
  onLogout,
  isAdmin,
}) {
  const navItems = isAdmin
    ? [...NAV_ITEMS, { id: "admin", label: "Admin", icon: LayoutDashboard }]
    : NAV_ITEMS;

  return (
    <aside
      style={{
        width: "260px",
        flexShrink: 0,
        background: `linear-gradient(180deg, ${ITM.navy} 0%, ${ITM.navyDark} 100%)`,
        color: ITM.white,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          padding: "24px 18px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: ITM.radiusSm,
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "12px",
              color: ITM.goldLight,
            }}
          >
            ITM
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.2 }}>
              Student Support
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
              ITM University
            </div>
          </div>
        </div>
        <button type="button" onClick={onNewChat} className="itm-sidebar-btn-new">
          <Plus size={18} strokeWidth={2.5} />
          New chat
        </button>
      </div>

      <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`itm-nav-btn${isActive ? " itm-nav-btn--active" : ""}`}
            >
              <Icon
                size={18}
                style={{ color: ITM.gold, flexShrink: 0 }}
                strokeWidth={isActive ? 2.25 : 2}
              />
              {item.label}
            </button>
          );
        })}

        {activeView === "chat" && chats.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.45)",
                padding: "8px 14px 10px",
              }}
            >
              RECENT CHATS
            </p>
            {chats.slice(0, 10).map((chat) => {
              const active = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    marginBottom: "4px",
                    borderRadius: ITM.radiusSm,
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    fontWeight: active ? 600 : 400,
                    background: active ? "rgba(255,255,255,0.12)" : "transparent",
                    color: active ? ITM.white : "rgba(255,255,255,0.72)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s",
                  }}
                >
                  {chat.title}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <div
        style={{
          padding: "16px 14px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.12)",
        }}
      >
        {user?.email && typeof user.email === "string" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 8px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.2)",
                color: ITM.goldLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {user.email.charAt(0).toUpperCase()}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.75)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.3,
              }}
            >
              {user.email}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={onClearChats}
          className="itm-nav-btn"
          style={{ fontSize: "12px", padding: "8px 14px" }}
        >
          Clear history
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="itm-nav-btn"
          style={{ color: ITM.goldLight, fontWeight: 600 }}
        >
          <LogOut size={18} style={{ color: ITM.gold }} />
          Log out
        </button>
      </div>
    </aside>
  );
}
