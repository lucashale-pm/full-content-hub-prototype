import type { StanceProfile } from "../content/types";

interface StanceAvatarProps {
  profile: StanceProfile;
  size?: "sm" | "md";
}

export function StanceAvatar({ profile, size = "md" }: StanceAvatarProps) {
  const sizeClass = size === "sm" ? "size-8 text-[10px]" : "size-10 text-xs";

  return profile.image ? (
    <img className={`${sizeClass} shrink-0 rounded-full object-cover`} src={profile.image} alt={profile.name} loading="lazy" />
  ) : (
    <span className={`${sizeClass} inline-flex shrink-0 items-center justify-center rounded-full bg-[#3b4454] font-semibold text-gr-text`} aria-label={profile.name}>
      {profile.initials}
    </span>
  );
}
