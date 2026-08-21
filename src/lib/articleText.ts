import type { ArticleRecord } from "../content/types";

export function getArticleSummary(article: ArticleRecord) {
  const firstText = article.blocks.find(
    (block): block is { type: "text"; paragraphs: string[] } =>
      typeof block === "object"
      && block !== null
      && "type" in block
      && block.type === "text"
      && "paragraphs" in block
      && Array.isArray(block.paragraphs),
  );
  const summary = firstText?.paragraphs[0] ? stripMarkup(firstText.paragraphs[0]) : "";
  return summary.length > 150 ? `${summary.slice(0, 147).trimEnd()}...` : summary;
}

function stripMarkup(value: string) {
  const textOnly = value.replace(/<[^>]*>/g, " ");
  const decoded = new DOMParser().parseFromString(textOnly, "text/html").body.textContent || "";
  return decoded.replace(/\s+/g, " ").trim();
}
