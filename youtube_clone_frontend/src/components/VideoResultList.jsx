import React from "react";
import VideoCard from "./VideoCard";

/**
 * PUBLIC_INTERFACE
 * VideoResultList renders a vertical list of VideoCard items.
 */
export default function VideoResultList({ videos = [] }) {
  if (!videos.length) {
    return (
      <div style={{ color: "var(--text-secondary)" }}>
        No videos found. Try a different search.
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {videos.map((v) => (
        <VideoCard key={v.id} {...v} />
      ))}
    </div>
  );
}
