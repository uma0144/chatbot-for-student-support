import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import Message from "./Message";

const SUGGESTIONS = [
  "What is the fee structure?",
  "What's the attendance policy?",
  "Show me the timetable",
  "How do I apply for a scholarship?",
];

function TypingRow() {
  return (
    <div style={{ display: "flex", gap: "14px" }}>
      <div
        className="bg-indigo-600"
        style={{ width: "40px", height: "40px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
      >
        <GraduationCap size={19} className="text-white" />
      </div>
      <div
        className="bg-white border border-gray-100 shadow-sm"
        style={{ borderRadius: "20px", padding: "16px 22px", display: "flex", alignItems: "center", gap: "6px" }}
      >
        <span className="bg-gray-300 rounded-full animate-bounce" style={{ width: "9px", height: "9px", animationDelay: "-0.3s" }} />
        <span className="bg-gray-300 rounded-full animate-bounce" style={{ width: "9px", height: "9px", animationDelay: "-0.15s" }} />
        <span className="bg-gray-300 rounded-full animate-bounce" style={{ width: "9px", height: "9px" }} />
      </div>
    </div>
  );
}

function EmptyState({ onSuggestion }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div
        className="bg-indigo-600 shadow-md shadow-indigo-200"
        style={{ width: "68px", height: "68px", borderRadius: "22px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}
      >
        <GraduationCap size={30} className="text-white" />
      </div>
      <h1 className="text-gray-800" style={{ fontSize: "36px", fontWeight: 700, marginBottom: "40px" }}>
        What can I help with?
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", maxWidth: "600px" }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="bg-white border border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-700 shadow-sm"
            style={{ padding: "14px 26px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, cursor: "pointer" }}
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
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 28px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingRow />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}