import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import type { ArticleAuthor, ArticleRecord } from "../content/types";
import { getArticleSummary } from "../lib/articleText";
import { GameFollowRow } from "./GameFollowRow";

interface ArticleCardProps {
  article: ArticleRecord;
  author: ArticleAuthor;
  isSaved?: boolean;
  isReacted?: boolean;
  isFirst?: boolean;
}

function formatDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function ArticleCard({ article, author, isSaved = false, isReacted = false, isFirst = false }: ArticleCardProps) {
  const topic = article.game || article.categories[0] || "RPG";
  const articleHref = article.canonicalUrl || `#/item/${encodeURIComponent(article.id)}`;
  const date = formatDate(article.publishedAt);

  return (
    <article
      className={`relative min-h-[197px] w-full px-0 py-6 text-gr-text ${
        isFirst ? "pt-0" : "before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5 before:bg-[#38404e]"
      }`}
      aria-label={article.title}
    >
      <div className="flex flex-col gap-4">
        <header className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <GameFollowRow game={topic} />
            <div className="mt-2 flex min-w-0 items-center gap-2.5">
              <img className="size-8 shrink-0 rounded-full bg-[#ebeae3] object-cover" src={author.image} alt={author.name} loading="lazy" />
              <div className="min-w-0">
                <span className="truncate text-sm font-bold leading-[17px]">{author.name}</span>
                {date && <time className="block text-xs leading-[14px] text-gr-muted" dateTime={article.publishedAt ?? undefined}>{date}</time>}
              </div>
            </div>
          </div>
          <span className="shrink-0 text-gr-muted" aria-label={isSaved ? "Saved" : "Not saved"}>
            <Bookmark size={18} strokeWidth={2} fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
          </span>
        </header>

        <div className="flex w-full flex-col gap-0.5">
          <a
            className="flex w-full items-center gap-4 no-underline"
            href={articleHref}
            target={article.canonicalUrl ? "_blank" : undefined}
            rel={article.canonicalUrl ? "noreferrer" : undefined}
          >
            <div className="min-w-0 flex-1">
              <h2 className="m-0 line-clamp-2 text-base font-bold leading-[1.3] tracking-[-0.02em]">{article.title}</h2>
              {getArticleSummary(article) && <p className="m-0 mt-1.5 line-clamp-2 text-sm leading-[1.35] text-gr-muted">{getArticleSummary(article)}</p>}
            </div>
            {article.thumbnail && (
              <div className="size-[72px] shrink-0 overflow-hidden rounded-xl bg-[#252525]">
                <img className="size-full object-cover" src={article.thumbnail.url} alt={article.thumbnail.alt || article.title} loading="lazy" />
              </div>
            )}
          </a>
        </div>

        <footer className="flex w-full items-center pb-0 text-gr-muted">
          <div className="flex items-center gap-3 text-xs font-semibold leading-[14px]">
            <span className="flex items-center gap-1" aria-label={`${article.reactionCount} reactions`}><Heart size={14} strokeWidth={2} fill={isReacted ? "currentColor" : "none"} aria-hidden="true" /><span>{article.reactionCount}</span></span>
            <span className="flex items-center gap-1" aria-label={`${article.commentCount} comments`}><MessageCircle size={14} strokeWidth={2} aria-hidden="true" /><span>{article.commentCount}</span></span>
            <span aria-label="Share unavailable"><Share2 size={16} strokeWidth={2} aria-hidden="true" /></span>
          </div>
        </footer>
      </div>
    </article>
  );
}
