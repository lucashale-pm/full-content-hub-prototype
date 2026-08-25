import { useEffect, useState } from "react";
import type { HubDocument } from "../../content/types";
import { StanceAvatar } from "../StanceAvatar";

const takeEmoji = ["🧊", "🙂", "🌶️", "🔥", "☢️"];

function HotTakeCard({ take, onEngagement }: { take: HubDocument["hotTakes"][number]; onEngagement?: (message: string) => void }) {
  const [selected, setSelected] = useState<string>();
  return <article className="rounded-3xl border border-white/10 bg-[#16161a] p-4">
    <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><StanceAvatar profile={take.author} size="sm" /><span className="text-sm font-semibold">{take.author.name}</span></div><span className="text-xs text-gr-muted">{take.raters}</span></div>
    <h3 className="m-0 mt-4 text-[15px] font-bold leading-[1.4]">“{take.quote}”</h3>
    <div className="mt-4 grid grid-cols-5 gap-1.5">
      {take.ratings.map((rating, index) => {
        const chosen = selected === rating.id;
        return <button key={rating.id} className={"rounded-2xl border px-1 py-2 text-center " + (chosen ? "border-[#ff6b00] bg-[#fe6700] text-white" : "border-white/10 text-gr-muted")} type="button" aria-pressed={chosen} onClick={() => { setSelected(rating.id); onEngagement?.(`Take rated: ${rating.label}`); }}>
          <span className="block text-base leading-none" aria-hidden="true">{takeEmoji[index]}</span>
          <span className="mt-1 block text-[10px] font-semibold">{selected ? rating.percent + "%" : rating.label}</span>
        </button>;
      })}
    </div>
    <p className="m-0 mt-3 text-[11px] text-gr-muted">{selected ? "You said: " + take.ratings.find((rating) => rating.id === selected)?.label : "Tap to rate · Results revealed after you vote"}</p>
  </article>;
}

export function HubHotTakes({ takes, onEngagement }: { takes: HubDocument["hotTakes"];
  onEngagement?: (message: string) => void;
}) {
  return <section id="takes" className="scroll-mt-28 border-t border-[#38404e] py-8" aria-labelledby="takes-title">
    <p className="m-0 text-[11px] font-semibold uppercase text-gr-muted">Quick reactions</p>
    <h2 id="takes-title" className="m-0 mt-1 text-[24px] font-bold">How hot are these takes?</h2>
    <p className="m-0 mt-2 text-sm leading-[1.4] text-gr-muted">Rate each editor take, then see how the community voted.</p>
    <div className="mt-5 space-y-3">{takes.map((take) => <HotTakeCard key={take.id} take={take} onEngagement={onEngagement} />)}</div>
  </section>;
}

export function HubVersus({ versus }: { versus: HubDocument["versus"] }) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const questions = versus.questions;
  const question = questions[step];
  const selected = question ? picks[question.id] : undefined;
  const complete = step >= questions.length;
  const agreementCount = questions.filter((item) => picks[item.id] === item.audienceChoiceId).length;

  useEffect(() => {
    if (!selected) return;
    const timer = window.setTimeout(() => setStep((current) => Math.min(current + 1, questions.length)), 900);
    return () => window.clearTimeout(timer);
  }, [selected, questions.length]);

  function choose(optionId: string) {
    if (!question || selected) return;
    setPicks((current) => ({ ...current, [question.id]: optionId }));
  }

  return <section id="versus" className="scroll-mt-28 border-t border-[#38404e] py-8" aria-labelledby="versus-title">
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3"><p className="m-0 text-[11px] font-semibold uppercase text-gr-muted">This or that</p>{!complete && <span className="text-xs text-gr-muted">{step + 1} of {questions.length}</span>}</div>
      {complete ? <div className="animate-[hub-panel-in_320ms_ease-out] py-5 text-center">
        <p className="m-0 text-[11px] font-semibold uppercase text-gr-action">Your results</p>
        <h2 id="versus-title" className="m-0 mt-3 text-[25px] font-bold">You matched the GR+ audience {agreementCount} out of {questions.length} times.</h2>
        <p className="m-0 mt-3 text-sm leading-[1.45] text-gr-muted">That puts you in step with {Math.round((agreementCount / questions.length) * 100)}% of the choices RPG readers made in this demo.</p>
        <button className="mt-5 rounded-full bg-[#DC361A] px-4 py-2.5 text-sm font-bold text-white" type="button" onClick={() => { setStep(0); setPicks({}); }}>Try again</button>
      </div> : <div key={question.id} className="animate-[hub-panel-in_320ms_ease-out]">
        <h2 id="versus-title" className="m-0 mt-3 text-[18px] font-bold">{question.title}</h2>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {question.options.map((option, index) => <div key={option.id} className="contents">
            {index === 1 && <span className="text-xs font-extrabold text-gr-action">VS</span>}
            <button className={"relative aspect-[3/4] overflow-hidden rounded-3xl border text-left transition-all " + (selected === option.id ? "scale-[1.03] border-2 border-[#ff6b00]" : selected ? "scale-95 border-transparent opacity-65" : "border-transparent")} type="button" aria-pressed={selected === option.id} onClick={() => choose(option.id)}>
              <img className="absolute inset-0 size-full object-cover" src={option.image.url} alt={option.image.alt} loading="lazy" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              {selected && <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[11px] font-bold text-white">{option.percent}% picked this</span>}
              <span className="absolute inset-x-2 bottom-3 text-center text-xs font-bold">{option.label}</span>
            </button>
          </div>)}
        </div>
        <div className="mt-5 flex items-center justify-center gap-1.5" aria-label={"Question " + (step + 1) + " of " + questions.length}>{questions.map((item, index) => <span key={item.id} className={"size-1.5 rounded-full " + (index === step ? "bg-[#ff6b00]" : index < step ? "bg-[#ff8d4b]" : "bg-white/15")} />)}</div>
        <p className="m-0 mt-3 text-center text-xs font-semibold text-gr-action">{selected ? "Next choice coming up…" : "Tap your pick to see what readers chose."}</p>
      </div>}
    </div>
  </section>;
}
