import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * SidebarNav renders the left navigation rail.
 * Determines the active item based on current location pathname.
 */
export default function SidebarNav() {
  const location = useLocation();
  const path = location.pathname || "/";

  // Simple active matcher: maps item id to path start
  const isActive = (id) => {
    if (id === "home") return path === "/";
    if (id === "you") return path.startsWith("/profile");
    return path.startsWith(`/${id}`);
  };

  const Item = ({ id, label, icon, to }) => (
    <Link
      className={`nav-item ${isActive(id) ? "active" : ""}`}
      to={to}
      aria-current={isActive(id) ? "page" : undefined}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <nav>
        <Item id="home" label="Home" icon="🏠" to="/" />
        <Item id="shorts" label="Shorts" icon="🎬" to="/shorts" />
        <Item id="subscriptions" label="Subscriptions" icon="📺" to="/subscriptions" />
        <hr style={{ borderColor: "var(--stroke-muted)" }} />
        <Item id="you" label="You" icon="🙂" to="/profile" />
        <Item id="history" label="History" icon="⏱" to="/history" />
        <Item id="watch-later" label="Watch later" icon="🕒" to="/watch-later" />
        <Item id="liked" label="Liked videos" icon="👍" to="/liked" />
        <hr style={{ borderColor: "var(--stroke-muted)" }} />
        <div style={{ padding: "8px 12px", color: "var(--text-tertiary)", fontWeight: 600 }}>
          Explore
        </div>
        <Item id="trending" label="Trending" icon="🔥" to="/trending" />
        <Item id="music" label="Music" icon="🎵" to="/music" />
        <Item id="gaming" label="Gaming" icon="🎮" to="/gaming" />
        <Item id="news" label="News" icon="📰" to="/news" />
        <Item id="sports" label="Sports" icon="🏅" to="/sports" />
      </nav>
    </aside>
  );
}
