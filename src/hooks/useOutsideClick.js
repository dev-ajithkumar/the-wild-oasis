import { useEffect, useRef } from "react";

export function useOutsideClick(handler) {
  const ref = useRef();
  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, [handler]);

  return ref;
}
