import React from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * SidebarNav renders the left navigation rail.
 */
export default function SidebarNav({ active = "home" }) {
  const Item = ({ id, label, icon }) => (
    <a className={`nav-item ${active === id ? "active" : ""}`} href={id === "home" ? "/" : `/${id}`}>
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </a>
  );

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <nav>
        <Item id="home" label="Home" icon="🏠" />
        <Item id="shorts" label="Shorts" icon="🎬" />
        <Item id="subscriptions" label="Subscriptions" icon="📺" />
        <hr style={{ borderColor: "var(--stroke-muted)" }} />
        <Item id="you" label="You" icon="🙂" />
        <Item id="history" label="History" icon="⏱" />
        <Item id="watch-later" label="Watch later" icon="🕒" />
        <Item id="liked" label="Liked videos" icon="👍" />
        <hr style={{ borderColor: "var(--stroke-muted)" }} />
        <div style={{ padding: "8px 12px", color: "var(--text-tertiary)", fontWeight: 600 }}>
          Explore
        </div>
        <Item id="trending" label="Trending" icon="🔥" />
        <Item id="music" label="Music" icon="🎵" />
        <Item id="gaming" label="Gaming" icon="🎮" />
        <Item id="news" label="News" icon="📰" />
        <Item id="sports" label="Sports" icon="🏅" />
      </nav>
    </aside>
  );
}
