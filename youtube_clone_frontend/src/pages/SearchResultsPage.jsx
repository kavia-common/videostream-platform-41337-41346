import React, { useEffect } from "react";
import ResultsHeader from "../components/ResultsHeader";
import VideoResultList from "../components/VideoResultList";
import { useSearchActions, useSearchState } from "../state/searchSlice";
import { useQueryParam } from "../hooks/useQueryParam";

/**
 * PUBLIC_INTERFACE
 * SearchResultsPage shows search results for a query parameter (?q=...).
 */
export default function SearchResultsPage() {
  const [qp, setQp] = useQueryParam("q", "");
  const { query, results, isLoading } = useSearchState();
  const { setQuery, performSearch } = useSearchActions();

  // Sync slice state with query param on mount/param change
  useEffect(() => {
    if (qp !== query) {
      setQuery(qp);
      if (qp && qp.trim()) {
        performSearch(qp);
      } else {
        // if empty query, clear results
        performSearch("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qp]);

  const onSearch = () => {
    setQp(query);
    if (query && query.trim()) performSearch(query);
  };

  return (
    <div>
      <ResultsHeader query={query} onQueryChange={setQuery} onSearch={onSearch} />
      {isLoading ? (
        <div style={{ color: "var(--text-secondary)" }}>Loading…</div>
      ) : (
        <VideoResultList videos={results} />
      )}
    </div>
  );
}
