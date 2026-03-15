import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Scrolls to the top of the page on every route change.
 * This fixes the bad UX where navigating to a new page keeps the scroll
 * position from the previous page.
 *
 * Must be placed inside <BrowserRouter> in App.tsx.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

