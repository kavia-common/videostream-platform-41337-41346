import React, { useEffect, useRef } from "react";
import { useTheme } from "../theme";
import "../App.css";
import BrandLogo from "../components/common/BrandLogo";
import IconButton from "../components/common/IconButton";


/**
 * PUBLIC_INTERFACE
 * HeaderAppBar renders the fixed header with brand, search, and actions.
 * Supports '/' to focus the main search input.
 */
export default function HeaderAppBar({ query = "", onQueryChange, onSearch }) {
  const { theme, toggleTheme } = useTheme();
  const mainSearchRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "/") {
        const target = e.target;
        const tag = (target?.tagName || "").toLowerCase();
        const isTyping =
          tag === "input" ||
          tag === "textarea" ||
          target?.isContentEditable;
        if (!isTyping) {
          e.preventDefault();
          // Try to focus the main header search input if visible
          mainSearchRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigateToSearch = () => {
    if (typeof onSearch === "function") {
      onSearch();
    } else if (query && query.trim()) {
      const q = encodeURIComponent(query.trim());
      window.location.href = `/search?q=${q}`;
    }
  };

  return (
    <header className="app-header" role="banner">
      <div className="left">
        <IconButton ariaLabel="Menu" title="Menu">☰</IconButton>
        <BrandLogo />
      </div>

      <div className="center" style={{ width: "100%" }}>
        {/* We recreate the same structure as SearchBar but capture the input ref */}
        <div className="searchbar" role="search" aria-label="Search bar" style={{ flex: 1 }}>
          <input
            ref={mainSearchRef}
            aria-label="Search"
            placeholder="Search"
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigateToSearch();
            }}
          />
          <div
            className="action"
            role="button"
            aria-label="Search"
            onClick={navigateToSearch}
            title="Search"
            tabIndex={0}
          >
            🔍
          </div>
        </div>
        <IconButton ariaLabel="Voice search" title="Voice search" onClick={() => {}} style={{ marginLeft: 8 }}>
          🎤
        </IconButton>
        <span className="kbd" aria-hidden="true" style={{ marginLeft: 8 }}>
          /
        </span>
      </div>

      <div className="right">
        <IconButton ariaLabel="Create" title="Create">＋</IconButton>
        <IconButton ariaLabel="Notifications" title="Notifications">🔔</IconButton>
        <IconButton ariaLabel="Toggle theme" title="Toggle theme" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </IconButton>
        <IconButton ariaLabel="Account" title="Account">👤</IconButton>
      </div>
    </header>
  );
}
