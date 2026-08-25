import { Menu, Newspaper, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getFeedPath, getHubPath } from "../../app/useHashRoute";

export const hubSections = [
  { id: "featured", label: "Featured" },
  { id: "timeline", label: "Timeline" },
  { id: "stances", label: "Stances" },
  { id: "takes", label: "Takes" },
  { id: "versus", label: "Vote" },
  { id: "clips", label: "Clips" },
] as const;

export function scrollToHubSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HubSectionLinks({ className = "" }: { className?: string }) {
  return <nav className={`flex items-center justify-between gap-1 overflow-visible ${className}`} aria-label="Hub sections">
    {hubSections.map((section) => <button key={section.id} className="min-w-0 whitespace-nowrap border-0 bg-transparent p-0 text-[14px] font-semibold text-gr-subtle hover:text-gr-action" type="button" onClick={() => scrollToHubSection(section.id)}>{section.label}</button>)}
  </nav>;
}

export function HubSectionNav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frame = 0;

    function handleScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const difference = currentScrollY - lastScrollY;

        if (Math.abs(difference) > 4) {
          setVisible(currentScrollY < 64 || difference < 0);
          lastScrollY = currentScrollY;
        }
        frame = 0;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function selectSection(id: string) {
    scrollToHubSection(id);
    setOpen(false);
  }

  return (
    <header className={`sticky top-0 z-30 -mx-4 w-[calc(100%+2rem)] border-b border-[#38404e] bg-black shadow-lg shadow-black/20 transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="flex items-center justify-between px-4 py-2.5">
        <a className="inline-flex items-center no-underline" href={getHubPath()} aria-label="GamesRadar RPG hub">
          <img className="block h-6 w-auto" src="https://cdn.mos.cms.futurecdn.net/flexiimages/l3fqzehadb1768907286.svg" alt="GamesRadar" />
        </a>
        <div className="flex items-center gap-1 text-gr-subtle">
          <a className="inline-flex size-9 items-center justify-center rounded-full hover:bg-white/10" href={getFeedPath()} aria-label="Browse RPG feed">
            <Newspaper size={18} aria-hidden="true" />
          </a>
          <button className="inline-flex size-9 items-center justify-center rounded-full border-0 bg-transparent text-inherit hover:bg-white/10" type="button" aria-label="Open section menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && <nav className="absolute right-4 top-[52px] w-56 rounded-3xl border border-[#465163] bg-[#151515] p-2 shadow-xl shadow-black/50" aria-label="Hub section menu">
        {hubSections.map((section) => <button key={section.id} className="block w-full rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-gr-subtle hover:bg-white/10 hover:text-white" type="button" onClick={() => selectSection(section.id)}>{section.label}</button>)}
        <a className="mt-1 flex rounded-2xl px-3 py-2.5 text-sm font-bold text-gr-action no-underline hover:bg-white/10" href={getFeedPath()}>Latest RPG updates</a>
      </nav>}
    </header>
  );
}
