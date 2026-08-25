import { BarChart3, Brain, Medal, Mic, Trophy } from "lucide-react";
import { createElement } from "react";
import { useEffect, useRef } from "react";
import type { StanceCredential, StanceOpinion } from "../content/types";
import { OpinionReactionRow } from "./OpinionReactionRow";
import type { OpinionReaction } from "./OpinionReactionRow";
import { StanceAvatar } from "./StanceAvatar";

const credentialIcons = {
  medal: Medal,
  chart: BarChart3,
  brain: Brain,
  mic: Mic,
  trophy: Trophy,
} as const;

const sentimentStyles = {
  opposing: "border-[#9b3e49] bg-[#34272f] text-[#f4adb4]",
  neutral: "border-[#53667e] bg-[#2d3542] text-[#c6d5ea]",
  supporting: "border-[#397056] bg-[#26372f] text-[#a9e2bd]",
} as const;

function Credential({ credential }: { credential: StanceCredential }) {
  const Icon = credentialIcons[credential.icon];

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#414b5c] px-2 py-1 text-[11px] leading-[13px] text-gr-subtle">
      <Icon size={12} aria-hidden="true" />
      {credential.text}
    </span>
  );
}

interface StanceOpinionCardProps {
  opinion: StanceOpinion;
  reaction?: OpinionReaction | null;
  onReact?: (reaction: OpinionReaction) => void;
  onEnterView?: (opinionId: string) => void;
}

export function StanceOpinionCard({ opinion, reaction, onReact, onEnterView }: StanceOpinionCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !onEnterView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnterView(opinion.id);
      },
      { threshold: 0.2, rootMargin: "-35% 0px -45% 0px" },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [onEnterView, opinion.id]);

  return (
    <div className="relative pl-6">
      <span className="absolute left-0 top-2 size-3 rounded-full bg-[#DC361A] ring-4 ring-[#252934]" aria-hidden="true" />
      <p className="m-0 pb-2 text-xs font-semibold uppercase text-gr-muted">{opinion.addedLabel}</p>
      <article ref={cardRef} className="rounded-3xl border border-[#3b4555] bg-[#292f3c] p-4">
        <span className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-bold uppercase ${sentimentStyles[opinion.sentiment]}`}>
          {opinion.label}
        </span>
        <h3 className="m-0 mt-3 text-[20px] font-bold leading-[26px]">“{opinion.statement}”</h3>

        <div className="mt-4 flex items-center gap-2.5">
          <StanceAvatar profile={opinion.author} />
          <span className="text-sm font-bold leading-[17px]">{opinion.author.name}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {opinion.credentials.map((credential) => <Credential key={credential.text} credential={credential} />)}
        </div>

        {opinion.video ? (
          <div className="mt-4">
            <p className="m-0 text-xs font-bold uppercase text-gr-action">Video viewpoint</p>
            <div className="relative mt-2 aspect-[9/16] w-full overflow-hidden rounded-3xl bg-[#15171d] [&>fw-storyblock]:block [&>fw-storyblock]:size-full">
              {createElement("fw-storyblock", {
                channel: opinion.video.channel,
                video: opinion.video.videoId,
                max_videos: "1",
                autoplay: "true",
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-5 text-[18px] leading-[26px] text-gr-subtle">
            {opinion.paragraphs.map((paragraph) => <p key={paragraph} className="m-0">{paragraph}</p>)}
          </div>
        )}

        {onReact && <OpinionReactionRow authorName={opinion.author.name} selected={reaction} onSelect={onReact} />}
      </article>
    </div>
  );
}
