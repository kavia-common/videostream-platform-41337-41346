import React from "react";

/**
 * PUBLIC_INTERFACE
 * Avatar renders a circular image; falls back to an initial if no src provided.
 */
export default function Avatar({ src, alt = "Avatar", size = 28, name = "" }) {
  const fallback = (name || alt || "?").slice(0, 1).toUpperCase();
  return src ? (
    <img
      src={src}
      alt={alt}
      style={{
        height: size,
        width: size,
        borderRadius: "50%",
        objectFit: "cover",
        background: "var(--bg-elev-2)",
      }}
    />
  ) : (
    <div
      aria-label={alt}
      style={{
        height: size,
        width: size,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: "var(--bg-elev-2)",
        color: "var(--text-secondary)",
        fontSize: Math.max(10, Math.floor(size * 0.45)),
        border: "1px solid var(--stroke-muted)",
      }}
    >
      {fallback}
    </div>
  );
}
