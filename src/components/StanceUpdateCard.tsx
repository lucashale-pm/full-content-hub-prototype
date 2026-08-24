import { ArrowRight, Bookmark, Clock3, Scale } from "lucide-react";
import { getStancePath } from "../app/useHashRoute";
import type { StanceOpinion, StanceRecord } from "../content/types";
import { GameFollowRow } from "./GameFollowRow";
import { StanceAvatar } from "./StanceAvatar";

interface StanceUpdateCardProps {
  stance: StanceRecord;
  opinion: StanceOpinion;
}

const sentimentStyles = {
  opposing: "border-[#9b3e49] bg-[#34272f] text-[#f4adb4]",
  neutral: "border-[#53667e] bg-[#2d3542] text-[#c6d5ea]",
  supporting: "border-[#397056] bg-[#26372f] text-[#a9e2bd]",
} as const;

export function StanceUpdateCard({ stance, opinion }: StanceUpdateCardProps) {
  return (
    <article className="relative min-h-[197px] w-[calc(100%+2rem)] -mx-4 rounded-3xl bg-black px-4 py-6 text-gr-text" aria-label={`${opinion.author.name}'s stance on ${stance.title}`}>
      <div className="flex flex-col gap-2">
        <a className="mb-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#DC361A] px-2.5 py-2 text-xs font-bold uppercase tracking-[0.06em] text-white no-underline" href={getStancePath(stance.id)}>
          <Scale size={13} strokeWidth={2.2} aria-hidden="true" />
          New viewpoint added
        </a>

        <header className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2.5">
              <StanceAvatar profile={opinion.author} size="sm" />
              <div className="min-w-0">
                <span className="block truncate text-sm font-bold leading-[17px]">{opinion.author.name}</span>
                <span className="flex flex-wrap items-center gap-1.5 text-xs leading-[14px] text-gr-muted">
                  <Clock3 size={12} aria-hidden="true" />
                  {opinion.addedLabel}
                </span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {opinion.credentials.slice(0, 2).map((credential) => (
                <span key={credential.text} className="rounded-full border border-[#414b5c] px-2 py-1 text-[11px] leading-[13px] text-gr-subtle">
                  {credential.text}
                </span>
              ))}
            </div>
            <div className="mt-4"><GameFollowRow game={stance.game} /></div>
          </div>
          <span className="shrink-0 text-gr-muted" aria-label="Not saved"><Bookmark size={18} strokeWidth={2} aria-hidden="true" /></span>
        </header>

        <a className="block no-underline" href={getStancePath(stance.id)}>
          <span className={`mt-5 inline-flex rounded-full border px-2 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${sentimentStyles[opinion.sentiment]}`}>
            {opinion.label}
          </span>
          <h3 className="m-0 mt-2 text-[20px] font-bold leading-[26px] tracking-[-0.02em]">“{opinion.statement}”</h3>
          <p className="m-0 mt-2 text-sm leading-[1.45] text-gr-muted">{opinion.paragraphs[0]}</p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gr-action">
            Read {opinion.author.name}'s full stance
            <ArrowRight size={16} aria-hidden="true" />
          </span>

          <div className="mt-5 overflow-hidden rounded-3xl border border-[#3b4555] bg-[#191919]">
            {stance.hero && (
              <img className="aspect-[16/9] w-full object-cover" src={stance.hero.url} alt={stance.hero.alt} loading="lazy" />
            )}
            <div className="p-4">
              <h2 className="m-0 line-clamp-2 text-base font-semibold leading-[1.3] tracking-[-0.02em]">{stance.title}</h2>
            </div>
          </div>
        </a>
      </div>
    </article>
  );
}
