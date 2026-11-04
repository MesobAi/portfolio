"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to the `#section` target after the page loads or the route changes.
 * Fixes the case where navigating to `/#projects` (from another page, or a
 * direct URL) updates the hash but the browser/Next router doesn't scroll.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    // Wait a frame so layout is settled before scrolling.
    const raf = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
