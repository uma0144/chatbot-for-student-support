import { useEffect, useState } from "react";
import { fetchAdminStats, fetchAdminUsers, uploadKnowledgePdf } from "../services/adminApi";

function StatCard({ label, value }) {
  return (
    <div className="itm-stat-card">
      <span className="itm-stat-value">{value}</span>
      <span className="itm-stat-label">{label}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  useEffect(() => {
    Promise.all([fetchAdminStats(), fetchAdminUsers()])
      .then(([statsData, usersData]) => {
        setStats(statsData);
        setUsers(usersData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadMsg("");
      setError("");
      const result = await uploadKnowledgePdf(file);
      setUploadMsg(result.message || "PDF uploaded.");
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="itm-panel-pad">
        <p className="itm-panel-muted">Loading admin dashboard…</p>
      </div>
    );
  }

  return (
    <div className="itm-panel-pad itm-admin">
      <h1 className="itm-history-title">Admin Dashboard</h1>
      <p className="itm-panel-intro">
        Manage users, monitor activity, and upload PDF documents to the knowledge base.
      </p>

      {error && <p className="itm-panel-error">{error}</p>}

      {stats && (
        <div className="itm-stat-grid">
          <StatCard label="Total users" value={stats.users} />
          <StatCard label="Students" value={stats.students} />
          <StatCard label="Admins" value={stats.admins} />
          <StatCard label="Chat messages" value={stats.chat_messages} />
          <StatCard label="Support tickets" value={stats.tickets} />
        </div>
      )}

      <section className="itm-admin-section">
        <h2>PDF knowledge base</h2>
        <p className="itm-panel-muted">
          Upload official PDFs (max 15 MB). After upload, rebuild the vector store on the server:{" "}
          <code>uv run python scripts/build_vectorstore.py</code>
        </p>
        <label className="itm-file-upload">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            disabled={uploading}
          />
          <span className="itm-btn-primary">{uploading ? "Uploading…" : "Choose PDF"}</span>
        </label>
        {uploadMsg && <p className="itm-form-success">{uploadMsg}</p>}
      </section>

      <section className="itm-admin-section">
        <h2>Users</h2>
        <div className="itm-admin-table-wrap">
          <table className="itm-admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`itm-role-badge itm-role-badge--${u.role}`}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
