import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import preview from "../../content/big-preview.json";
import type { BigPreviewRecord, BigPreviewRelated } from "../content/types";
import { GameFollowRow } from "./GameFollowRow";

const bigPreview = preview as BigPreviewRecord;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function RelatedPreview({ article }: { article: BigPreviewRelated }) {
  return (
    <article className="flex min-w-[205px] max-w-[225px] flex-col gap-3 snap-start">
      <a className="no-underline" href={article.url} target="_blank" rel="noreferrer">
        <h3 className="m-0 mt-2 line-clamp-5 text-[16px] font-semibold leading-[1.2] tracking-[-0.02em]">{article.title}</h3>
      </a>
      <footer className="flex items-center gap-3 text-xs font-semibold leading-[14px] text-gr-muted">
        <span className="flex items-center gap-1" aria-label={`${article.reactionCount} reactions`}><Heart size={14} strokeWidth={2} aria-hidden="true" /><span>{article.reactionCount}</span></span>
        <span className="flex items-center gap-1" aria-label={`${article.commentCount} comments`}><MessageCircle size={14} strokeWidth={2} aria-hidden="true" /><span>{article.commentCount}</span></span>
        <span aria-label="Share unavailable"><Share2 size={16} strokeWidth={2} aria-hidden="true" /></span>
      </footer>
    </article>
  );
}

export function BigPreviewCard() {
  return (
    <article className="w-full border-t-2 border-[#38404e] py-6 text-gr-text" aria-label={bigPreview.title}>
      <div className="flex flex-col gap-2">
        <header className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2.5">
              <img className="size-8 shrink-0 rounded-full object-cover" src={bigPreview.author.image} alt={bigPreview.author.name} loading="lazy" />
              <div className="min-w-0">
                <span className="truncate text-sm font-bold leading-[17px]">{bigPreview.author.name}</span>
                <time className="block text-xs leading-[14px] text-gr-muted" dateTime={bigPreview.publishedAt}>{formatDate(bigPreview.publishedAt)}</time>
              </div>
            </div>
            <div className="mt-4"><GameFollowRow game={bigPreview.game} /></div>
          </div>
          <span className="shrink-0 text-gr-muted" aria-label="Not saved"><Bookmark size={18} strokeWidth={2} aria-hidden="true" /></span>
        </header>

        <a className="-mx-4 block w-[calc(100%+2rem)] no-underline" href={bigPreview.canonicalUrl} target="_blank" rel="noreferrer">
          <img className="block h-auto w-full" src={bigPreview.hero.url} alt={bigPreview.hero.alt} loading="eager" />
        </a>

        <div>
          <p className="m-0 text-xs font-bold uppercase leading-[14px] text-gr-subtle">{bigPreview.label}</p>
          <a className="no-underline" href={bigPreview.canonicalUrl} target="_blank" rel="noreferrer">
            <h2 className="m-0 mt-2 text-2xl font-semibold leading-[1.2] tracking-[-0.03em]">{bigPreview.title}</h2>
          </a>
          <p className="m-0 mt-2 text-sm leading-[1.4] text-gr-muted">{bigPreview.strapline}</p>
        </div>

        <footer className="flex w-full items-center text-gr-muted">
          <div className="flex items-center gap-3 text-xs font-semibold leading-[14px]">
            <span className="flex items-center gap-1" aria-label={`${bigPreview.reactionCount} reactions`}><Heart size={14} strokeWidth={2} aria-hidden="true" /><span>{bigPreview.reactionCount}</span></span>
            <span className="flex items-center gap-1" aria-label={`${bigPreview.commentCount} comments`}><MessageCircle size={14} strokeWidth={2} aria-hidden="true" /><span>{bigPreview.commentCount}</span></span>
            <span aria-label="Share unavailable"><Share2 size={16} strokeWidth={2} aria-hidden="true" /></span>
          </div>
        </footer>

        <section className="pt-6" aria-labelledby="related-preview-title">
          <h3 id="related-preview-title" className="m-0 text-xs font-extrabold uppercase tracking-[0.14em] text-gr-subtle">Related</h3>
          <div className="mt-3 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {bigPreview.related.map((article) => <RelatedPreview key={article.id} article={article} />)}
          </div>
        </section>
      </div>
    </article>
  );
}
