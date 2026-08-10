import { useEffect, useRef } from "react";
import Message from "./Message";
import ITMLogo from "./ITMLogo";
import { ITM } from "../theme";

const SUGGESTIONS = [
  "What is the fee structure?",
  "Admission eligibility criteria",
  "Scholarship information",
  "Examination notices",
];

function TypingRow() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "6px",
          background: ITM.white,
          border: `1px solid ${ITM.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: "4px",
        }}
      >
        <ITMLogo variant="vertical" height={28} />
      </div>
      <div
        style={{
          background: "#f8fafc",
          border: `1px solid ${ITM.border}`,
          borderRadius: "6px",
          padding: "14px 18px",
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        <span className="bg-gray-300 rounded-full animate-bounce" style={{ width: "8px", height: "8px" }} />
        <span className="bg-gray-300 rounded-full animate-bounce" style={{ width: "8px", height: "8px", animationDelay: "0.15s" }} />
        <span className="bg-gray-300 rounded-full animate-bounce" style={{ width: "8px", height: "8px", animationDelay: "0.3s" }} />
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
        padding: "24px",
      }}
    >
      <ITMLogo variant="vertical" height={100} style={{ marginBottom: "20px" }} />
      <h1 style={{ fontSize: "26px", fontWeight: 700, color: ITM.navy, marginBottom: "8px" }}>
        Student Support Chatbot
      </h1>
      <p style={{ fontSize: "13px", color: ITM.muted, marginBottom: "28px" }}>
        Official information from the ITM knowledge base
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "520px" }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSuggestion(s)}
            className="itm-chip"
          >
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
          maxWidth: "760px",
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
