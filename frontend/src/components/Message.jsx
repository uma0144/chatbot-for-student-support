import { Volume2 } from "lucide-react";
import BotAvatar from "./BotAvatar";
import MarkdownContent from "./MarkdownContent";
import { speakText } from "../hooks/useSpeech";

export default function Message({ message, language = "en" }) {
  const isUser = message.sender === "user";
  const time = message.time;
  const speechLang = language === "hi" ? "hi-IN" : "en-IN";

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

  const canSpeak = message.text && !message.streaming && typeof window !== "undefined" && window.speechSynthesis;

  return (
    <div className="itm-assistant-row">
      <BotAvatar />
      <div className="itm-assistant-content">
        <MarkdownContent text={message.text || ""} streaming={message.streaming} />
        <div className="itm-assistant-actions">
          {canSpeak && (
            <button
              type="button"
              className="itm-tts-btn"
              onClick={() => speakText(message.text, { language: speechLang })}
              aria-label="Read aloud"
              title="Read aloud"
            >
              <Volume2 size={14} />
              Listen
            </button>
          )}
          {time && !message.streaming && <span className="itm-msg-time">{time}</span>}
        </div>
      </div>
    </div>
  );
}
