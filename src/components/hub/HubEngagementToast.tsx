import { Check, Flame, Scale, Send, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HubEngagementToastProps {
  message: string;
  onDismiss: () => void;
}

export function HubEngagementToast({ message, onDismiss }: HubEngagementToastProps) {
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setDraft("");
    setSubmitted(false);
  }, [message]);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(onDismiss, 2600);
    return () => window.clearTimeout(timer);
  }, [submitted, onDismiss]);

  const isHotTake = message.toLowerCase().includes("take");
  const Icon = isHotTake ? Flame : Scale;

  return <aside className="pointer-events-none fixed inset-x-0 bottom-4 z-50 mx-auto flex w-full max-w-[430px] justify-center px-4" aria-live="polite" aria-label="Engagement update">
    <div className="pointer-events-auto w-full rounded-3xl border border-[#4a5568] bg-[#151515]/98 p-4 shadow-2xl shadow-black/50 backdrop-blur">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DC361A]/20 text-[#ff8d4b]"><Icon size={16} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1"><p className="m-0 text-sm font-bold text-white">{submitted ? "Viewpoint added" : message}</p><p className="m-0 mt-0.5 text-xs leading-[1.4] text-gr-muted">{submitted ? "Thanks for adding to the conversation." : "What makes you say that? Add your reasoning for other readers."}</p></div>
        {submitted ? <Check size={17} className="shrink-0 text-[#86cf9b]" aria-hidden="true" /> : <button className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border-0 bg-transparent text-gr-muted hover:bg-white/10 hover:text-white" type="button" aria-label="Dismiss engagement update" onClick={onDismiss}><X size={16} aria-hidden="true" /></button>}
      </div>
      {!submitted && <>
        <label className="sr-only" htmlFor="hub-engagement-reason">Explain your reasoning</label>
        <textarea id="hub-engagement-reason" className="mt-3 min-h-16 w-full resize-none rounded-2xl border border-[#465163] bg-[#20242d] px-3 py-2 text-sm leading-[1.4] text-gr-text outline-none placeholder:text-gr-muted focus:border-gr-action" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share your thoughts..." />
        <div className="mt-2 flex items-center justify-between gap-2"><button className="text-xs font-semibold text-gr-muted hover:text-white" type="button" onClick={onDismiss}>Not now</button><button className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#DC361A] px-3 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => setSubmitted(true)} disabled={!draft.trim()}><Send size={14} aria-hidden="true" />Share viewpoint</button></div>
      </>}
    </div>
  </aside>;
}
