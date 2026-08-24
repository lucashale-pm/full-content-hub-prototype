import { BadgeCheck, Clock3, History, MessageCircle, Send, ThumbsUp } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { StanceComment, StanceRecord } from "../content/types";
import { StanceAvatar } from "./StanceAvatar";
import { StanceOpinionCard } from "./StanceOpinionCard";
import { StanceVotePanel } from "./StanceVotePanel";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

export function StanceDetailPage({ stance }: { stance: StanceRecord }) {
  const [comments, setComments] = useState<StanceComment[]>(stance.comments);
  const [draft, setDraft] = useState("");
  const [following, setFollowing] = useState(false);

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;

    setComments((current) => [
      ...current,
      {
        id: `local-comment-${Date.now()}`,
        author: { name: "You", initials: "YO" },
        postedAt: "Just now",
        body,
        likes: 0,
      },
    ]);
    setDraft("");
  }

  return (
    <article className="w-full text-gr-text">
      <header>
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.1em] text-gr-subtle">
          {stance.game} <span className="px-1.5 text-gr-muted">|</span> {stance.topic}
        </p>
        <h1 className="m-0 mt-3 text-[24px] font-semibold leading-[1.18] tracking-[-0.03em]">{stance.title}</h1>

        <div className="mt-5 flex items-center gap-2.5">
          <StanceAvatar profile={stance.author} />
          <div className="min-w-0">
            <span className="block text-sm font-bold leading-[17px]">{stance.author.name}</span>
            <span className="flex flex-wrap items-center gap-1.5 text-xs leading-[14px] text-gr-muted">
              <span>{stance.author.role}</span>
              <span aria-hidden="true">•</span>
              <BadgeCheck size={13} className="text-gr-action" aria-hidden="true" />
              <span>Verified Editor</span>
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-[14px] text-gr-muted">
          <span className="inline-flex items-center gap-1"><Clock3 size={13} aria-hidden="true" />{stance.publishedLabel}</span>
          <span className="inline-flex items-center gap-1"><MessageCircle size={13} aria-hidden="true" />{formatCount(stance.commentCount)} Comments</span>
        </div>
      </header>

      <img className="mt-6 block aspect-[16/9] w-full rounded-3xl object-cover" src={stance.hero.url} alt={stance.hero.alt} loading="eager" />
      <button
        className="mt-3 w-full rounded-3xl bg-gr-action px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        type="button"
        aria-pressed={following}
        onClick={() => setFollowing((value) => !value)}
      >
        {following ? `Following ${stance.game}` : `Follow ${stance.game}`}
      </button>

      <aside className="mt-4 flex items-center gap-3 rounded-3xl border border-[#3b4555] bg-[#292f3c] px-4 py-3" aria-label="Stance update status">
        <History size={18} className="shrink-0 text-[#DC361A]" aria-hidden="true" />
        <div className="min-w-0">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-[#DC361A]">Ongoing stance</p>
          <p className="m-0 mt-0.5 text-xs leading-[14px] text-gr-muted">{stance.updateSummary} · {stance.updatedLabel}</p>
        </div>
      </aside>

      <section className="mt-6 border-t-2 border-[#38404e] py-6" aria-label="Editorial primer">
        <div className="flex flex-col gap-5 text-[18px] leading-[26px] text-gr-subtle">
          {stance.primer.map((paragraph) => <p key={paragraph} className="m-0">{paragraph}</p>)}
        </div>
      </section>

      <section className="border-t-2 border-[#38404e] py-6" aria-labelledby="debate-title">
        <h2 id="debate-title" className="m-0 text-[20px] font-bold uppercase leading-[26px] tracking-[-0.02em]">The debate</h2>
        <div className="relative mt-4 flex flex-col gap-5 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-[#4b5668]">
          {stance.opinions.map((opinion) => <StanceOpinionCard key={opinion.id} opinion={opinion} />)}
        </div>
      </section>

      <StanceVotePanel vote={stance.vote} />

      <section className="border-t-2 border-[#38404e] py-6" aria-labelledby="comment-cta-title">
        <h2 id="comment-cta-title" className="m-0 text-[20px] font-bold uppercase leading-[26px] tracking-[-0.02em]">{stance.commentCta.title}</h2>
        <p className="m-0 mt-2 text-sm leading-[1.45] text-gr-muted">{stance.commentCta.body}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#465163] px-2.5 py-1 text-xs font-semibold text-gr-subtle">
          <MessageCircle size={13} aria-hidden="true" />
          {formatCount(stance.commentCount + comments.length - stance.comments.length)} comments
        </span>
      </section>

      <section id="comments" className="border-t-2 border-[#38404e] py-6" aria-labelledby="comments-title">
        <h2 id="comments-title" className="m-0 text-[20px] font-bold uppercase leading-[26px] tracking-[-0.02em]">Comments</h2>
        <form className="mt-4 flex gap-2" onSubmit={submitComment}>
          <label className="sr-only" htmlFor="stance-comment">Add your viewpoint</label>
          <input
            id="stance-comment"
            className="min-w-0 flex-1 rounded-3xl border border-[#465163] bg-transparent px-3 py-2 text-sm text-gr-text outline-none placeholder:text-gr-muted focus:border-gr-action"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add your viewpoint..."
          />
          <button className="inline-flex size-10 shrink-0 items-center justify-center rounded-3xl bg-gr-action text-white" type="submit" aria-label="Post comment">
            <Send size={17} aria-hidden="true" />
          </button>
        </form>

        <div className="mt-5 divide-y divide-[#38404e]">
          {comments.map((comment) => (
            <article key={comment.id} className="py-4 first:pt-0">
              <div className="flex items-center gap-2.5">
                <StanceAvatar profile={comment.author} size="sm" />
                <div>
                  <span className="block text-sm font-bold leading-[17px]">{comment.author.name}</span>
                  <span className="text-xs leading-[14px] text-gr-muted">{comment.postedAt}</span>
                </div>
              </div>
              <p className="m-0 mt-3 text-sm leading-[1.45] text-gr-subtle">{comment.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gr-muted"><ThumbsUp size={13} aria-hidden="true" />{comment.likes}</span>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
