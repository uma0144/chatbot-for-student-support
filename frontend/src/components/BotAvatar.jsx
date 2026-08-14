import { Bot } from "lucide-react";
import { ITM } from "../theme";

/** Minimal round assistant avatar (ChatGPT-style). */
export default function BotAvatar({ size = 28, iconSize = 16 }) {
  return (
    <div
      className="itm-bot-avatar"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: ITM.navy,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: "2px",
      }}
    >
      <Bot size={iconSize} style={{ color: ITM.gold }} strokeWidth={2.25} />
    </div>
  );
}
