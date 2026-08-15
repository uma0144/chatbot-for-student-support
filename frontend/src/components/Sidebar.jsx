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
  X,
} from "lucide-react";

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
  isMobileOpen,
  onClose,
  isMobile,
}) {
  const navItems = isAdmin
    ? [...NAV_ITEMS, { id: "admin", label: "Admin", icon: LayoutDashboard }]
    : NAV_ITEMS;

  return (
    <aside
      className={`itm-sidebar${isMobile ? " itm-sidebar--mobile itm-sidebar--open" : isMobileOpen ? " itm-sidebar--open" : ""}`}
    >
      <div className="itm-sidebar-head">
        <div className="itm-sidebar-brand">
          <div className="itm-sidebar-logo">ITM</div>
          <div>
            <div className="itm-sidebar-title">Student Support</div>
            <div className="itm-sidebar-subtitle">ITM University</div>
          </div>
        </div>
        <button
          type="button"
          className="itm-sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>
        <button type="button" onClick={onNewChat} className="itm-sidebar-btn-new">
          <Plus size={18} strokeWidth={2.5} />
          New chat
        </button>
      </div>

      <nav className="itm-sidebar-nav">
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
                className="itm-nav-icon"
                strokeWidth={isActive ? 2.25 : 2}
              />
              {item.label}
            </button>
          );
        })}

        {activeView === "chat" && chats.length > 0 && (
          <div className="itm-sidebar-recent">
            <p className="itm-sidebar-recent-label">RECENT CHATS</p>
            {chats.slice(0, 10).map((chat) => {
              const active = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  className={`itm-sidebar-chat-item${active ? " itm-sidebar-chat-item--active" : ""}`}
                >
                  {chat.title}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <div className="itm-sidebar-foot">
        {user?.email && typeof user.email === "string" && (
          <div className="itm-sidebar-user">
            <div className="itm-sidebar-user-avatar">{user.email.charAt(0).toUpperCase()}</div>
            <p className="itm-sidebar-user-email">{user.email}</p>
          </div>
        )}
        <button type="button" onClick={onClearChats} className="itm-nav-btn itm-nav-btn--compact">
          Clear history
        </button>
        <button type="button" onClick={onLogout} className="itm-nav-btn itm-nav-btn--logout">
          <LogOut size={18} className="itm-nav-icon" />
          Log out
        </button>
      </div>
    </aside>
  );
}
