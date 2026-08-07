import { Plus, MessageSquare, Search, Settings, Trash2, GraduationCap, LogOut } from "lucide-react";

export default function Sidebar({ chats, activeChatId, onNewChat, onSelectChat, onClearChats, user, onLogout }) {
  return (
    <div style={{ width: "280px", flexShrink: 0, padding: "16px" }}>
      <div
        className="bg-white shadow-sm"
        style={{
          height: "100%",
          borderRadius: "24px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            className="bg-indigo-50"
            style={{ width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <GraduationCap size={20} className="text-indigo-600" />
          </div>
          <span className="text-gray-800" style={{ fontSize: "15px", fontWeight: 700 }}>Student AI</span>
        </div>

        <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={onNewChat}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-100"
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px", borderRadius: "16px", fontSize: "15px", fontWeight: 600, border: "none", cursor: "pointer" }}
          >
            <Plus size={18} />
            New chat
          </button>

          <button
            className="text-gray-500 hover:bg-gray-50"
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "12px", fontSize: "14px", border: "none", background: "transparent", cursor: "default", textAlign: "left" }}
          >
            <Search size={17} />
            Search chats
          </button>
        </div>

        <div style={{ flex: 1, padding: "0 16px", overflowY: "auto" }}>
          <h2 className="text-gray-400" style={{ fontSize: "11px", fontWeight: 700, padding: "8px 10px", marginTop: "8px", letterSpacing: "0.4px" }}>
            CHATS
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {chats.length === 0 && (
              <p className="text-gray-400" style={{ fontSize: "14px", padding: "8px 10px" }}>No chats yet.</p>
            )}

            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={chat.id === activeChatId ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50 text-gray-600"}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px 14px",
                  borderRadius: "14px",
                  fontSize: "14.5px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <MessageSquare
                  size={16}
                  className={chat.id === activeChatId ? "text-indigo-500" : "text-gray-400"}
                  style={{ flexShrink: 0 }}
                />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{chat.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {user && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "12px" }}>
              <span className="text-gray-600" style={{ fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-gray-700"
                style={{ flexShrink: 0, marginLeft: "10px", background: "transparent", border: "none", cursor: "pointer" }}
                title="Log out"
              >
                <LogOut size={17} />
              </button>
            </div>
          )}

          <button
            className="text-gray-600 hover:bg-gray-50"
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "12px", fontSize: "14.5px", border: "none", background: "transparent", cursor: "default", textAlign: "left" }}
          >
            <Settings size={17} />
            Settings
          </button>

          <button
            onClick={onClearChats}
            className="text-gray-600 hover:bg-gray-50"
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "12px", fontSize: "14.5px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}
          >
            <Trash2 size={17} />
            Clear chats
          </button>
        </div>
      </div>
    </div>
  );
}