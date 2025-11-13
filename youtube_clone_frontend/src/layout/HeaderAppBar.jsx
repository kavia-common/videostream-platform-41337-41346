import React from "react";
import { useTheme } from "../theme";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * HeaderAppBar renders the fixed header with brand, search, and actions.
 */
export default function HeaderAppBar({ query = "", onQueryChange, onSearch }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header" role="banner">
      <div className="left">
        <button className="icon-btn" aria-label="Menu">
          <span className="visually-hidden">Open navigation</span>
          ☰
        </button>
        <a href="/" aria-label="Home" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            height: 24, width: 24, borderRadius: 6, background: "var(--brand-primary)"
          }}/>
          <strong>YouStream</strong>
        </a>
      </div>

      <div className="center">
        <div className="searchbar" role="search">
          <input
            aria-label="Search"
            placeholder="Search"
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch?.();
            }}
          />
          <div className="action" role="button" aria-label="Search" onClick={() => onSearch?.()}>
            🔍
          </div>
        </div>
        <button className="icon-btn" aria-label="Voice search">
          🎤
        </button>
        <span className="kbd">/</span>
      </div>

      <div className="right">
        <button className="icon-btn" aria-label="Create">＋</button>
        <button className="icon-btn" aria-label="Notifications">🔔</button>
        <button className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button className="icon-btn" aria-label="Account">👤</button>
      </div>
    </header>
  );
}
