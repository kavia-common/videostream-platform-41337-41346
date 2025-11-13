import React, { useMemo, useState } from "react";
import ResultsHeader from "../components/ResultsHeader";
import VideoResultList from "../components/VideoResultList";

/**
 * PUBLIC_INTERFACE
 * SearchResultsPage shows search results for a query parameter (?q=...).
 */
export default function SearchResultsPage() {
  const params = new URLSearchParams(window.location.search);
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);

  // Placeholder mocked data; replace with API integration later
  const videos = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
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
        stats: { views: `${(Math.random() * 900 + 100).toFixed(0)}K`, publishedAt: `${i + 1} days ago` },
        description:
          "This is a short description snippet to demonstrate the layout and line clamping behavior in the results list.",
      })),
    [query]
  );

  const performSearch = () => {
    const q = encodeURIComponent(query);
    const url = `/search?q=${q}`;
    window.history.replaceState(null, "", url);
    // In future, trigger API call; for now list is memoized by query
  };

  return (
    <div>
      <ResultsHeader query={query} onQueryChange={setQuery} onSearch={performSearch} />
      <VideoResultList videos={videos} />
    </div>
  );
}
