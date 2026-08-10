import { ITM, ITM_LOGO_SRC } from "../theme";

export default function ITMLogo({ height = 48, className = "", style = {} }) {
  return (
    <img
      src={ITM_LOGO_SRC}
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
