import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "2rem", maxWidth: "32rem", margin: "4rem auto", fontFamily: "sans-serif" }}>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>Something went wrong</h1>
          <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: "1rem" }}>
            The app hit an error. Try clearing site data for localhost, then log in again.
          </p>
          <button
            type="button"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              background: "#1e3a5f",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Clear data & reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
