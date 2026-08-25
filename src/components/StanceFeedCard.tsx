import { Bookmark, Clock3, MessageCircle, Scale } from "lucide-react";
import { getStancePath } from "../app/useHashRoute";
import type { StanceRecord } from "../content/types";
import { GameFollowRow } from "./GameFollowRow";
import { StanceAvatar } from "./StanceAvatar";

interface StanceFeedCardProps {
  stance: StanceRecord;
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

export function StanceFeedCard({ stance }: StanceFeedCardProps) {
  const [opposing, supporting] = stance.vote.options;
  const voteTotal = opposing.voteCount + supporting.voteCount;
  const opposingPercent = Math.round((opposing.voteCount / voteTotal) * 100);
  const supportingPercent = 100 - opposingPercent;

  return (
    <article className="relative min-h-[197px] w-full border-t-2 border-[#38404e] py-6 text-gr-text" aria-label={stance.title}>
      <div className="flex flex-col gap-2">
        <a className="inline-flex self-start items-center gap-1.5 rounded-full bg-[#DC361A] px-2.5 py-1 text-xs font-bold uppercase text-white no-underline" href={getStancePath(stance.id)}>
          <Scale size={13} strokeWidth={2.2} aria-hidden="true" />
          {stance.label}
        </a>
        <header className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2.5">
              <StanceAvatar profile={stance.author} size="sm" />
              <div className="min-w-0">
                <span className="block truncate text-sm font-bold leading-[17px]">{stance.author.name}</span>
                <span className="flex flex-wrap items-center gap-1.5 text-xs leading-[14px] text-gr-muted">
                  <Clock3 size={12} aria-hidden="true" />
                  {stance.publishedLabel}
                  <span aria-hidden="true">•</span>
                  <MessageCircle size={12} aria-hidden="true" />
                  {formatCount(stance.commentCount)}
                </span>
              </div>
            </div>
            <div className="mt-4"><GameFollowRow game={stance.game} /></div>
          </div>
          <span className="shrink-0 text-gr-muted" aria-label="Not saved"><Bookmark size={18} strokeWidth={2} aria-hidden="true" /></span>
        </header>

        <a className="block no-underline" href={getStancePath(stance.id)}>
          <h2 className="m-0 text-base font-semibold leading-[1.3]">{stance.title}</h2>
          <p className="m-0 mt-1.5 text-sm leading-[1.35] text-gr-muted">{stance.snippet}</p>

          <div className="mt-4" aria-label={`${opposingPercent}% ${opposing.label}; ${supportingPercent}% ${supporting.label}`}>
            <div className="flex h-2 overflow-hidden rounded-full bg-[#495365]">
              <span className="bg-[#d0515d]" style={{ width: `${opposingPercent}%` }} />
              <span className="bg-[#71839e]" style={{ width: `${supportingPercent}%` }} />
            </div>
            <div className="mt-2 flex justify-between gap-3 text-xs font-semibold leading-[14px]">
              <span className="max-w-[58%] text-[#f1a5ac]">{opposingPercent}% {opposing.label}</span>
              <span className="max-w-[42%] text-right text-[#bdcbe0]">{supportingPercent}% {supporting.label}</span>
            </div>
          </div>
        </a>
      </div>
    </article>
  );
}
