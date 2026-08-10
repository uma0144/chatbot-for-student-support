import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { ITM } from "../theme";

export default function MessageInput({ onSend, disabled }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  };

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div
      style={{
        padding: "16px 24px 20px",
        background: ITM.white,
        borderTop: `1px solid ${ITM.border}`,
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            background: ITM.white,
            border: `1px solid ${ITM.border}`,
            borderRadius: "999px",
            padding: "8px 8px 8px 20px",
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
              padding: "8px 0",
              maxHeight: "160px",
              border: "none",
              color: ITM.text,
            }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: disabled || !message.trim() ? "not-allowed" : "pointer",
              background: disabled || !message.trim() ? ITM.border : ITM.gold,
              color: ITM.navy,
              flexShrink: 0,
              transition: "background 0.15s",
            }}
          >
            <Send size={18} />
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: ITM.muted,
            marginTop: "10px",
          }}
        >
          Answers are generated from the ITM knowledge base. Verify important details.
        </p>
      </div>
    </div>
  );
}
