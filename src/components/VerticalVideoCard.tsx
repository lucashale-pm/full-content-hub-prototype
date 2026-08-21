import { createElement } from "react";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import type { ArticleAuthor, ArticleRecord } from "../content/types";
import { getArticleSummary } from "../lib/articleText";
import { GameFollowRow } from "./GameFollowRow";

interface VerticalVideoCardProps {
  article: ArticleRecord;
  author: ArticleAuthor;
}

export function VerticalVideoCard({ article, author }: VerticalVideoCardProps) {
  const articleHref = article.canonicalUrl || `#/item/${encodeURIComponent(article.id)}`;
  const date = article.publishedAt
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(article.publishedAt))
    : "";
  const storyblock = createElement("fw-storyblock", {
    channel: "gamesradar",
    video: "gKLLRZ",
    max_videos: "1",
    autoplay: "true",
  });

  return (
    <article className="relative w-full border-t-2 border-[#38404e] py-6 text-gr-text" aria-label={article.title}>
      <div className="flex flex-col gap-2">
        <header className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2.5">
              <img className="size-8 shrink-0 rounded-full object-cover" src={author.image} alt={author.name} loading="lazy" />
              <div className="min-w-0">
                <span className="truncate text-sm font-bold leading-[17px]">{author.name}</span>
                {date && <time className="block text-xs leading-[14px] text-gr-muted" dateTime={article.publishedAt ?? undefined}>{date}</time>}
              </div>
            </div>
            <div className="mt-4"><GameFollowRow game={article.game} /></div>
          </div>
          <span className="shrink-0 text-gr-muted" aria-label="Not saved">
            <Bookmark size={18} strokeWidth={2} aria-hidden="true" />
          </span>
        </header>

        <div>
          <h2 className="m-0 text-base font-semibold leading-[1.3] tracking-[-0.02em]">{article.title}</h2>
          {getArticleSummary(article) && <p className="m-0 mt-1.5 text-sm leading-[1.35] text-gr-muted">{getArticleSummary(article)}</p>}
          <a className="mt-1.5 inline-block text-sm font-bold text-gr-action no-underline" href={articleHref} target={article.canonicalUrl ? "_blank" : undefined} rel={article.canonicalUrl ? "noreferrer" : undefined}>
            Click here to read more
          </a>
        </div>

        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] bg-[#15171d] [&>fw-storyblock]:block [&>fw-storyblock]:size-full">
          {storyblock}
        </div>

        <footer className="flex w-full items-center pb-0 text-gr-muted">
          <div className="flex items-center gap-3 text-xs font-semibold leading-[14px]">
            <span className="flex items-center gap-1" aria-label={`${article.reactionCount} reactions`}><Heart size={14} strokeWidth={2} aria-hidden="true" /><span>{article.reactionCount}</span></span>
            <span className="flex items-center gap-1" aria-label={`${article.commentCount} comments`}><MessageCircle size={14} strokeWidth={2} aria-hidden="true" /><span>{article.commentCount}</span></span>
            <span aria-label="Share unavailable"><Share2 size={16} strokeWidth={2} aria-hidden="true" /></span>
          </div>
        </footer>
      </div>
    </article>
  );
}
