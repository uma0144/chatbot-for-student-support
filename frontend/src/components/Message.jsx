import BotAvatar from "./BotAvatar";
import MarkdownContent from "./MarkdownContent";
import { ITM } from "../theme";

export default function Message({ message }) {
  const isUser = message.sender === "user";
  const time = message.time;

  if (isUser) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
        <div
          style={{
            maxWidth: "85%",
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
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", width: "100%" }}>
      <BotAvatar />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          maxWidth: "min(100%, 720px)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div className="itm-bot-message">
          <MarkdownContent text={message.text || ""} streaming={message.streaming} />
        </div>
        {time && !message.streaming && (
          <span style={{ fontSize: "11px", color: ITM.muted }}>{time}</span>
        )}
      </div>
    </div>
  );
}
