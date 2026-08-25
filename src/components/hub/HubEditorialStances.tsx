import { Send, ThumbsUp } from "lucide-react";
import { useState } from "react";
import type { HubEditorialStance, HubStanceComment } from "../../content/types";
import { GradientInitialAvatar, StanceAvatar } from "../StanceAvatar";

function EditorialStanceCard({ stance, onEngagement }: { stance: HubEditorialStance; onEngagement?: (message: string) => void }) {
  const [vote, setVote] = useState<"agree" | "disagree">();
  const [comments, setComments] = useState<HubStanceComment[]>(stance.comments);
  const [draft, setDraft] = useState("");
  function submit() { const text = draft.trim(); if (!text) return; setComments((current) => [{ id: "local-" + Date.now(), user: "@you", text, likes: 0 }, ...current]); setDraft(""); }

  return (
    <article className="rounded-3xl border border-white/10 bg-[#16161a] p-4">
      <div className="flex items-center gap-2.5"><StanceAvatar profile={stance.author} size="sm" /><div><p className="m-0 text-sm font-bold">{stance.author.name}</p><p className="m-0 text-xs text-gr-muted">{stance.role}</p></div></div>
      <h3 className="m-0 mt-4 text-[17px] font-bold leading-[1.35]">“{stance.quote}”</h3>
      <p className="m-0 mt-3 text-sm leading-[1.45] text-gr-muted">{stance.body}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {(["agree", "disagree"] as const).map((choice) => {
          const chosen = vote === choice;
          const percent = choice === "agree" ? stance.agreePercent : stance.disagreePercent;
          const chosenStyle = choice === "agree" ? "border-[#397056] text-[#a9e2bd]" : "border-[#9b3e49] text-[#f4adb4]";
          const fillStyle = choice === "agree" ? "bg-[#397056]/30" : "bg-[#9b3e49]/30";
          return <button key={choice} className={"relative overflow-hidden rounded-2xl border px-3 py-3 text-sm font-semibold " + (chosen ? chosenStyle : "border-white/10 text-gr-subtle")} type="button" aria-pressed={chosen} onClick={() => { setVote(choice); onEngagement?.(`${choice === "agree" ? "Agree" : "Disagree"} recorded`); }}>
            {vote && <span className={"absolute inset-y-0 left-0 " + (chosen ? fillStyle : "bg-white/5")} style={{ width: percent + "%" }} />}
            <span className="relative">{choice === "agree" ? "Agree" : "Disagree"}{vote && " · " + percent + "%"}</span>
          </button>;
        })}
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="m-0 text-xs font-bold text-gr-muted">{comments.length + 22} comments</p>
        <div className="mt-3 space-y-3">
          {comments.slice(0, 2).map((comment) => <div key={comment.id} className="flex gap-2.5"><GradientInitialAvatar initials={comment.user.slice(1, 3).toUpperCase()} name={comment.user} size="xs" /><div className="min-w-0"><p className="m-0 text-xs font-bold">{comment.user}</p><p className="m-0 mt-1 text-xs leading-[1.4] text-gr-muted">{comment.text}</p><span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-gr-muted"><ThumbsUp size={12} aria-hidden="true" />{comment.likes}</span></div></div>)}
        </div>
        <div className="mt-4 flex gap-2 rounded-2xl border border-white/10 bg-[#1e1e1e] p-2">
          <input className="min-w-0 flex-1 bg-transparent px-2 text-xs text-white outline-none placeholder:text-gr-muted" value={draft} placeholder="Share your take..." onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submit(); }} />
          <button className="inline-flex size-8 items-center justify-center rounded-xl border-0 bg-[#ff5c00] text-white" type="button" aria-label="Post comment" onClick={submit}><Send size={14} aria-hidden="true" /></button>
        </div>
      </div>
    </article>
  );
}

export function HubEditorialStances({ stances, onEngagement }: { stances: HubEditorialStance[]; onEngagement?: (message: string) => void }) {
  return <section id="stances" className="scroll-mt-28 border-t border-[#38404e] py-8" aria-labelledby="stances-title">
    <p className="m-0 text-[11px] font-extrabold uppercase text-gr-muted">Editor stances</p>
    <h2 id="stances-title" className="m-0 mt-1 text-[24px] font-bold">Bold viewpoints from our lead columnists</h2>
    <div className="mt-5 space-y-3">{stances.map((stance) => <EditorialStanceCard key={stance.id} stance={stance} onEngagement={onEngagement} />)}</div>
  </section>;
}
