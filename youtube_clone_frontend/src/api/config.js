//
// API configuration helpers
//

/**
 * Internal util to normalize boolean-like values from env.
 */
function toBool(val, defaultValue = false) {
  if (val === undefined || val === null || val === "") return defaultValue;
  const s = String(val).toLowerCase();
  if (["1", "true", "yes", "on"].includes(s)) return true;
  if (["0", "false", "no", "off"].includes(s)) return false;
  return defaultValue;
}

// PUBLIC_INTERFACE
export const apiConfig = {
  /** Base REST API URL - preferred */
  baseUrl: process.env.REACT_APP_API_BASE || "",
  /** Alternate backend URL if base not provided */
  backendUrl: process.env.REACT_APP_BACKEND_URL || "",
  /** WebSocket base URL (if needed later) */
  wsUrl: process.env.REACT_APP_WS_URL || "",
  /** Log level: debug|info|warn|error */
  logLevel: (process.env.REACT_APP_LOG_LEVEL || "info").toLowerCase(),
  /** Healthcheck path for future diagnostics */
  healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || "/healthz",
  /** Node env proxy for behavior toggles */
  nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
  /** Whether experiments are enabled */
  experiments: toBool(process.env.REACT_APP_EXPERIMENTS_ENABLED, false),
};

/**
 * Returns the effective HTTP base URL to use.
 * Prefers REACT_APP_API_BASE, then REACT_APP_BACKEND_URL, otherwise empty.
 */
// PUBLIC_INTERFACE
export function getHttpBaseUrl() {
  return apiConfig.baseUrl || apiConfig.backendUrl || "";
}

/**
 * Simple logger that respects apiConfig.logLevel
 */
function createLogger(level) {
  const order = ["debug", "info", "warn", "error"];
  const idx = order.indexOf(level);
  const can = (l) => order.indexOf(l) >= (idx === -1 ? 1 : idx); // default "info" if unknown
  return {
    debug: (...args) => can("debug") && console.debug("[api]", ...args),
    info: (...args) => can("info") && console.info("[api]", ...args),
    warn: (...args) => can("warn") && console.warn("[api]", ...args),
    error: (...args) => can("error") && console.error("[api]", ...args),
  };
}

export const apiLog = createLogger(apiConfig.logLevel);
