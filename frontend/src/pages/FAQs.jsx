import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { fetchFaqs } from "../services/portalApi";

export default function FAQs({ onAskChat }) {
  const [categories, setCategories] = useState({});
  const [openKey, setOpenKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFaqs()
      .then((data) => setCategories(data.categories || {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="itm-panel-muted itm-panel-pad">Loading FAQs…</p>;
  if (error) return <div className="itm-panel-error itm-panel-pad">{error}</div>;

  return (
    <div className="itm-panel-pad itm-faqs">
      <p className="itm-panel-intro">
        Quick answers about admissions, eligibility, and campus life. Tap a question to expand.
      </p>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className="itm-faq-category">
          <h2>{category}</h2>
          <div className="itm-faq-list">
            {items.map((item, index) => {
              const key = `${category}-${index}`;
              const open = openKey === key;
              return (
                <div key={key} className={`itm-faq-item${open ? " itm-faq-item--open" : ""}`}>
                  <button
                    type="button"
                    className="itm-faq-question"
                    onClick={() => setOpenKey(open ? null : key)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={18} className="itm-faq-chevron" />
                  </button>
                  {open && (
                    <div className="itm-faq-answer">
                      <p>{item.answer}</p>
                      {onAskChat && (
                        <button
                          type="button"
                          className="itm-link-btn"
                          onClick={() => onAskChat(item.question)}
                        >
                          Ask more in Chat →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
