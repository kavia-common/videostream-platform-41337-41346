//
// Search API wrapper with mock fallback
//
import { getHttpBaseUrl, apiLog } from "./config";
import { fetchWithTimeout } from "./client";

/**
 * Maps a backend API result shape into the UI VideoCard-compatible shape.
 * Adjust this mapping as backend stabilizes.
 */
function mapApiResultToVideo(item, index = 0) {
  // Try multiple common fields with safe defaults
  const id = item.id || item.videoId || item._id || String(index + 1);
  const title = item.title || item.name || "Untitled";
  const thumbnailUrl =
    item.thumbnailUrl ||
    item.thumbnail ||
    item.thumbnails?.high?.url ||
    item.thumbnails?.medium?.url ||
    item.thumbnails?.default?.url ||
    "";
  const duration = item.duration || item.contentDetails?.duration || "";
  const channelName = item.channel?.name || item.channelTitle || item.owner || "Channel";
  const channelAvatar =
    item.channel?.avatarUrl ||
    item.channelAvatar ||
    item.author?.avatar ||
    "";
  const verified = !!(item.channel?.verified || item.verified);

  const views =
    item.stats?.views ??
    item.viewCount ??
    item.statistics?.viewCount ??
    "";
  const publishedAt =
    item.stats?.publishedAt ||
    item.publishedAt ||
    item.snippet?.publishedAt ||
    "";

  const description =
    item.description || item.snippet?.description || "";

  return {
    id,
    thumbnailUrl,
    title,
    duration,
    channel: {
      name: channelName,
      avatarUrl: channelAvatar,
      verified,
    },
    stats: {
      views: typeof views === "number" ? views.toLocaleString() : String(views || ""),
      publishedAt: publishedAt ? timeSince(publishedAt) : "",
    },
    description,
  };
}

/**
 * crude relative time helper for publishedAt strings or Date-like values
 */
function timeSince(input) {
  try {
    const d = new Date(input);
    const s = Math.max(0, (Date.now() - d.getTime()) / 1000);
    const units = [
      ["year", 31536000],
      ["month", 2592000],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1],
    ];
    for (const [name, sec] of units) {
      const v = Math.floor(s / sec);
      if (v >= 1) return `${v} ${name}${v > 1 ? "s" : ""} ago`;
    }
  } catch (_) {
    // ignore
  }
  return "";
}

/**
 * PUBLIC_INTERFACE
 * fetchSearchResults queries the backend if base URL is configured; otherwise falls back to local mock.
 * - query: string
 * - pageToken: optional string for pagination
 *
 * Returns: { items: Array<Video>, nextPageToken?: string }
 */
export async function fetchSearchResults(query, pageToken) {
  const base = getHttpBaseUrl();
  const q = (query || "").trim();

  // If no base configured, always use mock
  if (!base) {
    apiLog.warn("No API base configured. Using local mock for search results.");
    return loadMock(q);
  }

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (pageToken) params.set("pageToken", pageToken);

  const url = `${base.replace(/\/+$/, "")}/search?${params.toString()}`;

  try {
    const data = await fetchWithTimeout(url, { method: "GET" }, { timeoutMs: 10000, parse: "json" });
    // Expected backend shape: { items: [...], nextPageToken?: string }
    const rawItems = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
    const items = rawItems.map((it, i) => mapApiResultToVideo(it, i));
    return {
      items,
      nextPageToken: data?.nextPageToken,
    };
  } catch (err) {
    apiLog.error("Search API failed, falling back to mock:", err);
    return loadMock(q);
  }
}

async function loadMock(q) {
  try {
    const res = await fetchWithTimeout("/mocks/sampleSearchResults.json", {}, { timeoutMs: 3000, parse: "json" });
    const rawItems = Array.isArray(res?.items) ? res.items : Array.isArray(res) ? res : [];
    const filtered = q
      ? rawItems.filter((it) => {
          const txt = `${it.title || ""} ${it.channel?.name || it.channelTitle || ""} ${it.description || ""}`.toLowerCase();
          return txt.includes(q.toLowerCase());
        })
      : rawItems;
    const items = filtered.map((it, i) => mapApiResultToVideo(it, i));
    return { items, nextPageToken: undefined };
  } catch (e) {
    apiLog.error("Failed to load local mock results:", e);
    return { items: [], nextPageToken: undefined };
    }
}
