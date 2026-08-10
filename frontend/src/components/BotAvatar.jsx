import { Bot } from "lucide-react";
import { ITM } from "../theme";

/** Small bot avatar for assistant messages (no university logo image). */
export default function BotAvatar({ size = 36, iconSize = 18 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "6px",
        background: ITM.navy,
        border: `1px solid ${ITM.navyDark}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Bot size={iconSize} style={{ color: ITM.gold }} />
    </div>
  );
}
