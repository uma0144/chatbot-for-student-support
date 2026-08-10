import { ArrowUp } from "lucide-react";
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
    <div style={{ padding: "16px 20px", borderTop: `1px solid ${ITM.border}` }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
            border: `1px solid ${ITM.border}`,
            borderRadius: "6px",
            padding: "10px 12px",
            background: "#fafafa",
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Enter your query..."
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
              padding: "6px 0",
              maxHeight: "160px",
              border: "none",
              color: ITM.text,
            }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="itm-btn-gold"
            style={{
              padding: "10px 18px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
            }}
          >
            Submit
            <ArrowUp size={16} />
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: ITM.muted,
            marginTop: "10px",
          }}
        >
          AI responses are generated from the official knowledge base. Verify important details.
        </p>
      </div>
    </div>
  );
}
