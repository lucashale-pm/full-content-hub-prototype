import { useEffect, useState } from "react";

export type Route = { name: "feed" } | { name: "item"; id: string };

function readRoute(): Route {
  const match = window.location.hash.match(/^#\/item\/([^/]+)$/);
  return match ? { name: "item", id: decodeURIComponent(match[1]) } : { name: "feed" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const updateRoute = () => setRoute(readRoute());
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  return route;
}
