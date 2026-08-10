import ITMLogo from "./ITMLogo";
import { ITM } from "../theme";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-10 px-4"
      style={{ background: ITM.bg }}
    >
      <div className="w-full max-w-md">
        <div
          className="shadow-lg overflow-hidden"
          style={{
            background: ITM.white,
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(30, 58, 95, 0.12)",
          }}
        >
          <div
            style={{
              background: ITM.navy,
              color: ITM.white,
              padding: "28px 32px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <ITMLogo height={52} className="mx-auto" />
            </div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: "13px", opacity: 0.9 }}>{subtitle}</p>
            )}
          </div>

          <div
            style={{
              height: "4px",
              background: `linear-gradient(90deg, ${ITM.gold}, ${ITM.goldLight})`,
            }}
          />

          <div style={{ padding: "32px 36px" }}>{children}</div>

          {footer && (
            <div
              style={{
                padding: "0 36px 28px",
                textAlign: "center",
                fontSize: "14px",
                color: ITM.muted,
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
