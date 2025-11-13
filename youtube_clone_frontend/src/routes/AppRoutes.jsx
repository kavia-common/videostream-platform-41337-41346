import React from "react";
import { Routes, Route } from "react-router-dom";

/** Placeholder pages for now */
function HomeFeed() {
  return <div><h2>Home Feed</h2><p>Welcome to YouStream.</p></div>;
}
function Watch() {
  return <div><h2>Watch</h2><p>Video player placeholder.</p></div>;
}
function Channel() {
  return <div><h2>Channel</h2><p>Channel page placeholder.</p></div>;
}
function Profile() {
  return <div><h2>Profile</h2><p>User profile placeholder.</p></div>;
}

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Declares top-level application routes. */
  return (
    <Routes>
      <Route path="/" element={<HomeFeed />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/channel/:id" element={<Channel />} />
      <Route path="/profile" element={<Profile />} />
      {/* Add /search in later steps */}
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}
