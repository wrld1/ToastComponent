import { useEffect } from "react";

export function useEscapeKey(callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        callback(event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}
