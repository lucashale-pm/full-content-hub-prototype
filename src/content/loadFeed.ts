import rawFeed from "../../content/feed.json";
import type { FeedDocument } from "./types";

function isFeedDocument(value: unknown): value is FeedDocument {
  if (typeof value !== "object" || value === null) return false;

  const document = value as { category?: unknown; source?: unknown; items?: unknown };
  return typeof document.category === "string"
    && typeof document.source === "string"
    && Array.isArray(document.items);
}

export function loadFeed(): FeedDocument {
  if (!isFeedDocument(rawFeed)) {
    throw new Error("content/feed.json must contain a category and an items array.");
  }

  return rawFeed;
}
