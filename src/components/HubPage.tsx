import { ChevronRight } from "lucide-react";
import { useState } from "react";
import hubContent from "../../content/hub.json";
import { getFeedPath } from "../app/useHashRoute";
import type { ArticleAuthor, ArticleRecord, HubDocument } from "../content/types";
import { FireworkVideoCarousel } from "./FireworkVideoCarousel";
import { ArticleCard } from "./ArticleCard";
import { FeaturedArticleCard } from "./FeaturedArticleCard";
import { HubEditorialStances } from "./hub/HubEditorialStances";
import { HubMakeYourMark } from "./hub/HubMakeYourMark";
import { HubHotTakes, HubVersus } from "./hub/HubParticipation";
import { HubSectionLinks, HubSectionNav } from "./hub/HubSectionNav";
import { HubTimeline } from "./hub/HubTimeline";
import { SinceLastVisit } from "./hub/SinceLastVisit";

const hub = hubContent as HubDocument;

interface HubPageProps {
  articles: Map<string, ArticleRecord>;
  authors: ArticleAuthor[];
}

function authorFor(article: ArticleRecord, authors: ArticleAuthor[]) {
  const hash = [...article.id].reduce((value, character) => ((value << 5) - value + character.charCodeAt(0)) | 0, 0);
  return authors[Math.abs(hash) % authors.length];
}

export function HubPage({ articles, authors }: HubPageProps) {
  const hero = articles.get(hub.heroArticleId);
  const featured = articles.get(hub.leadArticleId);
  const latest = hub.latestArticleIds.map((id) => articles.get(id)).filter((article): article is ArticleRecord => Boolean(article));
  const [following, setFollowing] = useState(false);

  return <div className="pb-10 text-gr-text">
    <HubSectionNav />
    <SinceLastVisit />

    <section className="relative -mx-4 flex min-h-[560px] w-[calc(100%+2rem)] flex-col justify-end overflow-hidden px-4 pb-0 pt-24" aria-labelledby="hub-title">
      {hero?.thumbnail && <img className="absolute inset-0 size-full object-cover" src={hero.thumbnail.url} alt="" loading="eager" />}
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.14)_0%,rgba(10,10,12,0.08)_35%,rgba(10,10,12,0.9)_74%,rgb(10,10,12)_100%)]" />
      <div className="relative max-w-sm pb-8">
        <h1 id="hub-title" className="m-0 text-[52px] font-semibold leading-none tracking-[-0.055em]">{hub.title}</h1>
        <p className="m-0 mt-3 text-sm leading-[1.5] text-[#e2e2e5]">{hub.description}</p>
        <button className={"mt-6 w-full rounded-full px-4 py-2.5 text-sm font-bold " + (following ? "bg-[#3c4657] text-white" : "bg-[#DC361A] text-white")} type="button" aria-pressed={following} onClick={() => setFollowing((value) => !value)}>{following ? "Following" : "Follow"}</button>
      </div>
      <HubSectionLinks className="relative -mx-4 w-[calc(100%+2rem)] border-t border-white/20 bg-black/60 px-4 py-3 backdrop-blur-sm" />
    </section>

    <section id="featured" className="scroll-mt-28 py-8" aria-labelledby="featured-title">
      <h2 id="featured-title" className="m-0 text-[24px] font-bold tracking-[-0.03em]">The stories shaping RPGs</h2>
      <div className="mt-3">
        {featured && <FeaturedArticleCard article={featured} author={authorFor(featured, authors)} />}
        {latest.map((article, index) => <ArticleCard key={article.id} article={article} author={authorFor(article, authors)} isFirst={!featured && index === 0} />)}
      </div>
      <a className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#DC361A] px-4 py-3 text-sm font-bold text-white no-underline" href={getFeedPath()}>Go to the RPG Feed <ChevronRight size={17} aria-hidden="true" /></a>
    </section>

    <HubTimeline items={hub.timeline} />
    <HubEditorialStances stances={hub.editorialStances} />
    <HubHotTakes takes={hub.hotTakes} />
    <HubVersus versus={hub.versus} />

    <section id="clips" className="scroll-mt-28 border-t border-[#38404e] py-8" aria-labelledby="clips-title">
      <h2 id="clips-title" className="m-0 text-[24px] font-bold tracking-[-0.03em]">Watch Today’s Videos</h2>
      <FireworkVideoCarousel showTitle={false} />
    </section>
    <HubMakeYourMark />
  </div>;
}
