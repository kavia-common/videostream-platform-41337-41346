import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./common/Avatar";

/**
 * PUBLIC_INTERFACE
 * VideoCard displays a video search result row with thumbnail, title, channel, stats, and optional description.
 */
export default function VideoCard({
  id,
  thumbnailUrl = "",
  title = "",
  duration = "",
  channel = { name: "", avatarUrl: "", verified: false },
  stats = { views: "", publishedAt: "" },
  description = "",
}) {
  const watchTo = `/watch/${id || ""}`;
  const channelTo = `/channel/${encodeURIComponent(channel?.name || "")}`;

  return (
    <article
      className="video-card"
      style={{
        display: "flex",
        gap: 16,
        paddingBlock: 8,
      }}
    >
      <Link
        to={watchTo}
        style={{ display: "block", position: "relative", borderRadius: 12, overflow: "hidden", background: "var(--bg-elev-0)" }}
        aria-label={`Watch ${title}`}
      >
        <div
          style={{
            width: 360,
            maxWidth: "100%",
            aspectRatio: "16 / 9",
            background: "var(--bg-elev-0)",
          }}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : null}
        </div>
        {duration ? (
          <span
            style={{
              position: "absolute",
              right: 8,
              bottom: 8,
              padding: "2px 6px",
              background: "rgba(0,0,0,0.8)",
              color: "#fff",
              fontSize: 12,
              borderRadius: 4,
            }}
          >
            {duration}
          </span>
        ) : null}
      </Link>

      <div style={{ minWidth: 0, flex: 1 }}>
        <Link
          to={watchTo}
          style={{
            color: "var(--text-primary)",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.3,
            display: "inline-block",
          }}
        >
          <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {title}
          </span>
        </Link>

        <div style={{ height: 6 }} />

        <Link
          to={channelTo}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)" }}
        >
          <Avatar src={channel?.avatarUrl} name={channel?.name} size={24} alt={`${channel?.name} avatar`} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>{channel?.name}</span>
          {channel?.verified ? (
            <span
              className="badge-verified"
              aria-label="Verified"
              title="Verified"
              style={{ fontSize: 14 }}
            >
              ✔︎
            </span>
          ) : null}
        </Link>

        <div style={{ height: 6 }} />

        <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
          {stats?.views ? <span>{stats.views} views</span> : null}
          {stats?.views && stats?.publishedAt ? (
            <span aria-hidden="true" style={{ paddingInline: 8 }}>
              •
            </span>
          ) : null}
          {stats?.publishedAt ? <span>{stats.publishedAt}</span> : null}
        </div>

        {description ? (
          <>
            <div style={{ height: 6 }} />
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: 14,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          </>
        ) : null}
      </div>
    </article>
  );
}
