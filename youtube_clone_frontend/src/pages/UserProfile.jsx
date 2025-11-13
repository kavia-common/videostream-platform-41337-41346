import React from "react";

/**
 * PUBLIC_INTERFACE
 * UserProfile displays the signed-in user's profile placeholder.
 */
export default function UserProfile() {
  return (
    <div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Your Profile</h2>
      <p style={{ color: "var(--text-secondary)" }}>User profile placeholder.</p>
    </div>
  );
}
