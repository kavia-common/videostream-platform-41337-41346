import React, { useEffect } from "react";
import ResultsHeader from "../components/ResultsHeader";
import VideoResultList from "../components/VideoResultList";
import { useSearchActions, useSearchState } from "../state/searchSlice";
import { useQueryParam } from "../hooks/useQueryParam";
import { fetchSearchResults } from "../api/searchApi";

/**
 * PUBLIC_INTERFACE
 * SearchResultsPage shows search results for a query parameter (?q=...).
 */
export default function SearchResultsPage() {
  const [qp, setQp] = useQueryParam("q", "");
  const { query, results, isLoading } = useSearchState();
  const { setQuery, setResults, setLoading, setError } = useSearchActions();

  // Effect to sync with query param and perform API search (with mock fallback internally)
  useEffect(() => {
    let ignore = false;

    async function doSearch(q) {
      const qq = (q || "").trim();
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
    if (qp && qp.trim()) {
      doSearch(qp);
    } else {
      // clear results for empty q
      setResults([]);
    }

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
