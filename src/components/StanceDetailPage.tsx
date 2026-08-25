import { Check, Clock3, History, Menu, MessageCircle, Send, ThumbsUp, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { StanceComment, StanceRecord } from "../content/types";
import type { OpinionReaction } from "./OpinionReactionRow";
import { StanceAvatar } from "./StanceAvatar";
import { StanceEngagementDock } from "./StanceEngagementDock";
import { StanceOpinionCard } from "./StanceOpinionCard";
import { StanceVotePanel } from "./StanceVotePanel";
import type { StanceVoteChoice } from "./StanceVotePanel";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function CommentThread({
  comment,
  comments,
  depth = 0,
  onReply,
}: {
  comment: StanceComment;
  comments: StanceComment[];
  depth?: number;
  onReply: (comment: StanceComment) => void;
}) {
  const replies = comments.filter((candidate) => candidate.parentId === comment.id);

  return (
    <article className={`py-4 ${depth > 0 ? "ml-4 border-l border-[#465163] pl-3" : ""}`}>
      <div className="flex items-center gap-2.5">
        <StanceAvatar profile={comment.author} size="sm" />
        <div>
          <span className="block text-sm font-bold leading-[17px]">{comment.author.name}</span>
          <span className="text-xs leading-[14px] text-gr-muted">{comment.postedAt}</span>
        </div>
      </div>
      <p className="m-0 mt-3 text-sm leading-[1.45] text-gr-subtle">{comment.body}</p>
      <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-gr-muted">
        <span className="inline-flex items-center gap-1"><ThumbsUp size={13} aria-hidden="true" />{comment.likes}</span>
        <button className="border-0 bg-transparent p-0 text-xs font-semibold text-gr-muted hover:text-white" type="button" onClick={() => onReply(comment)}>Reply</button>
      </div>
      {replies.map((reply) => <CommentThread key={reply.id} comment={reply} comments={comments} depth={depth + 1} onReply={onReply} />)}
    </article>
  );
}

export function StanceDetailPage({ stance }: { stance: StanceRecord }) {
  const [comments, setComments] = useState<StanceComment[]>(stance.comments);
  const [draft, setDraft] = useState("");
  const [replyingTo, setReplyingTo] = useState<string>();
  const [following, setFollowing] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [followingStance, setFollowingStance] = useState(false);
  const [engagementDemo, setEngagementDemo] = useState(true);
  const [engagementMenuOpen, setEngagementMenuOpen] = useState(false);
  const [engagementVisible, setEngagementVisible] = useState(false);
  const [activeOpinionId, setActiveOpinionId] = useState<string>();
  const [opinionReactions, setOpinionReactions] = useState<Record<string, OpinionReaction>>({});
  const [overallVote, setOverallVote] = useState<StanceVoteChoice | null>(null);
  const engagementTriggerRef = useRef<HTMLElement>(null);
  const commentsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!engagementDemo) {
      setEngagementVisible(false);
      return;
    }

    const trigger = engagementTriggerRef.current;
    if (!trigger) return;
    if (trigger.getBoundingClientRect().top < window.innerHeight * 0.55) {
      setEngagementVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEngagementVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -45% 0px" },
    );
    observer.observe(trigger);
    return () => observer.disconnect();
  }, [engagementDemo]);

  const addViewpoint = useCallback((body: string, parentId?: string) => {
    setComments((current) => [
      ...current,
      {
        id: `local-comment-${Date.now()}`,
        parentId,
        author: { name: "You", initials: "YO" },
        postedAt: "Just now",
        body,
        likes: 0,
      },
    ]);
  }, []);

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    addViewpoint(body, replyingTo);
    setDraft("");
    setReplyingTo(undefined);
  }

  const setActiveOpinion = useCallback((opinionId: string) => setActiveOpinionId(opinionId), []);
  const activeOpinion = stance.opinions.find((opinion) => opinion.id === activeOpinionId);

  return (
    <article className="w-full text-gr-text">
      <header className="relative -mx-4 -mt-6 w-[calc(100%+2rem)] border-b border-[#38404e] bg-black px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <a className="inline-flex items-center gap-2 no-underline" href={import.meta.env.BASE_URL} aria-label="GamesRadar home">
            <img className="block h-7 w-auto" src="https://cdn.mos.cms.futurecdn.net/flexiimages/l3fqzehadb1768907286.svg" alt="GamesRadar" />
          </a>

          <button
            className="inline-flex size-9 items-center justify-center border-0 bg-transparent text-gr-subtle transition-colors hover:text-white"
            type="button"
            aria-label="Open stance page options"
            aria-expanded={engagementMenuOpen}
            aria-controls="stance-page-options"
            onClick={() => setEngagementMenuOpen((value) => !value)}
          >
            {engagementMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>

        {engagementMenuOpen && (
          <div id="stance-page-options" className="absolute right-4 top-14 z-20 w-60 rounded-3xl border border-[#465163] bg-[#151515] p-3 shadow-xl shadow-black/50" role="menu">
            <p className="m-0 text-xs font-bold text-gr-subtle">Engagement demo</p>
            <p className="m-0 mt-1 text-xs leading-[14px] text-gr-muted">Floating prompt and viewpoint reactions</p>
            <button
              className={`mt-3 w-full rounded-full px-3 py-2 text-xs font-bold transition-colors ${engagementDemo ? "bg-[#DC361A] text-white" : "bg-[#465163] text-gr-subtle"}`}
              type="button"
              role="menuitem"
              aria-pressed={engagementDemo}
              onClick={() => {
                setEngagementDemo((value) => !value);
                setEngagementMenuOpen(false);
              }}
            >
              {engagementDemo ? "Turn demo off" : "Turn demo on"}
            </button>
          </div>
        )}
      </header>

      <aside className="-mx-4 flex w-[calc(100%+2rem)] items-center gap-3 rounded-none border-b border-[#3b4555] bg-[#292f3c] px-4 py-3" aria-label="Stance update status">
        <History size={18} className="shrink-0 text-foreground" aria-hidden="true" />
        <div className="min-w-0">
          <p className="m-0 flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase text-foreground">
            <span>Ongoing stance</span>
            <span aria-hidden="true">•</span>
            <button
              className="border-0 bg-transparent p-0 text-left text-gr-action"
              type="button"
              aria-pressed={followingStance}
              onClick={() => setFollowingStance((value) => !value)}
            >
              {followingStance ? "Updated now" : "Notify me of updates"}
            </button>
          </p>
          <p className="m-0 mt-0.5 text-xs leading-[14px] text-gr-muted">{stance.updateSummary} · {stance.updatedLabel}</p>
        </div>
      </aside>

      <header className="pt-6">
        <h1 className="m-0 text-[24px] font-semibold leading-[1.18]">{stance.title}</h1>

        <div className="mt-5 flex items-center gap-2.5">
          <StanceAvatar profile={stance.author} />
          <div className="min-w-0">
            <span className="block text-sm font-bold leading-[17px]">{stance.author.name}</span>
            <span className="flex flex-wrap items-center gap-1.5 text-xs leading-[14px] text-gr-muted">
              <span>{stance.author.role}</span>
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
        aria-haspopup="dialog"
        onClick={() => setMembershipOpen(true)}
      >
        {following ? `Following ${stance.game}` : `Follow ${stance.game}`}
      </button>

      <section className="mt-6 border-t-2 border-[#38404e] py-6" aria-label="Editorial primer">
        <div className="flex flex-col gap-5 text-[18px] leading-[26px] text-gr-subtle">
          {stance.primer.map((paragraph) => <p key={paragraph} className="m-0">{paragraph}</p>)}
        </div>
      </section>

      <section ref={engagementTriggerRef} className="border-t-2 border-[#38404e] py-6" aria-labelledby="debate-title">
        <h2 id="debate-title" className="m-0 text-[20px] font-bold uppercase leading-[26px]">The debate</h2>
        <div className="relative mt-4 flex flex-col gap-5 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-[#4b5668]">
          {stance.opinions.map((opinion) => (
            <StanceOpinionCard
              key={opinion.id}
              opinion={opinion}
              reaction={opinionReactions[opinion.id]}
              onReact={engagementDemo ? (reaction) => setOpinionReactions((current) => ({ ...current, [opinion.id]: reaction })) : undefined}
              onEnterView={engagementDemo ? setActiveOpinion : undefined}
            />
          ))}
        </div>
      </section>

      <StanceVotePanel vote={stance.vote} selected={overallVote} onVote={setOverallVote} />

      <section className="border-t-2 border-[#38404e] py-6" aria-labelledby="comment-cta-title">
        <h2 id="comment-cta-title" className="m-0 text-[20px] font-bold uppercase leading-[26px]">{stance.commentCta.title}</h2>
        <p className="m-0 mt-2 text-sm leading-[1.45] text-gr-muted">{stance.commentCta.body}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#465163] px-2.5 py-1 text-xs font-semibold text-gr-subtle">
          <MessageCircle size={13} aria-hidden="true" />
          {formatCount(stance.commentCount + comments.length - stance.comments.length)} comments
        </span>
      </section>

      <section id="comments" ref={commentsRef} className="border-t-2 border-[#38404e] py-6" aria-labelledby="comments-title">
        <h2 id="comments-title" className="m-0 text-[20px] font-bold uppercase leading-[26px]">Comments</h2>
        {replyingTo && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-3xl bg-[#292f3c] px-3 py-2 text-xs text-gr-muted">
            <span>Replying to {comments.find((comment) => comment.id === replyingTo)?.author.name}</span>
            <button className="border-0 bg-transparent p-0 font-semibold text-gr-subtle hover:text-white" type="button" onClick={() => setReplyingTo(undefined)}>Cancel</button>
          </div>
        )}
        <form className="mt-4 flex gap-2" onSubmit={submitComment}>
          <label className="sr-only" htmlFor="stance-comment">Add your viewpoint</label>
          <input
            id="stance-comment"
            className="min-w-0 flex-1 rounded-3xl border border-[#465163] bg-transparent px-3 py-2 text-sm text-gr-text outline-none placeholder:text-gr-muted focus:border-gr-action"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={replyingTo ? "Write a reply..." : "Add your viewpoint..."}
          />
          <button className="inline-flex size-10 shrink-0 items-center justify-center rounded-3xl bg-gr-action text-white" type="submit" aria-label="Post comment">
            <Send size={17} aria-hidden="true" />
          </button>
        </form>

        <div className="mt-5 divide-y divide-[#38404e]">
          {comments.filter((comment) => !comment.parentId).map((comment) => (
            <CommentThread key={comment.id} comment={comment} comments={comments} onReply={(reply) => setReplyingTo(reply.id)} />
          ))}
        </div>
      </section>

      {engagementDemo && engagementVisible && (
        <StanceEngagementDock
          stance={stance}
          activeOpinion={activeOpinion}
          activeReaction={activeOpinion ? opinionReactions[activeOpinion.id] : null}
          selectedVote={overallVote}
          onVote={setOverallVote}
          onSubmitViewpoint={addViewpoint}
          onViewComments={() => commentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />
      )}

      {membershipOpen && (
        <div className="fixed inset-0 z-[60] bg-[#252934] px-4 py-5 text-gr-text" role="dialog" aria-modal="true" aria-labelledby="membership-title">
          <div className="mx-auto flex min-h-full w-full max-w-[430px] flex-col">
            <header className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">GAMESRADAR</span>
              <button className="inline-flex size-9 items-center justify-center border-0 bg-transparent text-gr-subtle hover:text-white" type="button" aria-label="Close membership prompt" onClick={() => setMembershipOpen(false)}>
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <div className="flex flex-1 flex-col justify-center py-10">
              <p className="m-0 text-xs font-bold uppercase text-gr-action">GamesRadar membership</p>
              <h2 id="membership-title" className="m-0 mt-3 text-[28px] font-semibold leading-[1.12]">Follow the games you care about.</h2>
              <p className="m-0 mt-4 text-base leading-[1.5] text-gr-subtle">Become a member to keep up with Helldivers 2 and get notified when a new viewpoint is added to this Stance.</p>

              <ul className="m-0 mt-7 flex list-none flex-col gap-4 p-0">
                {[
                  "Follow games and get the updates that matter to you",
                  "Save stories and return to them whenever you like",
                  "Join votes, comments, and the wider conversation",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-[1.45] text-gr-subtle">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gr-action text-white"><Check size={13} strokeWidth={3} aria-hidden="true" /></span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <button
                className="mt-8 w-full rounded-3xl bg-gr-action px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                type="button"
                onClick={() => {
                  setFollowing(true);
                  setMembershipOpen(false);
                }}
              >
                Become a member
              </button>
              <button className="mt-3 w-full border-0 bg-transparent px-4 py-2 text-sm font-bold text-gr-muted hover:text-white" type="button" onClick={() => setMembershipOpen(false)}>
                Not now
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
