import { GraduationCap } from "lucide-react";

export default function Message({ message }) {
  const isUser = message.sender === "user";

  if (isUser) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          className="bg-indigo-600 text-white shadow-sm shadow-indigo-200"
          style={{
            maxWidth: "75%",
            borderRadius: "20px",
            padding: "14px 22px",
            fontSize: "16px",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
          }}
        >
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "14px" }}>
      <div
        className="bg-indigo-600"
        style={{ width: "40px", height: "40px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
      >
        <GraduationCap size={19} className="text-white" />
      </div>
      <div
        className="bg-white border border-gray-100 text-gray-800 shadow-sm"
        style={{
          maxWidth: "75%",
          borderRadius: "20px",
          padding: "14px 22px",
          fontSize: "16px",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}