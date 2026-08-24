import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import type { ArticleAuthor, ArticleRecord } from "../content/types";
import { getArticleSummary } from "../lib/articleText";
import { GameFollowRow } from "./GameFollowRow";

interface FeaturedArticleCardProps {
  article: ArticleRecord;
  author: ArticleAuthor;
}

function getHero(article: ArticleRecord) {
  const image = article.blocks.find(
    (block): block is { type: "image"; src: string; alt?: string } =>
      typeof block === "object"
      && block !== null
      && "type" in block
      && block.type === "image"
      && "src" in block
      && typeof block.src === "string",
  );

  return image ? { url: image.src, alt: image.alt || article.title } : article.thumbnail;
}

export function FeaturedArticleCard({ article, author }: FeaturedArticleCardProps) {
  const hero = getHero(article);
  const articleHref = article.canonicalUrl || `#/item/${encodeURIComponent(article.id)}`;
  const date = article.publishedAt
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(article.publishedAt))
    : "";

  return (
    <article className="relative w-full border-t-2 border-gr-action py-6 text-gr-text" aria-label={`Featured: ${article.title}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <p className="m-0 text-xs font-extrabold uppercase tracking-[0.14em] text-gr-action">The big read</p>
          <span className="text-gr-muted" aria-label="Not saved"><Bookmark size={18} strokeWidth={2} aria-hidden="true" /></span>
        </div>

        <header className="flex w-full items-start gap-2.5">
          <img className="size-8 shrink-0 rounded-full object-cover" src={author.image} alt={author.name} loading="lazy" />
          <div className="min-w-0">
            <span className="truncate text-sm font-bold leading-[17px]">{author.name}</span>
            {date && <time className="block text-xs leading-[14px] text-gr-muted" dateTime={article.publishedAt ?? undefined}>{date}</time>}
          </div>
        </header>

        <div className="mt-2"><GameFollowRow game={article.game} /></div>

        {hero && (
          <a className="block aspect-[16/9] overflow-hidden rounded-3xl no-underline" href={articleHref} target={article.canonicalUrl ? "_blank" : undefined} rel={article.canonicalUrl ? "noreferrer" : undefined}>
            <img className="size-full object-cover" src={hero.url} alt={hero.alt} loading="lazy" />
          </a>
        )}

        <div>
          <a className="no-underline" href={articleHref} target={article.canonicalUrl ? "_blank" : undefined} rel={article.canonicalUrl ? "noreferrer" : undefined}>
            <h2 className="m-0 mt-2 text-2xl font-semibold leading-[1.2] tracking-[-0.03em]">{article.title}</h2>
          </a>
          {getArticleSummary(article) && <p className="m-0 mt-2 text-sm leading-[1.4] text-gr-muted">{getArticleSummary(article)}</p>}
        </div>

        <footer className="flex w-full items-center text-gr-muted">
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
