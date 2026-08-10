import { ITM } from "../theme";

/** Standalone login/register shell — no chat UI until after sign-in. */
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__wrap">
        <div className="auth-layout__brand">
          <div className="auth-layout__crest" aria-hidden="true">
            <span>ITM</span>
          </div>
          <div>
            <div className="auth-layout__university">ITM University</div>
            <div className="auth-layout__location">Gwalior • MP • India</div>
          </div>
        </div>

        <div className="auth-layout__card">
          <div className="auth-layout__card-header">
            <h1 className="auth-layout__title">{title}</h1>
            {subtitle && <p className="auth-layout__subtitle">{subtitle}</p>}
          </div>
          <div className="auth-layout__gold-bar" />
          <div className="auth-layout__card-body">{children}</div>
          {footer && <div className="auth-layout__footer">{footer}</div>}
        </div>

        <p className="auth-layout__hint">
          Sign in to access the student support chatbot
        </p>
      </div>

      <style>{`
        .auth-layout {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
          background: linear-gradient(
            165deg,
            ${ITM.navyDark} 0%,
            ${ITM.navy} 38%,
            ${ITM.bg} 38%,
            ${ITM.bg} 100%
          );
        }
        .auth-layout__wrap {
          width: 100%;
          max-width: 420px;
        }
        .auth-layout__brand {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .auth-layout__crest {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.12);
          color: ${ITM.goldLight};
          font-weight: 800;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(245, 158, 11, 0.45);
          backdrop-filter: blur(4px);
        }
        .auth-layout__university {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
        }
        .auth-layout__location {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.75);
          margin-top: 2px;
          font-weight: 500;
        }
        .auth-layout__card {
          background: ${ITM.white};
          border-radius: 16px;
          box-shadow: ${ITM.shadowLg};
          overflow: hidden;
        }
        .auth-layout__card-header {
          padding: 28px 32px 18px;
        }
        .auth-layout__title {
          font-size: 22px;
          font-weight: 800;
          color: ${ITM.navy};
          margin-bottom: 6px;
        }
        .auth-layout__subtitle {
          font-size: 14px;
          color: ${ITM.muted};
        }
        .auth-layout__gold-bar {
          height: 4px;
          background: linear-gradient(90deg, ${ITM.gold}, ${ITM.goldLight});
        }
        .auth-layout__card-body {
          padding: 28px 32px;
        }
        .auth-layout__footer {
          padding: 0 32px 28px;
          text-align: center;
          font-size: 14px;
          color: ${ITM.muted};
        }
        .auth-layout__hint {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: ${ITM.muted};
          line-height: 1.5;
        }
        @media (min-width: 768px) {
          .auth-layout {
            background: linear-gradient(
              135deg,
              ${ITM.navyDark} 0%,
              ${ITM.navy} 50%,
              ${ITM.bg} 50%,
              ${ITM.bg} 100%
            );
          }
          .auth-layout__wrap {
            margin-right: 8%;
          }
        }
      `}</style>
    </div>
  );
}
