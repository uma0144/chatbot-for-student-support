import { ArrowUp, Paperclip } from "lucide-react";
import { useRef, useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 200) + "px";
    }
  };

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div style={{ padding: "8px 28px 32px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div
          className="bg-white shadow-lg shadow-gray-200/60"
          style={{ display: "flex", alignItems: "flex-end", gap: "10px", borderRadius: "26px", padding: "16px 20px" }}
        >
          <button
            className="text-gray-400 hover:bg-gray-100"
            style={{ padding: "8px", borderRadius: "999px", border: "none", background: "transparent", cursor: "default", flexShrink: 0 }}
          >
            <Paperclip size={22} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Message Student AI..."
            value={message}
            disabled={disabled}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="disabled:text-gray-400"
            style={{ flex: 1, resize: "none", outline: "none", background: "transparent", fontSize: "16px", padding: "8px 0", maxHeight: "200px", border: "none" }}
          />

          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white disabled:text-gray-400"
            style={{ padding: "13px", borderRadius: "18px", border: "none", cursor: "pointer", flexShrink: 0 }}
          >
            <ArrowUp size={20} />
          </button>
        </div>

        <p className="text-gray-400" style={{ textAlign: "center", fontSize: "13px", marginTop: "14px" }}>
          Student AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}