import { ArrowRight, ChevronRight, Clock3, Eye, MessageCircle, Play, Trophy, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import lastVisitContent from "../../../content/last-visit.json";

type LastVisit = typeof lastVisitContent;
type ScreenIndex = 0 | 1 | 2 | 3 | 4;

const lastVisit = lastVisitContent as LastVisit;
const takeoverHeadingClass = "m-0 text-[32px] font-semibold leading-[1.1]";

function Progress({ screen }: { screen: ScreenIndex }) {
  return <div className="flex flex-1 gap-1.5" aria-label={"Update " + (screen + 1) + " of 5"}>
    {[0, 1, 2, 3, 4].map((index) => <span key={index} className={"h-2 min-w-0 flex-1 rounded-full shadow-sm " + (index <= screen ? "bg-[#ff6b00] shadow-[#ff6b00]/40" : "bg-white/45")} />)}
  </div>;
}

function TapFooter({ onContinue, final = false }: { onContinue: () => void; final?: boolean }) {
  return <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/95 to-transparent">
    <button className="mx-auto flex items-center gap-2 border-0 bg-transparent p-2 text-base font-semibold uppercase text-[#a0a0ab]" type="button" onClick={onContinue}>
      <span>{final ? "Done" : "Tap to continue"}</span><ChevronRight size={21} aria-hidden="true" />
    </button>
    <span className="mx-auto mt-1 block h-1.5 w-36 rounded-full bg-white/10" aria-hidden="true" />
  </div>;
}

function UpdateList() {
  return <div className="space-y-2.5">
    {lastVisit.updates.map((update) => <div key={update.title} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
      <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><span className="text-sm font-bold text-gr-subtle">{update.type}</span><span className="text-xs text-gr-muted">{update.age}</span></div><p className="m-0 mt-1.5 text-base font-semibold leading-[1.25]">{update.title}</p></div><ChevronRight size={20} className="shrink-0 text-gr-muted" aria-hidden="true" />
    </div>)}
  </div>;
}

function VideoMissed() {
  return <div className="pt-3">
    <h1 className={takeoverHeadingClass}>Videos You Missed</h1>
    <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
      <div className="relative aspect-[2/1]"><img className="size-full object-cover" src={lastVisit.video.image.url} alt={lastVisit.video.image.alt} /><span className="absolute inset-0 bg-black/20" /><span className="absolute left-1/2 top-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50"><Play size={25} fill="currentColor" aria-hidden="true" /></span><span className="absolute bottom-2 right-2 rounded-xl bg-black/75 px-2 py-1 text-sm font-bold">{lastVisit.video.duration}</span></div>
      <div className="bg-[#17171a] px-3.5 py-3"><p className="m-0 text-xs font-bold uppercase text-gr-subtle">Featured video</p><h2 className="m-0 mt-1.5 text-[20px] font-bold leading-[1.2]">{lastVisit.video.title}</h2><p className="m-0 mt-1 text-sm text-gr-muted">{lastVisit.video.author} · {lastVisit.video.views}</p></div>
    </div>
    <h2 className="m-0 mt-4 text-[18px] font-bold uppercase text-gr-muted">Short takes</h2>
    <div className="mt-2 flex gap-2.5 overflow-hidden pb-1">{lastVisit.video.shorts.map((short) => <div key={short.title} className="w-28 shrink-0"><div className="relative aspect-[3/4] overflow-hidden rounded-3xl"><img className="size-full object-cover" src={short.image.url} alt={short.image.alt} /><span className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><span className="absolute left-1/2 top-1/2 inline-flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50"><Play size={16} fill="currentColor" aria-hidden="true" /></span><span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-xl bg-black/70 px-1.5 py-1 text-[10px] font-bold"><Eye size={11} aria-hidden="true" />{short.views}</span></div><p className="m-0 mt-1.5 truncate text-xs font-semibold">{short.title}</p></div>)}</div>
  </div>;
}

function StanceMissed() {
  return <div className="pt-3">
    <p className="m-0 text-sm font-bold uppercase text-gr-muted">Editorials</p>
    <h1 className={takeoverHeadingClass + " mt-2"}>Hot Takes &amp; Debates</h1>
    <article className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3"><img className="size-10 rounded-full object-cover" src={lastVisit.stance.author.image} alt={lastVisit.stance.author.name} /><div><p className="m-0 text-sm font-bold">{lastVisit.stance.author.name}</p><p className="m-0 text-xs text-gr-muted">{lastVisit.stance.author.role}</p></div></div>
      <blockquote className="m-0 mt-4 text-[21px] font-semibold leading-[1.3]">“{lastVisit.stance.quote}”</blockquote>
      <div className="mt-4 space-y-2"><div className="flex items-center justify-between rounded-2xl border border-[#397056] bg-[#397056]/15 px-4 py-2.5 text-base font-semibold text-[#a9e2bd]"><span>Agree</span><span>{lastVisit.stance.agree}%</span></div><div className="flex items-center justify-between rounded-2xl border border-[#9b3e49] bg-[#9b3e49]/10 px-4 py-2.5 text-base font-semibold text-[#f4adb4]"><span>Disagree</span><span>{lastVisit.stance.disagree}%</span></div></div>
      <div className="mt-4 flex items-center gap-2 text-sm text-gr-muted"><MessageCircle size={16} aria-hidden="true" />{lastVisit.stance.comments} comments</div>
    </article>
  </div>;
}

function QuizMissed() {
  const [selected, setSelected] = useState<string>();
  return <div className="pt-3">
    <p className="m-0 text-sm font-bold uppercase text-gr-muted">You missed this</p><h1 className={takeoverHeadingClass + " mt-2"}>Daily Quiz Waiting</h1>
    <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4"><p className="m-0 text-sm text-gr-muted">{lastVisit.quiz.posted} <span aria-hidden="true">•</span> {lastVisit.quiz.answered}</p><h2 className="m-0 mt-5 text-[23px] font-bold leading-[1.2]">{lastVisit.quiz.question}</h2><div className="mt-4 space-y-2">{lastVisit.quiz.options.map((option, index) => <button key={option} className={"flex w-full items-center gap-3 rounded-3xl border px-3.5 py-3 text-left text-base font-semibold " + (selected === option ? "border-[#ff6b00] bg-[#fe6700]/15 text-white" : "border-white/10 bg-white/[0.03] text-gr-muted")} type="button" aria-pressed={selected === option} onClick={() => setSelected(option)}><span className={"inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm " + (selected === option ? "bg-[#ff6b00] text-white" : "bg-white/10")}>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div><button className={"mt-4 w-full rounded-full px-4 py-2.5 text-sm font-bold " + (selected ? "bg-[#DC361A] text-white" : "bg-white/10 text-gr-muted")} type="button" disabled={!selected}>{selected ? "Vote recorded" : "Choose an answer"}</button></div>
  </div>;
}

function Recap({ onClose }: { onClose: () => void }) {
  return <div className="pt-3">
    <p className="m-0 text-sm font-bold uppercase text-gr-muted">Weekly wrap</p><h1 className={takeoverHeadingClass + " mt-2 uppercase"}>You’re all caught up</h1><p className="m-0 mt-4 text-lg leading-[1.4] text-gr-muted">Your personalized recap is complete. Here’s how you showed up this week.</p>
    <div className="mt-4 rounded-3xl border border-[#ff6b00] bg-[#241b18] p-4"><div className="flex items-center justify-between gap-3 text-base text-gr-muted"><span>Activity streak</span><strong className="text-white">{lastVisit.recap.streak}</strong></div><div className="mt-3 flex gap-2">{Array.from({ length: 7 }, (_, index) => <span key={index} className="size-3 rounded-full bg-[#ff6b00]" />)}</div><div className="mt-5 grid grid-cols-3 gap-2">{lastVisit.recap.stats.map((stat) => <div key={stat.label} className="rounded-2xl bg-white/[0.05] p-2.5"><p className="m-0 text-[23px] font-bold">{stat.value}</p><p className="m-0 mt-1 text-xs leading-[1.25] text-gr-muted">{stat.label}</p></div>)}</div><div className="mt-5 flex items-center gap-3 text-base font-semibold"><span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#ff6b00]"><Trophy size={22} aria-hidden="true" /></span>You’re in the top 8% of contributors this week.</div></div>
    <h2 className="m-0 mt-5 text-sm font-bold uppercase text-gr-muted">What’s waiting in the hub</h2><div className="mt-2 flex gap-2"><span className="rounded-xl border border-white/15 px-2.5 py-1.5 text-xs font-bold">12 discussions</span><span className="rounded-xl border border-white/15 px-2.5 py-1.5 text-xs font-bold">3 Stances</span><span className="rounded-xl border border-white/15 px-2.5 py-1.5 text-xs font-bold">5 videos</span></div><button className="mt-4 w-full rounded-full bg-[#DC361A] px-4 py-2.5 text-sm font-bold text-white" type="button" onClick={onClose}>Dive into the full Hub <ArrowRight size={16} className="ml-1 inline" aria-hidden="true" /></button>
  </div>;
}

function Screen({ screen, onClose }: { screen: ScreenIndex; onClose: () => void }) {
  if (screen === 0) return <div className="pt-3"><h1 className={takeoverHeadingClass}>What You Missed</h1><p className="m-0 mt-3 text-lg text-gr-muted">{lastVisit.updatedLabel}</p><div className="mt-5"><UpdateList /></div></div>;
  if (screen === 1) return <VideoMissed />;
  if (screen === 2) return <StanceMissed />;
  if (screen === 3) return <QuizMissed />;
  return <Recap onClose={onClose} />;
}

function SinceLastVisitTakeover({ onClose }: { onClose: () => void }) {
  const [screen, setScreen] = useState<ScreenIndex>(0);
  function continueJourney() { if (screen === 4) onClose(); else setScreen((current) => (current + 1) as ScreenIndex); }
  function handleSurfaceTap(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("a,button,input,textarea,select")) return;
    continueJourney();
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [onClose]);

  return <div className="fixed inset-0 z-[60] overflow-hidden bg-[#0a0a0c] text-gr-text" role="dialog" aria-modal="true" aria-label="Since you were last here" onClick={handleSurfaceTap}>
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden px-6 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <img className="pointer-events-none absolute inset-0 size-full object-cover opacity-20" src={lastVisit.backgroundImage.url} alt="" /><span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/35 via-[#0a0a0c]/70 to-[#0a0a0c]" />
      <div className="relative z-10 flex items-center justify-between gap-4"><Progress screen={screen} /><button className="inline-flex size-8 shrink-0 items-center justify-center border-0 bg-transparent p-1 text-gr-subtle" type="button" aria-label="Close recap" onClick={onClose}><X size={20} aria-hidden="true" /></button></div>
      <main className="relative z-10 min-h-0 flex-1 overflow-hidden pb-24" key={screen}><Screen screen={screen} onClose={onClose} /></main>
      <TapFooter onContinue={continueJourney} final={screen === 4} />
    </div>
  </div>;
}

export function SinceLastVisit() {
  const [open, setOpen] = useState(false);
  return <>
    <button className="group -mx-4 flex w-[calc(100%+2rem)] items-center gap-3 border-b border-[#38404e] bg-[#1b1d24] px-4 py-3 text-left" type="button" onClick={() => setOpen(true)}>
      <Clock3 size={18} className="shrink-0 text-[#ff6b00]" aria-hidden="true" /><span className="min-w-0 flex-1"><span className="block text-xs font-bold uppercase text-[#ff8d4b]">Since you were last here</span><span className="mt-0.5 block truncate text-sm text-gr-subtle">5 updates waiting · Tap to catch up</span></span><ChevronRight size={18} className="shrink-0 text-gr-subtle transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </button>
    {open && <SinceLastVisitTakeover onClose={() => setOpen(false)} />}
  </>;
}
