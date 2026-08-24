import { ChevronDown, Check, Scale, Send } from "lucide-react";
import { useEffect, useState } from "react";
import type { StanceOpinion, StanceRecord } from "../content/types";
import type { OpinionReaction } from "./OpinionReactionRow";
import type { StanceVoteChoice } from "./StanceVotePanel";

type DockMode = "vote" | "explain" | "thanks";

interface StanceEngagementDockProps {
  stance: StanceRecord;
  activeOpinion?: StanceOpinion;
  activeReaction?: OpinionReaction | null;
  selectedVote: StanceVoteChoice | null;
  onVote: (choice: StanceVoteChoice) => void;
  onSubmitViewpoint: (body: string) => void;
  onViewComments: () => void;
}

export function StanceEngagementDock({
  stance,
  activeOpinion,
  activeReaction,
  selectedVote,
  onVote,
  onSubmitViewpoint,
  onViewComments,
}: StanceEngagementDockProps) {
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<DockMode>(selectedVote ? "explain" : "vote");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!expanded || mode !== "vote") return;
    const collapseOnScroll = () => setExpanded(false);
    window.addEventListener("scroll", collapseOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", collapseOnScroll);
  }, [expanded, mode]);

  useEffect(() => {
    if (!selectedVote) return;
    setMode("explain");
    setExpanded(true);
  }, [selectedVote]);

  const activeContext = activeOpinion
    ? activeReaction
      ? `You ${activeReaction} with ${activeOpinion.author.name}`
      : `Reading ${activeOpinion.author.name}'s view`
    : "Have a view?";
  const selectedLabel = stance.vote.options.find((option) => option.id === selectedVote)?.label;

  function chooseVote(choice: StanceVoteChoice) {
    onVote(choice);
    setMode("explain");
    setExpanded(true);
  }

  function submitViewpoint() {
    const body = draft.trim();
    if (!body) return;
    onSubmitViewpoint(body);
    setDraft("");
    setMode("thanks");
  }

  return (
    <aside className="pointer-events-none fixed inset-x-0 bottom-4 z-50 mx-auto flex w-full max-w-[430px] justify-center px-4" aria-label="Stance engagement">
      <div className="pointer-events-auto w-full">
        {!expanded ? (
          <button
            className="mx-auto flex max-w-full items-center gap-2 rounded-full border border-[#4a5568] bg-[#151515]/95 px-4 py-2.5 text-left shadow-lg shadow-black/40 backdrop-blur"
            type="button"
            onClick={() => setExpanded(true)}
          >
            <Scale size={16} className="shrink-0 text-[#DC361A]" aria-hidden="true" />
            <span className="truncate text-xs font-bold text-white">{activeContext}</span>
            <span className="shrink-0 text-xs font-semibold text-[#ff8d4b]">Take a side</span>
          </button>
        ) : (
          <div className="rounded-3xl border border-[#4a5568] bg-[#151515]/98 p-4 shadow-2xl shadow-black/60 backdrop-blur" role="dialog" aria-label="Share your stance">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="m-0 flex items-center gap-1.5 text-sm font-bold text-white">
                  <Scale size={16} className="text-[#DC361A]" aria-hidden="true" />
                  {mode === "vote" ? "Where do you stand?" : mode === "explain" ? "What makes you say that?" : "Viewpoint added"}
                </p>
                {mode === "vote" && <p className="m-0 mt-1 text-xs leading-[16px] text-gr-muted">{activeOpinion ? `You’re reading ${activeOpinion.author.name}'s view. Your overall vote remains separate.` : "Add your position to this ongoing Stance."}</p>}
                {mode === "explain" && <p className="m-0 mt-1 text-xs leading-[16px] text-gr-muted">You chose: {selectedLabel}. Add the reasoning behind your view.</p>}
                {mode === "thanks" && <p className="m-0 mt-1 text-xs leading-[16px] text-gr-muted">Your viewpoint has been added to the discussion.</p>}
              </div>
              <button className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-gr-muted hover:bg-white/10 hover:text-white" type="button" onClick={() => setExpanded(false)} aria-label="Minimise stance engagement">
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>

            {mode === "vote" && (
              <div className="mt-4 grid gap-2">
                {stance.vote.options.map((option) => (
                  <button
                    key={option.id}
                    className="min-h-10 rounded-full border border-[#DC361A] bg-[#353b4a] px-3 py-2 text-center text-xs font-bold uppercase leading-[14px] text-white transition-colors hover:bg-[#454d5f]"
                    type="button"
                    onClick={() => chooseVote(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {mode === "explain" && (
              <div className="mt-4">
                <label className="sr-only" htmlFor="stance-dock-viewpoint">Explain your viewpoint</label>
                <textarea
                  id="stance-dock-viewpoint"
                  className="min-h-20 w-full resize-none rounded-2xl border border-[#465163] bg-[#20242d] px-3 py-2 text-sm leading-[1.4] text-gr-text outline-none placeholder:text-gr-muted focus:border-gr-action"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Add the reason behind your view..."
                />
                <div className="mt-2 flex items-center justify-between gap-2">
                  <button className="text-xs font-semibold text-gr-muted hover:text-white" type="button" onClick={() => setExpanded(false)}>Not now</button>
                  <button className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#DC361A] px-3 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={submitViewpoint} disabled={!draft.trim()}>
                    <Send size={14} aria-hidden="true" />
                    Post viewpoint
                  </button>
                </div>
              </div>
            )}

            {mode === "thanks" && (
              <button className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#465163] px-3 text-xs font-bold text-gr-subtle hover:border-[#6c7890]" type="button" onClick={onViewComments}>
                <Check size={14} className="text-[#86cf9b]" aria-hidden="true" />
                View discussion
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
