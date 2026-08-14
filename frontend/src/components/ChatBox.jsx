import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import Message from "./Message";
import BotAvatar from "./BotAvatar";
import { ITM } from "../theme";

const SUGGESTIONS = [
  "What is the fee structure?",
  "Admission eligibility criteria",
  "Scholarship information",
  "Examination notices",
  "Registration process",
  "Important dates",
];

function TypingRow() {
  return (
    <div className="itm-assistant-row itm-assistant-row--typing">
      <BotAvatar />
      <div className="itm-typing-dots" aria-label="Assistant is typing">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function EmptyState({ onSuggestion }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "16px",
          background: `linear-gradient(145deg, ${ITM.navy} 0%, ${ITM.navyDark} 100%)`,
          border: "2px solid rgba(245, 158, 11, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          boxShadow: ITM.shadowMd,
        }}
      >
        <Sparkles size={28} style={{ color: ITM.gold }} />
      </div>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          color: ITM.navy,
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        How can we help you today?
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: ITM.muted,
          marginBottom: "32px",
          textAlign: "center",
          maxWidth: "400px",
          lineHeight: 1.5,
        }}
      >
        Ask about admissions, fees, scholarships, exams, or campus services. Answers come from the
        official ITM knowledge base.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          maxWidth: "560px",
        }}
      >
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" onClick={() => onSuggestion(s)} className="itm-chip">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatBox({ messages, isTyping, onSuggestion }) {
  const scrollRef = useRef(null);
  const isStreaming = messages.some((m) => m.streaming);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Keep view pinned to latest message while streaming
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping, isStreaming]);

  if (messages.length === 0) {
    return (
      <div ref={scrollRef} className="itm-chat-scroll">
        <EmptyState onSuggestion={onSuggestion} />
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="itm-chat-scroll">
      <div className="itm-chat-thread">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingRow />}
      </div>
    </div>
  );
}
