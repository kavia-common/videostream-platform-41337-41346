import React from "react";
import { useParams } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * ChannelPage displays a channel profile placeholder.
 */
export default function ChannelPage() {
  const { id } = useParams();
  return (
    <div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Channel</h2>
      <p style={{ color: "var(--text-secondary)" }}>Channel page placeholder for: {id}</p>
      <div
        style={{
          marginTop: 12,
          height: 160,
          background: "linear-gradient(90deg, rgba(37,99,235,0.15), rgba(245,158,11,0.15))",
          borderRadius: 12,
          border: "1px solid var(--stroke-muted)",
        }}
      />
    </div>
  );
}
