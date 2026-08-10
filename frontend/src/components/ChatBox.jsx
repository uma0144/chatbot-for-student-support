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
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
      <BotAvatar iconSize={16} />
      <div
        style={{
          background: ITM.white,
          border: `1px solid ${ITM.border}`,
          borderRadius: "4px 16px 16px 16px",
          padding: "14px 18px",
          display: "flex",
          gap: "6px",
          alignItems: "center",
          boxShadow: ITM.shadowSm,
        }}
      >
        <span
          className="rounded-full animate-bounce"
          style={{ width: "8px", height: "8px", background: ITM.gold }}
        />
        <span
          className="rounded-full animate-bounce"
          style={{ width: "8px", height: "8px", background: ITM.gold, animationDelay: "0.15s" }}
        />
        <span
          className="rounded-full animate-bounce"
          style={{ width: "8px", height: "8px", background: ITM.gold, animationDelay: "0.3s" }}
        />
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
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div style={{ flex: 1, overflowY: "auto" }}>
        <EmptyState onSuggestion={onSuggestion} />
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingRow />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
