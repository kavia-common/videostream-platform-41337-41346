import React from "react";
import { useTheme } from "../theme";
import "../App.css";
import BrandLogo from "../components/common/BrandLogo";
import IconButton from "../components/common/IconButton";
import SearchBar from "../components/SearchBar";

/**
 * PUBLIC_INTERFACE
 * HeaderAppBar renders the fixed header with brand, search, and actions.
 */
export default function HeaderAppBar({ query = "", onQueryChange, onSearch }) {
  const { theme, toggleTheme } = useTheme();

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

      <SearchBar
        value={query}
        onChange={onQueryChange}
        onSubmit={navigateToSearch}
        onVoice={() => {}}
      />

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
