import React, { useEffect, useRef } from "react";
import ResultsHeader from "../components/ResultsHeader";
import VideoResultList from "../components/VideoResultList";
import { useSearchActions, useSearchState } from "../state/searchSlice";
import { useQueryParam } from "../hooks/useQueryParam";
import { fetchSearchResults } from "../api/searchApi";

/**
 * PUBLIC_INTERFACE
 * SearchResultsPage shows search results for a query parameter (?q=...).
 * - Reads 'q' from URL
 * - Calls fetchSearchResults (which uses API base or local mock)
 * - Renders results list with proper states
 * - Supports '/' shortcut to focus the refine search input
 */
export default function SearchResultsPage() {
  const [qp, setQp] = useQueryParam("q", "");
  const { query, results, isLoading, error } = useSearchState();
  const { setQuery, setResults, setLoading, setError } = useSearchActions();

  // Ref to allow focusing the refine input on '/'
  const refineInputRef = useRef(null);

  // Effect to wire '/' keyboard to focus refine input unless typing in another input/textarea
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
          refineInputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Effect to sync with query param and perform API search (with mock fallback internally)
  useEffect(() => {
    let ignore = false;

    async function doSearch(q) {
      const qq = (q || "").trim();
      if (!qq) {
        setResults([]);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSearchResults(qq);
        if (ignore) return;
        setResults(data.items || []);
      } catch (e) {
        if (ignore) return;
        setError(e?.message || "Search failed");
        setResults([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    if (qp !== query) {
      setQuery(qp);
    }
    doSearch(qp);

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qp]);

  const onSearch = async () => {
    setQp(query);
    const q = (query || "").trim();
    if (!q) {
      setResults([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSearchResults(q);
      setResults(data.items || []);
    } catch (e) {
      setError(e?.message || "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Render states
  return (
    <div>
      <ResultsHeader
        ref={refineInputRef}
        query={query}
        onQueryChange={setQuery}
        onSearch={onSearch}
      />
      {isLoading ? (
        <div style={{ color: "var(--text-secondary)" }}>Loading…</div>
      ) : error ? (
        <div
          role="alert"
          style={{
            color: "var(--text-secondary)",
            background: "var(--bg-elev-0)",
            border: "1px solid var(--stroke-muted)",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          Failed to load results: {error}
        </div>
      ) : results?.length ? (
        <VideoResultList videos={results} />
      ) : (query || qp)?.trim() ? (
        <div style={{ color: "var(--text-secondary)" }}>
          No results for “{(query || qp).trim()}”. Try a different search.
        </div>
      ) : (
        <div style={{ color: "var(--text-secondary)" }}>
          Type a query above to search videos.
        </div>
      )}
    </div>
  );
}
