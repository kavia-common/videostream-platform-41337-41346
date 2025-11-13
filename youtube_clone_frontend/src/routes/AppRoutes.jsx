import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeFeed from "../pages/HomeFeed";
import WatchPage from "../pages/WatchPage";
import ChannelPage from "../pages/ChannelPage";
import UserProfile from "../pages/UserProfile";
import SearchResultsPage from "../pages/SearchResultsPage";
import {
  ShortsPage,
  SubscriptionsPage,
  HistoryPage,
  WatchLaterPage,
  LikedVideosPage,
  TrendingPage,
  MusicPage,
  GamingPage,
  NewsPage,
  SportsPage,
} from "../pages/Placeholders";

/**
 * PUBLIC_INTERFACE
 * AppRoutes declares top-level application routes.
 */
export default function AppRoutes() {
  /** Declares top-level application routes. */
  return (
    <Routes>
      <Route path="/" element={<HomeFeed />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/channel/:id" element={<ChannelPage />} />
      <Route path="/profile" element={<UserProfile />} />

      {/* Sidebar-linked placeholder routes */}
      <Route path="/shorts" element={<ShortsPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/watch-later" element={<WatchLaterPage />} />
      <Route path="/liked" element={<LikedVideosPage />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/music" element={<MusicPage />} />
      <Route path="/gaming" element={<GamingPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/sports" element={<SportsPage />} />

      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}
