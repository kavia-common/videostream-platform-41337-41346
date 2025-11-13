import React from "react";
import { Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * BrandLogo renders the app's brand icon and label.
 */
export default function BrandLogo({ size = 24, label = "YouStream" }) {
  return (
    <Link
      to="/"
      aria-label="Home"
      style={{ display: "flex", alignItems: "center", gap: 8, color: "inherit", textDecoration: "none" }}
    >
      <div
        aria-hidden="true"
        style={{
          height: size,
          width: size,
          borderRadius: 6,
          background: "var(--brand-primary)",
          boxShadow: "0 0 0 2px color-mix(in srgb, var(--brand-primary) 20%, transparent)",
        }}
      />
      <strong>{label}</strong>
    </Link>
  );
}
