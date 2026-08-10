import AuthPreview from "./AuthPreview";
import { ITM } from "../theme";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__form-panel">
        <div className="auth-layout__form-wrap">
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
        </div>
      </div>

      <div className="auth-layout__preview-panel">
        <AuthPreview />
      </div>

      <style>{`
        .auth-layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }
        .auth-layout__form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          background: ${ITM.bg};
        }
        .auth-layout__form-wrap {
          width: 100%;
          max-width: 440px;
        }
        .auth-layout__brand {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        .auth-layout__crest {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: linear-gradient(145deg, ${ITM.navy} 0%, ${ITM.navyDark} 100%);
          color: ${ITM.gold};
          font-weight: 800;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: ${ITM.shadowMd};
          border: 2px solid rgba(245, 158, 11, 0.35);
        }
        .auth-layout__university {
          font-size: 20px;
          font-weight: 800;
          color: ${ITM.navy};
          line-height: 1.2;
        }
        .auth-layout__location {
          font-size: 12px;
          color: ${ITM.muted};
          margin-top: 2px;
          font-weight: 500;
        }
        .auth-layout__card {
          background: ${ITM.white};
          border-radius: 16px;
          box-shadow: ${ITM.shadowMd};
          overflow: hidden;
        }
        .auth-layout__card-header {
          padding: 28px 32px 20px;
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
        .auth-layout__preview-panel {
          flex: 1;
          min-width: 0;
        }
        @media (max-width: 960px) {
          .auth-layout__preview-panel {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
