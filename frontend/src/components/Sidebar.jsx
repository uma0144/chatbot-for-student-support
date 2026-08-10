import { Plus, MessageSquare, Trash2, LogOut } from "lucide-react";
import { ITM } from "../theme";

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
    <div style={{ width: "260px", flexShrink: 0 }}>
      <div
        style={{
          height: "100%",
          background: ITM.white,
          borderRadius: "6px",
          borderTop: `3px solid ${ITM.gold}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px" }}>
          <button
            type="button"
            onClick={onNewChat}
            className="itm-btn-primary"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "11px",
            }}
          >
            <Plus size={18} />
            New session
          </button>
        </div>

        <div style={{ flex: 1, padding: "0 12px", overflowY: "auto" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: ITM.muted,
              padding: "8px 8px",
              letterSpacing: "0.5px",
            }}
          >
            SESSIONS
          </h2>

          {chats.length === 0 && (
            <p style={{ fontSize: "13px", color: ITM.muted, padding: "8px" }}>
              No chats yet.
            </p>
          )}

          {chats.map((chat) => {
            const active = chat.id === activeChatId;
            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => onSelectChat(chat.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  marginBottom: "4px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background: active ? "#f8fafc" : "transparent",
                  color: active ? ITM.navy : ITM.text,
                  borderLeft: active ? `3px solid ${ITM.gold}` : "3px solid transparent",
                }}
              >
                <MessageSquare size={15} style={{ flexShrink: 0, color: ITM.gold }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {chat.title}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            padding: "12px",
            borderTop: `1px solid ${ITM.border}`,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                fontSize: "12px",
                color: ITM.muted,
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</span>
              <button
                type="button"
                onClick={onLogout}
                title="Log out"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: ITM.muted,
                  flexShrink: 0,
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onClearChats}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 12px",
              fontSize: "13px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: ITM.text,
              borderRadius: "4px",
            }}
          >
            <Trash2 size={16} />
            Clear sessions
          </button>
        </div>
      </div>
    </div>
  );
}
