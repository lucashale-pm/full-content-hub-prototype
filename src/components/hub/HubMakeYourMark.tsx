import { BookOpen, ChartNoAxesColumnIncreasing, MessageSquare, PenLine } from "lucide-react";

const waysToContribute = [
  { label: "Review", Icon: PenLine },
  { label: "Write", Icon: BookOpen },
  { label: "Answer", Icon: MessageSquare },
  { label: "Poll", Icon: ChartNoAxesColumnIncreasing },
];

export function HubMakeYourMark() {
  return <section className="border-t border-[#38404e] py-8" aria-labelledby="make-your-mark-title">
    <p className="m-0 text-[11px] font-extrabold uppercase text-gr-muted">Share your expertise</p>
    <h2 id="make-your-mark-title" className="m-0 mt-1 text-[32px] font-semibold">Make Your Mark</h2>

    <div className="mt-6 rounded-3xl border border-white/10 bg-[#16161a] p-4">
      <div className="grid grid-cols-4 gap-2">
        {waysToContribute.map(({ label, Icon }) => <button key={label} className="flex min-w-0 flex-col items-center gap-2 border-0 bg-transparent p-0 text-center text-sm font-semibold text-gr-text" type="button">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[#f1462a]"><Icon size={25} strokeWidth={2.5} aria-hidden="true" /></span>
          {label}
        </button>)}
      </div>
      <div className="my-5 border-t border-white/10" />
      <div className="flex items-baseline justify-between gap-3 text-sm"><span className="text-gr-subtle">Your Contributor Rank: <strong className="text-white">Silver</strong></span><strong className="shrink-0 text-[#f1462a]">240/500 to Gold</strong></div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-[48%] rounded-full bg-[#f1462a]" /></div>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3">
      <button className="rounded-3xl border border-white/10 bg-[#16161a] p-4 text-left" type="button"><h3 className="m-0 text-[21px] font-semibold">Write a Review</h3><p className="m-0 mt-4 text-sm leading-[1.45] text-gr-muted">Rate mechanics, narrators, performance, and overall design.</p><span className="mt-5 block text-sm font-bold text-[#f1462a]">★ Start Drafting</span></button>
      <button className="rounded-3xl border border-white/10 bg-[#16161a] p-4 text-left" type="button"><h3 className="m-0 text-[21px] font-semibold">Start a Discussion</h3><p className="m-0 mt-4 text-sm leading-[1.45] text-gr-muted">Post your hot takes, questions, theories for editors and readers.</p><span className="mt-5 block text-sm font-bold text-gr-text">● New Thread</span></button>
    </div>
  </section>;
}
