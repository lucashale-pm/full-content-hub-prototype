import type { StanceProfile } from "../content/types";

interface StanceAvatarProps {
  profile: StanceProfile;
  size?: "sm" | "md";
}

const avatarGradients = [
  "linear-gradient(135deg, #463080 0%, #c2185b 100%)",
  "linear-gradient(135deg, #e2b84b 0%, #f4c21d 48%, #b89bd1 100%)",
  "linear-gradient(135deg, #ff6f72 0%, #ffb02e 100%)",
  "linear-gradient(135deg, #ff6b00 0%, #ffb52e 100%)",
  "linear-gradient(135deg, #008f6f 0%, #00a9c2 100%)",
];

function gradientFor(initials: string) {
  const hash = [...initials].reduce((total, character) => total + character.charCodeAt(0), 0);
  return avatarGradients[hash % avatarGradients.length];
}

export function GradientInitialAvatar({ initials, name, size = "sm" }: { initials: string; name: string; size?: "xs" | "sm" | "md" }) {
  const sizeClass = size === "xs" ? "size-6 text-[9px]" : size === "sm" ? "size-8 text-[10px]" : "size-10 text-xs";
  return <span className={`${sizeClass} inline-flex shrink-0 items-center justify-center rounded-full border border-white/30 font-semibold text-white`} style={{ background: gradientFor(initials) }} aria-label={name}>
    {initials}
  </span>;
}

export function StanceAvatar({ profile, size = "md" }: StanceAvatarProps) {
  return profile.image ? (
    <img className={`${size === "sm" ? "size-8" : "size-10"} shrink-0 rounded-full object-cover`} src={profile.image} alt={profile.name} loading="lazy" />
  ) : (
    <GradientInitialAvatar initials={profile.initials} name={profile.name} size={size} />
  );
}
