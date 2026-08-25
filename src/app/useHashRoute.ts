import { useEffect, useState } from "react";

export type Route = { name: "hub" } | { name: "feed" } | { name: "title-cards" } | { name: "item"; id: string } | { name: "stance"; id: string };

function readRoute(): Route {
  const redirectPath = new URLSearchParams(window.location.search).get("redirect");
  const pathname = redirectPath ? new URL(redirectPath, window.location.origin).pathname : window.location.pathname;
  const stanceMatch = pathname.match(/(?:^|\/)stance\/([^/]+)$/);
  if (stanceMatch) return { name: "stance", id: decodeURIComponent(stanceMatch[1]) };
  if (/(?:^|\/)title-cards\/?$/.test(pathname)) return { name: "title-cards" };
  if (/(?:^|\/)feed\/?$/.test(pathname)) return { name: "feed" };

  const match = window.location.hash.match(/^#\/item\/([^/]+)$/);
  return match ? { name: "item", id: decodeURIComponent(match[1]) } : { name: "hub" };
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
  return getAppPath(`stance/${encodeURIComponent(id)}`);
}

export function getFeedPath() {
  return getAppPath("feed");
}

export function getHubPath() {
  return getAppPath("");
}

function getAppPath(path: string) {
  const pathname = window.location.pathname.replace(/\/$/, "");
  const routeMarker = pathname.match(/^(.*?)(?:\/(?:feed|stance)(?:\/.*)?$)/);
  const base = routeMarker ? routeMarker[1] : pathname;
  return `${base || ""}/${path}`.replace(/^([^/])/, "/$1");
}
