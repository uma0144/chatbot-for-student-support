import BotAvatar from "./BotAvatar";
import MarkdownContent from "./MarkdownContent";

export default function Message({ message }) {
  const isUser = message.sender === "user";
  const time = message.time;

  if (isUser) {
    return (
      <div className="itm-user-row">
        <div className="itm-user-bubble">
          <p>{message.text}</p>
        </div>
        {time && <span className="itm-msg-time itm-msg-time--user">{time}</span>}
      </div>
    );
  }

  return (
    <div className="itm-assistant-row">
      <BotAvatar />
      <div className="itm-assistant-content">
        <MarkdownContent text={message.text || ""} streaming={message.streaming} />
        {time && !message.streaming && (
          <span className="itm-msg-time">{time}</span>
        )}
      </div>
    </div>
  );
}
