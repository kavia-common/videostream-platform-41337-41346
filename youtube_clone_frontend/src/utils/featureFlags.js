//
// Feature flags reader: uses REACT_APP_FEATURE_FLAGS env var.
// Supports formats:
// - JSON string: {"newSearch":true,"showBeta":false}
// - Comma list: "newSearch, betaPanel=false, cool=true"
// - Semicolon list: "a=true;b=false"
// Values default to true if no explicit "=value" is provided.
//
const raw = process.env.REACT_APP_FEATURE_FLAGS || "";

function parseFlags(input) {
  if (!input) return {};
  // Try JSON first
  try {
    const parsed = JSON.parse(input);
    if (parsed && typeof parsed === "object") return parsed;
  } catch (_) {
    // continue to parse as delimited string
  }

  const flags = {};
  const parts = input.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
  for (const p of parts) {
    const [k, v] = p.split("=").map((s) => s.trim());
    if (!k) continue;
    if (v === undefined || v === "") {
      flags[k] = true;
    } else {
      const lower = v.toLowerCase();
      if (["true", "1", "yes", "on"].includes(lower)) flags[k] = true;
      else if (["false", "0", "no", "off"].includes(lower)) flags[k] = false;
      else flags[k] = v; // string fallback
    }
  }
  return flags;
}

const parsedFlags = parseFlags(raw);

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns a plain object of parsed feature flags keyed by flag name. */
  return { ...parsedFlags };
}

// PUBLIC_INTERFACE
export function isFeatureEnabled(key, defaultValue = false) {
  /** Returns boolean for a single flag. Defaults to defaultValue if missing. */
  const val = parsedFlags[key];
  if (val === undefined) return defaultValue;
  return !!val;
}
