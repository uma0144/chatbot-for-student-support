import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { ITM } from "../theme";

export default function MessageInput({ onSend, disabled }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const canSend = message.trim() && !disabled;

  const handleInput = (e) => {
    setMessage(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  };

  const handleSend = () => {
    if (!canSend) return;
    onSend(message.trim());
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div
      style={{
        padding: "16px 24px 24px",
        background: ITM.white,
        borderTop: `1px solid ${ITM.border}`,
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            background: ITM.surface,
            border: `1px solid ${ITM.border}`,
            borderRadius: ITM.radiusFull,
            padding: "6px 6px 6px 22px",
            boxShadow: ITM.shadowSm,
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Type your message..."
            value={message}
            disabled={disabled}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            style={{
              flex: 1,
              resize: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
              fontFamily: "inherit",
              padding: "10px 0",
              maxHeight: "160px",
              border: "none",
              color: ITM.text,
            }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={`itm-send-btn ${canSend ? "itm-send-btn--active" : "itm-send-btn--disabled"}`}
            aria-label="Send message"
          >
            <Send size={18} strokeWidth={2.25} />
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: ITM.muted,
            marginTop: "12px",
            lineHeight: 1.4,
          }}
        >
          AI-generated answers from the ITM knowledge base. Verify important details with official
          notices.
        </p>
      </div>
    </div>
  );
}
