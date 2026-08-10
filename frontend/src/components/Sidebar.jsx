import {
  BookOpen,
  HelpCircle,
  LogOut,
  MessageSquare,
  Plus,
  Ticket,
  User,
} from "lucide-react";
import ITMLogo from "./ITMLogo";
import { ITM } from "../theme";

const NAV_ITEMS = [
  { id: "chat", label: "Chat", icon: MessageSquare, active: true },
  { id: "kb", label: "Knowledge Base", icon: BookOpen, active: false },
  { id: "faqs", label: "FAQs", icon: HelpCircle, active: false },
  { id: "tickets", label: "My Tickets", icon: Ticket, active: false },
  { id: "profile", label: "Profile", icon: User, active: false },
];

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onClearChats,
  user,
  onLogout,
}) {
  return (
    <aside
      style={{
        width: "220px",
        flexShrink: 0,
        background: ITM.navy,
        color: ITM.white,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          style={{
            background: ITM.white,
            padding: "8px 10px",
            borderRadius: "6px",
            marginBottom: "12px",
          }}
        >
          <ITMLogo variant="vertical" height={48} />
        </div>
        <button
          type="button"
          onClick={onNewChat}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: ITM.gold,
            color: ITM.navy,
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          <Plus size={16} />
          New chat
        </button>
      </div>

      <nav style={{ padding: "12px 10px", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === "chat";
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.id === "chat" ? onNewChat : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 14px",
                marginBottom: "4px",
                borderRadius: "6px",
                border: "none",
                cursor: item.id === "chat" ? "pointer" : "default",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 500,
                background: isActive ? "rgba(245, 158, 11, 0.15)" : "transparent",
                color: isActive ? ITM.goldLight : "rgba(255,255,255,0.85)",
              }}
            >
              <Icon size={18} style={{ color: ITM.gold, flexShrink: 0 }} />
              {item.label}
            </button>
          );
        })}

        {chats.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                color: "rgba(255,255,255,0.5)",
                padding: "8px 14px",
              }}
            >
              RECENT
            </p>
            {chats.slice(0, 8).map((chat) => {
              const active = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  style={{
                    width: "100%",
                    padding: "8px 14px",
                    marginBottom: "2px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "12px",
                    background: active ? "rgba(255,255,255,0.1)" : "transparent",
                    color: active ? ITM.white : "rgba(255,255,255,0.7)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chat.title}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {user?.email && (
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.6)",
              padding: "8px 10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.email}
          </p>
        )}
        <button
          type="button"
          onClick={onClearChats}
          style={{
            width: "100%",
            padding: "8px 10px",
            fontSize: "12px",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.65)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          Clear history
        </button>
        <button
          type="button"
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 10px",
            fontSize: "13px",
            background: "transparent",
            border: "none",
            color: ITM.goldLight,
            cursor: "pointer",
          }}
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}
