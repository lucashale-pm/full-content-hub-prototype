import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { HubTimelineItem } from "../../content/types";

export function HubTimeline({ items }: { items: HubTimelineItem[] }) {
  const [openId, setOpenId] = useState<string | undefined>(items[0]?.id);
  function toggle(id: string) { setOpenId((current) => current === id ? undefined : id); }

  return (
    <section id="timeline" className="scroll-mt-28 border-t border-[#38404e] py-8" aria-labelledby="timeline-title">
      <p className="m-0 text-[11px] font-semibold uppercase text-gr-muted">How we covered it</p>
      <h2 id="timeline-title" className="m-0 mt-1 text-[24px] font-bold">The RPG year through our editors’ eyes</h2>
      <div className="mt-5">
        {items.map((item, index) => {
          const open = openId === item.id;
          return <article key={item.id} className="grid grid-cols-[76px_minmax(0,1fr)] gap-3">
            <div className="relative pt-3">
              {index < items.length - 1 && <span className="absolute left-1 top-5 h-[calc(100%+1rem)] border-l border-[#495365]" aria-hidden="true" />}
              <span className={"relative z-10 inline-block size-2.5 rounded-full " + (open ? "bg-gr-action" : "bg-[#808080]")} aria-hidden="true" />
              <span className={"ml-1.5 align-middle text-[10px] font-bold " + (open ? "text-gr-action" : "text-gr-muted")}>{item.date}</span>
            </div>
            <div className="border-b border-[#38404e] pb-3">
              <button className="flex w-full items-center gap-3 border-0 bg-transparent py-3 text-left" type="button" aria-expanded={open} onClick={() => toggle(item.id)}>
                <span className="min-w-0 flex-1 text-base font-semibold leading-[1.3] text-gr-text">{item.title}</span>
                <ChevronRight size={17} className={"shrink-0 text-gr-muted transition-transform " + (open ? "rotate-90" : "")} aria-hidden="true" />
              </button>
              {open && <div className="pb-3">
                <p className="m-0 text-xs font-bold text-gr-subtle">{item.author}</p>
                <blockquote className="m-0 mt-2 text-sm italic leading-[1.45] text-gr-muted">“{item.quote}”</blockquote>
                <button className="mt-3 border-0 bg-transparent p-0 text-xs font-bold text-gr-action" type="button">{item.readLabel}</button>
              </div>}
            </div>
          </article>;
        })}
      </div>
    </section>
  );
}
