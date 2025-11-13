import React, { forwardRef } from "react";

/**
 * PUBLIC_INTERFACE
 * ResultsHeader renders the header area of the search results page, including the current query and optional filters placeholder.
 * Accepts an optional inputRef via forwardRef to focus the input from parent (e.g., '/' shortcut).
 */
const ResultsHeader = forwardRef(function ResultsHeader(
  { query, onQueryChange, onSearch },
  inputRef
) {
  return (
    <section
      aria-label="Search results header"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        paddingBottom: 12,
        borderBottom: "1px solid var(--stroke-muted)",
        marginBottom: 16,
      }}
    >
      <div className="searchbar" style={{ maxWidth: 600, flex: 1 }}>
        <input
          ref={inputRef}
          aria-label="Refine search"
          placeholder="Search"
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        />
        <div
          className="action"
          role="button"
          aria-label="Search"
          onClick={() => onSearch?.()}
          tabIndex={0}
        >
          🔍
        </div>
      </div>
      <div
        style={{
          color: "var(--text-tertiary)",
          fontSize: 13,
          display: "flex",
          gap: 12,
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        <span>Filters</span>
        <span aria-hidden="true" style={{ color: "var(--text-secondary)" }}>
          •
        </span>
        <span>About results</span>
      </div>
    </section>
  );
});

export default ResultsHeader;
