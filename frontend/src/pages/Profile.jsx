import { useEffect, useState } from "react";
import { fetchProfile } from "../services/portalApi";
import { ITM } from "../theme";

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile()
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="itm-panel-muted itm-panel-pad">Loading profile…</p>;
  if (error) return <div className="itm-panel-error itm-panel-pad">{error}</div>;

  const displayName = profile?.name || user?.name || "Student";
  const email = profile?.email || user?.email || "";
  const stats = profile?.stats || {};

  return (
    <div className="itm-panel-pad itm-profile">
      <div className="itm-profile-card">
        <div
          className="itm-profile-avatar"
          style={{ background: `linear-gradient(145deg, ${ITM.navy}, ${ITM.navyDark})` }}
        >
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1>{displayName}</h1>
          <p>{email}</p>
          <span className="itm-badge itm-badge--role">{profile?.role || "student"}</span>
        </div>
      </div>

      <div className="itm-profile-stats">
        <div className="itm-stat-card">
          <strong>{stats.chat_messages ?? 0}</strong>
          <span>Chat messages saved</span>
        </div>
        <div className="itm-stat-card">
          <strong>{stats.total_tickets ?? 0}</strong>
          <span>Support tickets</span>
        </div>
        <div className="itm-stat-card">
          <strong>{stats.open_tickets ?? 0}</strong>
          <span>Open tickets</span>
        </div>
      </div>

      <div className="itm-profile-info">
        <h2>Account</h2>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>{displayName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{profile?.role || "student"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
