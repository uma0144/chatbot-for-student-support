import { Bot } from "lucide-react";
import { ITM } from "../theme";

/** Decorative chat preview for the login split-screen (right panel). */
export default function AuthPreview() {
  return (
    <div className="auth-preview">
      <div className="auth-preview__inner">
        <div className="auth-preview__header">
          <div>
            <div className="auth-preview__title">ITM Student Support</div>
            <div className="auth-preview__subtitle">AI-powered student assistant</div>
          </div>
          <div className="auth-preview__status">
            <span className="auth-preview__dot itm-online-dot" />
            Online
          </div>
        </div>

        <div className="auth-preview__body">
          <div className="auth-preview__msg auth-preview__msg--user">
            <div className="auth-preview__bubble auth-preview__bubble--user">
              What are the admission requirements?
            </div>
            <span className="auth-preview__time">10:24 AM</span>
          </div>

          <div className="auth-preview__msg auth-preview__msg--bot">
            <div className="auth-preview__avatar">
              <Bot size={14} />
            </div>
            <div>
              <div className="auth-preview__bubble auth-preview__bubble--bot">
                For undergraduate programs, you need 10+2 with minimum 50% marks. Entrance exam
                scores may apply for select courses.
              </div>
              <span className="auth-preview__time">10:24 AM</span>
            </div>
          </div>

          <div className="auth-preview__chips">
            <span className="auth-preview__chip">Registration Process</span>
            <span className="auth-preview__chip">Important Dates</span>
            <span className="auth-preview__chip">Fee Structure</span>
          </div>
        </div>

        <div className="auth-preview__input">
          <span className="auth-preview__input-field">Type your message...</span>
          <span className="auth-preview__send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </span>
        </div>
      </div>

      <p className="auth-preview__tagline">
        Get instant answers about admissions, fees, exams &amp; campus life
      </p>

      <style>{`
        .auth-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 40px 32px;
          background: linear-gradient(160deg, ${ITM.navyDark} 0%, ${ITM.navy} 45%, ${ITM.navyMid} 100%);
          position: relative;
          overflow: hidden;
        }
        .auth-preview::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -80px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.08);
        }
        .auth-preview::after {
          content: "";
          position: absolute;
          bottom: -100px;
          left: -60px;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
        }
        .auth-preview__inner {
          width: 100%;
          max-width: 420px;
          background: ${ITM.white};
          border-radius: 16px;
          box-shadow: ${ITM.shadowLg};
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        .auth-preview__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid ${ITM.border};
          background: ${ITM.white};
        }
        .auth-preview__title {
          font-weight: 700;
          font-size: 15px;
          color: ${ITM.navy};
        }
        .auth-preview__subtitle {
          font-size: 11px;
          color: ${ITM.muted};
          margin-top: 2px;
        }
        .auth-preview__status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: ${ITM.muted};
        }
        .auth-preview__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${ITM.success};
        }
        .auth-preview__body {
          padding: 20px 16px;
          background: ${ITM.surface};
          min-height: 220px;
        }
        .auth-preview__msg {
          margin-bottom: 14px;
        }
        .auth-preview__msg--user {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .auth-preview__msg--bot {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .auth-preview__avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: ${ITM.navy};
          color: ${ITM.gold};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .auth-preview__bubble {
          font-size: 12px;
          line-height: 1.5;
          padding: 10px 14px;
          max-width: 85%;
        }
        .auth-preview__bubble--user {
          background: ${ITM.navy};
          color: white;
          border-radius: 14px 14px 4px 14px;
        }
        .auth-preview__bubble--bot {
          background: white;
          color: ${ITM.text};
          border: 1px solid ${ITM.border};
          border-radius: 4px 14px 14px 14px;
          box-shadow: ${ITM.shadowSm};
        }
        .auth-preview__time {
          font-size: 10px;
          color: ${ITM.muted};
          margin-top: 4px;
          display: block;
        }
        .auth-preview__msg--user .auth-preview__time {
          text-align: right;
        }
        .auth-preview__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .auth-preview__chip {
          font-size: 11px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1.5px solid ${ITM.gold};
          color: ${ITM.navy};
          background: white;
        }
        .auth-preview__input {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-top: 1px solid ${ITM.border};
          background: white;
        }
        .auth-preview__input-field {
          flex: 1;
          font-size: 12px;
          color: #94a3b8;
          padding: 10px 16px;
          border: 1px solid ${ITM.border};
          border-radius: 999px;
        }
        .auth-preview__send {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: ${ITM.gold};
          color: ${ITM.navyDark};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .auth-preview__tagline {
          margin-top: 28px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          text-align: center;
          max-width: 360px;
          position: relative;
          z-index: 1;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
