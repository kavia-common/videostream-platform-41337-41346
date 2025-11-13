import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeFeed from "../pages/HomeFeed";
import WatchPage from "../pages/WatchPage";
import ChannelPage from "../pages/ChannelPage";
import UserProfile from "../pages/UserProfile";
import SearchResultsPage from "../pages/SearchResultsPage";

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Declares top-level application routes. */
  return (
    <Routes>
      <Route path="/" element={<HomeFeed />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/channel/:id" element={<ChannelPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}
