import React from "react";
import { useParams } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * WatchPage displays a video player placeholder for a given video ID.
 */
export default function WatchPage() {
  const { id } = useParams();
  return (
    <div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Watch</h2>
      <p style={{ color: "var(--text-secondary)" }}>Video player placeholder for ID: {id}</p>
      <div
        style={{
          marginTop: 12,
          width: "100%",
          maxWidth: 960,
          aspectRatio: "16/9",
          background: "var(--bg-elev-0)",
          borderRadius: 12,
          border: "1px solid var(--stroke-muted)",
        }}
      />
    </div>
  );
}
