import { ArrowLeft } from "lucide-react";
import { getHubPath } from "../app/useHashRoute";

export function BackToHubBanner() {
  return <a className="-mx-4 -mt-6 mb-6 flex items-center gap-2 border-b border-[#38404e] bg-[#1b1d24] px-4 py-3 text-sm font-semibold text-gr-subtle no-underline" href={getHubPath()}>
    <ArrowLeft size={17} className="text-gr-action" aria-hidden="true" />
    <span>Back to RPG Hub</span>
  </a>;
}
