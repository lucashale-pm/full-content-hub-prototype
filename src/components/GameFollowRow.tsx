import { useState } from "react";

interface GameFollowRowProps {
  game: string;
}

export function GameFollowRow({ game }: GameFollowRowProps) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="truncate text-[14px] font-bold leading-[17px]">{game}</span>
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
