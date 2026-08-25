import { Heart, MessageCircle, Share2 } from "lucide-react";

interface LandscapeVideoCardProps {
  title: string;
  videoId: string;
  reactionCount?: number;
  commentCount?: number;
}

export function LandscapeVideoCard({ title, videoId, reactionCount = 860, commentCount = 41 }: LandscapeVideoCardProps) {
  return (
    <article className="relative w-full border-t-2 border-[#38404e] py-6 text-gr-text" aria-label={title}>
      <div className="flex flex-col gap-2">
        <h2 className="m-0 text-base font-semibold leading-[1.3]">{title}</h2>
        <div className="aspect-video w-full overflow-hidden rounded-3xl bg-[#15171d]">
          <iframe
            className="size-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <footer className="flex w-full items-center pb-0 text-gr-muted">
          <div className="flex items-center gap-3 text-xs font-semibold leading-[14px]">
            <span className="flex items-center gap-1" aria-label={`${reactionCount} reactions`}><Heart size={14} strokeWidth={2} aria-hidden="true" /><span>{reactionCount}</span></span>
            <span className="flex items-center gap-1" aria-label={`${commentCount} comments`}><MessageCircle size={14} strokeWidth={2} aria-hidden="true" /><span>{commentCount}</span></span>
            <span aria-label="Share unavailable"><Share2 size={16} strokeWidth={2} aria-hidden="true" /></span>
          </div>
        </footer>
      </div>
    </article>
  );
}
