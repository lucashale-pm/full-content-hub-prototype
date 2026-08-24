import { Check, ThumbsDown, ThumbsUp } from "lucide-react";

export type OpinionReaction = "agree" | "disagree";

interface OpinionReactionRowProps {
  authorName: string;
  selected?: OpinionReaction | null;
  onSelect: (reaction: OpinionReaction) => void;
}

export function OpinionReactionRow({ authorName, selected = null, onSelect }: OpinionReactionRowProps) {
  return (
    <div className="mt-5 border-t border-[#414b5c] pt-4">
      <p className="m-0 text-xs font-semibold text-gr-muted">Do you agree with {authorName}'s view?</p>
      <div className="mt-2 flex gap-2">
        <button
          className={`inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors ${selected === "agree" ? "border-[#4da36c] bg-[#26372f] text-[#bce9ca]" : "border-[#465163] bg-transparent text-gr-subtle hover:border-[#6c7890]"}`}
          type="button"
          aria-pressed={selected === "agree"}
          onClick={() => onSelect("agree")}
        >
          {selected === "agree" ? <Check size={14} aria-hidden="true" /> : <ThumbsUp size={14} aria-hidden="true" />}
          Agree
        </button>
        <button
          className={`inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors ${selected === "disagree" ? "border-[#c8616b] bg-[#34272f] text-[#f4b6bc]" : "border-[#465163] bg-transparent text-gr-subtle hover:border-[#6c7890]"}`}
          type="button"
          aria-pressed={selected === "disagree"}
          onClick={() => onSelect("disagree")}
        >
          {selected === "disagree" ? <Check size={14} aria-hidden="true" /> : <ThumbsDown size={14} aria-hidden="true" />}
          Disagree
        </button>
      </div>
    </div>
  );
}
