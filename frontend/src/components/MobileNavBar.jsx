import { BookOpen, Clock, Menu, MessageSquare } from "lucide-react";

export default function MobileNavBar({ activeView, onOpenMenu, onNavigate }) {
  return (
    <nav className="itm-mobile-bottom-nav" aria-label="Quick navigation">
      <button
        type="button"
        className={`itm-mobile-nav-item${activeView === "chat" ? " itm-mobile-nav-item--active" : ""}`}
        onClick={() => onNavigate("chat")}
      >
        <MessageSquare size={20} />
        <span>Chat</span>
      </button>
      <button
        type="button"
        className={`itm-mobile-nav-item${activeView === "history" ? " itm-mobile-nav-item--active" : ""}`}
        onClick={() => onNavigate("history")}
      >
        <Clock size={20} />
        <span>History</span>
      </button>
      <button
        type="button"
        className={`itm-mobile-nav-item${activeView === "kb" ? " itm-mobile-nav-item--active" : ""}`}
        onClick={() => onNavigate("kb")}
      >
        <BookOpen size={20} />
        <span>KB</span>
      </button>
      <button type="button" className="itm-mobile-nav-item" onClick={onOpenMenu}>
        <Menu size={20} />
        <span>Menu</span>
      </button>
    </nav>
  );
}
