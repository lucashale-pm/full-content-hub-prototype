import { useEffect, useState } from "react";

export type Route = { name: "feed" } | { name: "item"; id: string } | { name: "stance"; id: string };

function readRoute(): Route {
  const redirectPath = new URLSearchParams(window.location.search).get("redirect");
  const pathname = redirectPath ? new URL(redirectPath, window.location.origin).pathname : window.location.pathname;
  const stanceMatch = pathname.match(/(?:^|\/)stance\/([^/]+)$/);
  if (stanceMatch) return { name: "stance", id: decodeURIComponent(stanceMatch[1]) };

  const match = window.location.hash.match(/^#\/item\/([^/]+)$/);
  return match ? { name: "item", id: decodeURIComponent(match[1]) } : { name: "feed" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const redirectPath = new URLSearchParams(window.location.search).get("redirect");
    if (redirectPath) window.history.replaceState({}, "", redirectPath);

    const updateRoute = () => setRoute(readRoute());
    window.addEventListener("hashchange", updateRoute);
    window.addEventListener("popstate", updateRoute);
    return () => {
      window.removeEventListener("hashchange", updateRoute);
      window.removeEventListener("popstate", updateRoute);
    };
  }, []);

  return route;
}

export function getStancePath(id: string) {
  const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}stance/${encodeURIComponent(id)}`;
}
