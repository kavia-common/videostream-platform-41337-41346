import { useCallback, useEffect, useState } from "react";

// PUBLIC_INTERFACE
export function useQueryParam(key, defaultValue = "") {
  /**
   * Minimal query param hook: returns [value, setValue].
   * setValue updates the current URL without navigation (history.replaceState).
   */
  const readValue = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) ?? defaultValue;
  }, [key, defaultValue]);

  const [value, setValueState] = useState(readValue);

  useEffect(() => {
    setValueState(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (next) => {
      const params = new URLSearchParams(window.location.search);
      if (next === null || next === undefined || next === "") {
        params.delete(key);
      } else {
        params.set(key, next);
      }
      const search = params.toString();
      const url = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash || ""}`;
      window.history.replaceState(null, "", url);
      setValueState(next ?? "");
    },
    [key]
  );

  return [value, setValue];
}
