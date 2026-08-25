import { Scale } from "lucide-react";
import { useState } from "react";
import type { StanceRecord } from "../content/types";

export type StanceVoteChoice = "opposing" | "supporting";

interface StanceVotePanelProps extends Pick<StanceRecord, "vote"> {
  selected?: StanceVoteChoice | null;
  onVote?: (choice: StanceVoteChoice) => void;
}

export function StanceVotePanel({ vote, selected: controlledSelected, onVote }: StanceVotePanelProps) {
  const opposingOption = vote.options.find((option) => option.id === "opposing");
  const supportingOption = vote.options.find((option) => option.id === "supporting");
  const [uncontrolledSelected, setUncontrolledSelected] = useState<StanceVoteChoice | null>(null);
  const selected = controlledSelected ?? uncontrolledSelected;
  const baseCounts: Record<StanceVoteChoice, number> = {
    opposing: opposingOption?.voteCount ?? 0,
    supporting: supportingOption?.voteCount ?? 0,
  };
  const counts = {
    opposing: baseCounts.opposing + (selected === "opposing" ? 1 : 0),
    supporting: baseCounts.supporting + (selected === "supporting" ? 1 : 0),
  };
  const total = counts.opposing + counts.supporting;
  const opposingPercent = Math.round((counts.opposing / total) * 100);
  const supportingPercent = 100 - opposingPercent;

  function castVote(choice: StanceVoteChoice) {
    if (choice === selected) return;
    if (controlledSelected === undefined) setUncontrolledSelected(choice);
    onVote?.(choice);
  }

  return (
    <section className="border-t-2 border-[#38404e] py-6" aria-labelledby="vote-title">
      <div className="rounded-3xl bg-[#191919] px-5 py-6">
        <h2 id="vote-title" className="m-0 flex items-center justify-center gap-2 text-[20px] font-bold leading-[26px]">
          <Scale size={18} className="text-gr-action" aria-hidden="true" />
          {vote.title}
        </h2>
        <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-[#495365]" aria-label={`${opposingPercent}% opposed and ${supportingPercent}% supporting`}>
          <span className="bg-[#d0515d] transition-[width] duration-300" style={{ width: `${opposingPercent}%` }} />
          <span className="bg-[#71839e] transition-[width] duration-300" style={{ width: `${supportingPercent}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs font-semibold leading-[14px]">
          <span className="text-[#f1a5ac]">{opposingPercent}%</span>
          <span className="text-[#bdcbe0]">{supportingPercent}%</span>
        </div>
        <div className="mt-4 grid gap-2">
          {vote.options.map((option) => {
            const isSelected = selected === option.id;

            return (
              <button
                key={option.id}
                className={`min-h-10 rounded-full border border-gr-action bg-[#353b4a] px-3 py-2 text-center text-xs font-bold uppercase leading-[14px] text-white transition-colors ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-[#191919]" : ""}`}
                type="button"
                aria-pressed={isSelected}
                onClick={() => castVote(option.id)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
