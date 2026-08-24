import { createElement } from "react";

export function FireworkVideoCarousel({ showTitle = true }: { showTitle?: boolean }) {
  const carousel = createElement("fw-embed-feed", {
    channel: "gamesradar",
    mode: "row",
    player_placement: "bottom-right",
    playlist: "vGn7KD",
  });

  return (
    <article className={(showTitle ? "w-full border-t-2 border-[#38404e] py-6 " : "w-full ") + "text-gr-text"} aria-label="Watch Today’s Videos">
      <div className="flex flex-col gap-2">
        {showTitle && <h2 className="m-0 text-base font-semibold leading-[1.3] tracking-[-0.02em]">Watch Today’s Videos</h2>}
        <div className="w-full overflow-hidden [&>fw-embed-feed]:block [&>fw-embed-feed]:w-full">
          {carousel}
        </div>
      </div>
    </article>
  );
}
