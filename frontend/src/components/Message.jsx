import BotAvatar from "./BotAvatar";
import { ITM } from "../theme";

export default function Message({ message }) {
  const isUser = message.sender === "user";

  if (isUser) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            maxWidth: "75%",
            borderRadius: "6px",
            padding: "12px 18px",
            fontSize: "15px",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            background: ITM.navy,
            color: ITM.white,
          }}
        >
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <BotAvatar />
      <div
        style={{
          maxWidth: "75%",
          borderRadius: "6px",
          padding: "12px 18px",
          fontSize: "15px",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          background: "#f8fafc",
          border: `1px solid ${ITM.border}`,
          color: ITM.text,
        }}
      >
        {message.text}
      </div>
    </div>
  );
}
