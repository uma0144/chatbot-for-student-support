import { Mic, MicOff, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useSpeechToText } from "../hooks/useSpeech";
import { ITM } from "../theme";

export default function MessageInput({ onSend, disabled, language = "en" }) {
  const [message, setMessage] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const textareaRef = useRef(null);

  const speechLang = language === "hi" ? "hi-IN" : "en-IN";
  const { supported, listening, toggle } = useSpeechToText({ language: speechLang });

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

  const voiceAvailable =
    supported && (typeof window === "undefined" || window.isSecureContext);

  const handleVoice = () => {
    setVoiceError("");
    toggle(
      (transcript) => {
        setMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
      },
      (err) => setVoiceError(err.message)
    );
  };

  return (
    <div className="itm-chat-input" style={{ background: ITM.white, borderTop: `1px solid ${ITM.border}` }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "8px",
            background: ITM.surface,
            border: `1px solid ${ITM.border}`,
            borderRadius: ITM.radiusFull,
            padding: "6px 6px 6px 16px",
            boxShadow: ITM.shadowSm,
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          {voiceAvailable && (
            <button
              type="button"
              onClick={handleVoice}
              disabled={disabled}
              className={`itm-voice-btn${listening ? " itm-voice-btn--active" : ""}`}
              aria-label={listening ? "Stop listening" : "Start voice input"}
              title={listening ? "Listening…" : "Voice input"}
            >
              {listening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          )}

          <textarea
            ref={textareaRef}
            rows={1}
            placeholder={language === "hi" ? "अपना संदेश लिखें…" : "Type your message..."}
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

        {voiceError && (
          <p style={{ textAlign: "center", fontSize: "11px", color: ITM.error, marginTop: "8px" }}>
            {voiceError}
          </p>
        )}

        <p className="itm-message-input-hint itm-message-input-hint--desktop">
          AI-generated answers from the ITM knowledge base. Verify important details with official
          notices.
          {supported && " Use the mic for voice input."}
        </p>
        <p className="itm-message-input-hint itm-message-input-hint--mobile">
          AI answers from ITM knowledge base — verify with official notices.
        </p>
      </div>
    </div>
  );
}
