import React from "react";
import IconButton from "./common/IconButton";

/**
 * PUBLIC_INTERFACE
 * SearchBar is a controlled input with search and mic actions.
 */
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onVoice,
  placeholder = "Search",
}) {
  return (
    <div className="center" style={{ width: "100%" }}>
      <div className="searchbar" role="search" aria-label="Search bar" style={{ flex: 1 }}>
        <input
          aria-label="Search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit?.();
          }}
        />
        <div
          className="action"
          role="button"
          aria-label="Search"
          onClick={() => onSubmit?.()}
          title="Search"
        >
          🔍
        </div>
      </div>
      <IconButton ariaLabel="Voice search" title="Voice search" onClick={onVoice} style={{ marginLeft: 8 }}>
        🎤
      </IconButton>
      <span className="kbd" aria-hidden="true" style={{ marginLeft: 8 }}>
        /
      </span>
    </div>
  );
}
