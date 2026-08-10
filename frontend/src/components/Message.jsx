import BotAvatar from "./BotAvatar";
import { ITM } from "../theme";

export default function Message({ message }) {
  const isUser = message.sender === "user";
  const time = message.time;

  if (isUser) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
        <div
          style={{
            maxWidth: "78%",
            borderRadius: "16px 16px 4px 16px",
            padding: "12px 16px",
            fontSize: "14px",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
            background: ITM.navy,
            color: ITM.white,
            boxShadow: "0 2px 8px rgba(30, 58, 95, 0.2)",
          }}
        >
          {message.text}
        </div>
        {time && (
          <span style={{ fontSize: "11px", color: ITM.muted, paddingRight: "4px" }}>{time}</span>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
      <BotAvatar />
      <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: "4px" }}>
        <div
          style={{
            borderRadius: "4px 16px 16px 16px",
            padding: "12px 16px",
            fontSize: "14px",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
            background: ITM.white,
            border: `1px solid ${ITM.border}`,
            color: ITM.text,
            boxShadow: ITM.shadowSm,
          }}
        >
          {message.text}
        </div>
        {time && <span style={{ fontSize: "11px", color: ITM.muted }}>{time}</span>}
      </div>
    </div>
  );
}
