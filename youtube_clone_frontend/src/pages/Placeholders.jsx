import React from "react";

/**
 * PUBLIC_INTERFACE
 * Generic placeholder section for simple routed pages like Shorts, Subscriptions, etc.
 */
export function SimplePlaceholder({ title, description }) {
  return (
    <div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{title}</h2>
      {description ? (
        <p style={{ color: "var(--text-secondary)" }}>{description}</p>
      ) : null}
      <div
        style={{
          marginTop: 12,
          height: 160,
          background:
            "linear-gradient(90deg, rgba(37,99,235,0.15), rgba(245,158,11,0.15))",
          borderRadius: 12,
          border: "1px solid var(--stroke-muted)",
        }}
      />
    </div>
  );
}

// PUBLIC_INTERFACE
export function ShortsPage() {
  /** Placeholder page for Shorts. */
  return <SimplePlaceholder title="Shorts" description="Shorts feed placeholder." />;
}

// PUBLIC_INTERFACE
export function SubscriptionsPage() {
  /** Placeholder page for Subscriptions. */
  return <SimplePlaceholder title="Subscriptions" description="Your subscriptions feed placeholder." />;
}

// PUBLIC_INTERFACE
export function HistoryPage() {
  /** Placeholder page for History. */
  return <SimplePlaceholder title="History" description="Watch history placeholder." />;
}

// PUBLIC_INTERFACE
export function WatchLaterPage() {
  /** Placeholder page for Watch Later. */
  return <SimplePlaceholder title="Watch later" description="Your watch later list placeholder." />;
}

// PUBLIC_INTERFACE
export function LikedVideosPage() {
  /** Placeholder page for Liked videos. */
  return <SimplePlaceholder title="Liked videos" description="Your liked videos placeholder." />;
}

// PUBLIC_INTERFACE
export function TrendingPage() {
  /** Placeholder page for Trending. */
  return <SimplePlaceholder title="Trending" description="Trending videos placeholder." />;
}

// PUBLIC_INTERFACE
export function MusicPage() {
  /** Placeholder page for Music. */
  return <SimplePlaceholder title="Music" description="Music videos placeholder." />;
}

// PUBLIC_INTERFACE
export function GamingPage() {
  /** Placeholder page for Gaming. */
  return <SimplePlaceholder title="Gaming" description="Gaming videos placeholder." />;
}

// PUBLIC_INTERFACE
export function NewsPage() {
  /** Placeholder page for News. */
  return <SimplePlaceholder title="News" description="Latest news videos placeholder." />;
}

// PUBLIC_INTERFACE
export function SportsPage() {
  /** Placeholder page for Sports. */
  return <SimplePlaceholder title="Sports" description="Sports videos placeholder." />;
}
