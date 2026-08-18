import { useEffect, useState } from "react";
import MarkdownContent from "../components/MarkdownContent";
import { fetchKnowledgeTopic, fetchKnowledgeTopics } from "../services/portalApi";

export default function KnowledgeBase({ onAskChat }) {
  const [topics, setTopics] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchKnowledgeTopics()
      .then((data) => setTopics(data.topics || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setArticle(null);
      return;
    }
    setLoading(true);
    fetchKnowledgeTopic(selectedId)
      .then(setArticle)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedId]);

  if (error && topics.length === 0) {
    return <div className="itm-panel-error">{error}</div>;
  }

  return (
    <div className="itm-panel-layout">
      <aside className="itm-panel-sidebar">
        <h2 className="itm-panel-heading">Topics</h2>
        <div className="itm-topic-list">
          {topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className={`itm-topic-card${selectedId === topic.id ? " itm-topic-card--active" : ""}`}
              onClick={() => setSelectedId(topic.id)}
            >
              <span className="itm-topic-emoji">{topic.emoji}</span>
              <span>
                <strong>{topic.title}</strong>
                <small>{topic.description}</small>
              </span>
            </button>
          ))}
        </div>
      </aside>

      <section className="itm-panel-main">
        {!selectedId && (
          <div className="itm-panel-empty">
            <h2>Browse the ITM Knowledge Base</h2>
            <p>Select a topic on the left to read official university information.</p>
          </div>
        )}

        {selectedId && loading && <p className="itm-panel-muted">Loading article…</p>}

        {article && !loading && (
          <>
            <div className="itm-article-header">
              <h1>
                {article.emoji} {article.title}
              </h1>
              {onAskChat && (
                <button
                  type="button"
                  className="itm-btn-secondary"
                  onClick={() => onAskChat(`Tell me about ${article.title}`)}
                >
                  Ask in Chat
                </button>
              )}
            </div>
            <MarkdownContent text={article.content || ""} />
          </>
        )}
      </section>
    </div>
  );
}
