import { Bot } from "lucide-react";
import { ITM } from "../theme";

/** Assistant avatar for chat messages. */
export default function BotAvatar({ size = 36, iconSize = 18 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: ITM.radiusSm,
        background: `linear-gradient(145deg, ${ITM.navy} 0%, ${ITM.navyDark} 100%)`,
        border: "1px solid rgba(245, 158, 11, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: ITM.shadowSm,
      }}
    >
      <Bot size={iconSize} style={{ color: ITM.gold }} strokeWidth={2.25} />
    </div>
  );
}
