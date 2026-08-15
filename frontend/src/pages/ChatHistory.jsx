import { useEffect, useState } from "react";
import { clearChatHistory, fetchChatHistory } from "../services/api";

export default function ChatHistory({ onAskChat }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clearing, setClearing] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");
    fetchChatHistory()
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleClear = async () => {
    if (!window.confirm("Delete all saved chat history? This cannot be undone.")) return;
    try {
      setClearing(true);
      await clearChatHistory();
      setItems([]);
    } catch (err) {
      setError(err.message || "Could not clear history.");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="itm-panel-pad">
      <div className="itm-history-header">
        <div>
          <h1 className="itm-history-title">Chat History</h1>
          <p className="itm-panel-muted">
            Past questions and answers saved to your account. Ask again from any entry.
          </p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            className="itm-btn-secondary"
            onClick={handleClear}
            disabled={clearing}
          >
            {clearing ? "Clearing…" : "Clear all"}
          </button>
        )}
      </div>

      {loading && <p className="itm-panel-muted">Loading history…</p>}
      {error && <p className="itm-panel-error">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <div className="itm-panel-empty">
          <h2>No history yet</h2>
          <p>Start a chat — your questions and answers will appear here.</p>
        </div>
      )}

      <ul className="itm-history-list">
        {items.map((item) => (
          <li key={item.id} className="itm-history-card">
            <div className="itm-history-card-head">
              <strong>Q:</strong>
              <button
                type="button"
                className="itm-btn-secondary itm-history-ask-btn"
                onClick={() => onAskChat?.(item.question)}
              >
                Ask again
              </button>
            </div>
            <p className="itm-history-question">{item.question}</p>
            <p className="itm-history-answer">{item.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
