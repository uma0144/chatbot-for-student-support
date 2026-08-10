import { ITM, ITM_LOGO_BANNER_SRC, ITM_LOGO_VERTICAL_SRC } from "../theme";

/**
 * Official ITM University branding.
 * - vertical: stacked maroon logo (ITM stripes + UNIVERSITY + GWALIOR)
 * - banner: horizontal logo for compact headers
 */
export default function ITMLogo({
  variant = "vertical",
  height = 48,
  className = "",
  style = {},
}) {
  const src = variant === "banner" ? ITM_LOGO_BANNER_SRC : ITM_LOGO_VERTICAL_SRC;

  return (
    <img
      src={src}
      alt="ITM University Gwalior"
      className={className}
      style={{
        height,
        width: "auto",
        maxWidth: "100%",
        objectFit: "contain",
        display: "block",
        ...style,
      }}
    />
  );
}
