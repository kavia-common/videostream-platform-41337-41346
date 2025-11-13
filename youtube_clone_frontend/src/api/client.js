//
// Lightweight fetch client with AbortController, timeout and logging
//
import { apiLog } from "./config";

/**
 * PUBLIC_INTERFACE
 * fetchWithTimeout performs a fetch with AbortController and returns parsed JSON by default.
 * - url: absolute or relative URL
 * - options: fetch options
 * - opts: { timeoutMs?: number, parse?: "json" | "text" | "raw" }
 */
export async function fetchWithTimeout(url, options = {}, opts = {}) {
  const { timeoutMs = 10000, parse = "json" } = opts;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  const startedAt = Date.now();
  apiLog.debug("fetch ->", url, options);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const duration = Date.now() - startedAt;
    apiLog.info(`${res.status} ${res.statusText} <- ${url} (${duration}ms)`);

    if (!res.ok) {
      const text = await safeReadBody(res);
      const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
      err.status = res.status;
      err.body = text;
      throw err;
    }

    if (parse === "raw") return res;
    if (parse === "text") return res.text();

    // default json
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      return res.json();
    }
    // Fallback if server didn't set content-type
    return res.text().then((t) => {
      try {
        return JSON.parse(t);
      } catch (_) {
        return t;
      }
    });
  } finally {
    clearTimeout(id);
  }
}

async function safeReadBody(res) {
  try {
    const text = await res.text();
    return text;
  } catch (e) {
    apiLog.warn("Failed to read error body", e);
    return "";
  }
}
