//
// Search slice hooks built on top of the global store.
//
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppState, actions } from "./store";

// PUBLIC_INTERFACE
export function useSearchState() {
  /**
   * Returns current search slice state and derived helpers.
   */
  const { search } = useAppState();
  const { query, results, isLoading, error } = search;

  const count = results?.length || 0;

  return useMemo(
    () => ({ query, results, isLoading, error, count }),
    [query, results, isLoading, error, count]
  );
}

// PUBLIC_INTERFACE
export function useSearchActions() {
  /**
   * Returns memoized actions to update search state.
   */
  const dispatch = useAppDispatch();

  const setQuery = useCallback((q) => dispatch(actions.setSearchQuery(q)), [dispatch]);
  const setResults = useCallback((items) => dispatch(actions.setSearchResults(items)), [dispatch]);
  const setLoading = useCallback((flag) => dispatch(actions.setSearchLoading(flag)), [dispatch]);
  const setError = useCallback((err) => dispatch(actions.setSearchError(err)), [dispatch]);

  // Convenience: perform a "search" stub that simulates loading
  const performSearch = useCallback(async (q) => {
    const query = (q ?? "").toString();
    setQuery(query);
    setLoading(true);
    setError(null);
    try {
      // Placeholder: simulate fetch by delay and create mock results
      await new Promise((r) => setTimeout(r, 150));
      const items = Array.from({ length: 8 }).map((_, i) => ({
        id: `${i + 1}`,
        thumbnailUrl: `https://picsum.photos/seed/youstream-${i}/640/360`,
        title: `${query || "Sample"} Video Title ${i + 1} — Exploring YouStream UI`,
        duration: `${Math.floor(Math.random() * 9) + 1}:${String(
          Math.floor(Math.random() * 60)
        ).padStart(2, "0")}`,
        channel: {
          name: `Channel ${i + 1}`,
          avatarUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
          verified: i % 3 === 0,
        },
        stats: {
          views: `${(Math.random() * 900 + 100).toFixed(0)}K`,
          publishedAt: `${i + 1} days ago`,
        },
        description:
          "This is a short description snippet to demonstrate the layout and line clamping behavior in the results list.",
      }));
      setResults(items);
    } catch (e) {
      setError(e?.message || "Failed to search");
    } finally {
      setLoading(false);
    }
  }, [setQuery, setLoading, setError, setResults]);

  return { setQuery, setResults, setLoading, setError, performSearch };
}
