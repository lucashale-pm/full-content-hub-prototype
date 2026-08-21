interface LandscapeVideoCardProps {
  title: string;
  videoId: string;
}

export function LandscapeVideoCard({ title, videoId }: LandscapeVideoCardProps) {
  return (
    <article className="relative w-full border-t-2 border-[#38404e] py-6 text-gr-text" aria-label={title}>
      <div className="flex flex-col gap-2">
        <h2 className="m-0 text-base font-semibold leading-[1.3] tracking-[-0.02em]">{title}</h2>
        <div className="aspect-video w-full overflow-hidden rounded-[20px] bg-[#15171d]">
          <iframe
            className="size-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </article>
  );
}
