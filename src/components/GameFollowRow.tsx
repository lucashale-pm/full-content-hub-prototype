import { useState } from "react";

interface GameFollowRowProps {
  game: string;
}

const defaultFollowedGames = new Set([
  "Persona 3 Reload",
  "Avowed",
  "Like a Dragon: Infinite Wealth",
]);

export function GameFollowRow({ game }: GameFollowRowProps) {
  const [following, setFollowing] = useState(() => defaultFollowedGames.has(game));

  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="truncate text-[14px] leading-[17px] uppercase text-[#d3d3d3]">{game}</span>
      <span className="size-[3px] shrink-0 rounded-full bg-current opacity-50" aria-hidden="true" />
      <button
        className="!text-[14px] shrink-0 border-0 bg-transparent p-0 font-bold leading-[17px] text-gr-action"
        type="button"
        style={{ fontSize: "14px", lineHeight: "17px" }}
        aria-pressed={following}
        aria-label={`${following ? "Unfollow" : "Follow"} ${game}`}
        onClick={() => setFollowing((value) => !value)}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}
