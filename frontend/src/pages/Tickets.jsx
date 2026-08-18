import { useEffect, useState } from "react";
import { createTicket, fetchTickets } from "../services/portalApi";

const STATUS_LABELS = {
  open: { text: "Open", className: "itm-badge itm-badge--open" },
  in_progress: { text: "In progress", className: "itm-badge itm-badge--progress" },
  resolved: { text: "Resolved", className: "itm-badge itm-badge--resolved" },
};

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadTickets = () => {
    setLoading(true);
    fetchTickets()
      .then((data) => setTickets(data.tickets || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      setError("Please fill in subject and description.");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      await createTicket(subject.trim(), description.trim());
      setSubject("");
      setDescription("");
      setSuccess("Ticket submitted successfully.");
      loadTickets();
    } catch (err) {
      setError(err.message || "Could not submit ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="itm-panel-pad itm-tickets">
      <div className="itm-tickets-grid">
        <form className="itm-ticket-form" onSubmit={handleSubmit}>
          <h2>Raise a support ticket</h2>
          <p className="itm-panel-muted">
            For issues not answered in chat or FAQs — exam forms, hostel, fees, etc.
          </p>
          <label>
            Subject
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Exam form not uploading"
              maxLength={200}
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue in detail…"
              rows={5}
            />
          </label>
          {error && <p className="itm-form-error">{error}</p>}
          {success && <p className="itm-form-success">{success}</p>}
          <button type="submit" className="itm-btn-primary" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit ticket"}
          </button>
        </form>

        <div className="itm-ticket-list-wrap">
          <h2>Your tickets</h2>
          {loading && <p className="itm-panel-muted">Loading tickets…</p>}
          {!loading && tickets.length === 0 && (
            <p className="itm-panel-muted">No tickets yet. Submit one when you need help.</p>
          )}
          <ul className="itm-ticket-list">
            {tickets.map((ticket) => {
              const badge = STATUS_LABELS[ticket.status] || STATUS_LABELS.open;
              return (
                <li key={ticket.id} className="itm-ticket-card">
                  <div className="itm-ticket-card-head">
                    <strong>{ticket.subject}</strong>
                    <span className={badge.className}>{badge.text}</span>
                  </div>
                  <p>{ticket.description}</p>
                  {ticket.created_at && (
                    <small className="itm-panel-muted">
                      {new Date(ticket.created_at).toLocaleString()}
                    </small>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
