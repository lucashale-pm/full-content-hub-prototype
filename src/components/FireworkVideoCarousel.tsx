import { createElement } from "react";

export function FireworkVideoCarousel() {
  const carousel = createElement("fw-embed-feed", {
    channel: "gamesradar",
    mode: "row",
    player_placement: "bottom-right",
    playlist: "vGn7KD",
  });

  return (
    <article className="w-full border-t-2 border-[#38404e] py-6 text-gr-text" aria-label="Watch Today’s Videos">
      <div className="flex flex-col gap-4">
        <h2 className="m-0 text-base font-bold leading-[1.3] tracking-[-0.02em]">Watch Today’s Videos</h2>
        <div className="w-full overflow-hidden [&>fw-embed-feed]:block [&>fw-embed-feed]:w-full">
          {carousel}
        </div>
      </div>
    </article>
  );
}
