import { ChevronRight } from "lucide-react";
import { useState } from "react";
import hubContent from "../../content/hub.json";
import { loadFeed } from "../content/loadFeed";
import { getFeedPath } from "../app/useHashRoute";
import type { ArticleAuthor, ArticleRecord, HubDocument } from "../content/types";
import { FireworkVideoCarousel } from "./FireworkVideoCarousel";
import { ArticleCard } from "./ArticleCard";
import { FeaturedArticleCard } from "./FeaturedArticleCard";
import { HubEditorialStances } from "./hub/HubEditorialStances";
import { HubEngagementToast } from "./hub/HubEngagementToast";
import { HubMakeYourMark } from "./hub/HubMakeYourMark";
import { HubHotTakes, HubVersus } from "./hub/HubParticipation";
import { HubSectionLinks, HubSectionNav } from "./hub/HubSectionNav";
import { HubTimeline } from "./hub/HubTimeline";
import { SinceLastVisit } from "./hub/SinceLastVisit";

const hub = hubContent as HubDocument;
const feed = loadFeed();

interface HubPageProps {
  articles: Map<string, ArticleRecord>;
  authors: ArticleAuthor[];
  layout?: "mobile" | "desktop";
}

function authorFor(article: ArticleRecord, authors: ArticleAuthor[]) {
  const hash = [...article.id].reduce((value, character) => ((value << 5) - value + character.charCodeAt(0)) | 0, 0);
  return authors[Math.abs(hash) % authors.length];
}

export function HubPage({ articles, authors, layout = "mobile" }: HubPageProps) {
  const hero = articles.get(hub.heroArticleId);
  const featured = articles.get(hub.leadArticleId);
  const latest = hub.latestArticleIds.map((id) => articles.get(id)).filter((article): article is ArticleRecord => Boolean(article));
  const feedArticles = feed.items.map((item) => articles.get(item.sourceId)).filter((article): article is ArticleRecord => Boolean(article));
  const [following, setFollowing] = useState(false);
  const [engagementMessage, setEngagementMessage] = useState<string>();
  const isDesktop = layout === "desktop";

  const featuredCoverage = <section id="featured" className="scroll-mt-28 py-8" aria-labelledby="featured-title">
    <h2 id="featured-title" className="m-0 text-[24px] font-bold">The stories shaping RPGs</h2>
    <div className="mt-3">
      {featured && <FeaturedArticleCard article={featured} author={authorFor(featured, authors)} />}
      {latest.map((article, index) => <ArticleCard key={article.id} article={article} author={authorFor(article, authors)} isFirst={!featured && index === 0} />)}
    </div>
    <a className={`mt-5 flex items-center justify-center gap-2 rounded-full bg-[#DC361A] px-4 py-3 text-sm font-bold text-white no-underline ${isDesktop ? "max-w-[260px]" : "w-full"}`} href={getFeedPath()}>Go to the RPG Feed <ChevronRight size={17} aria-hidden="true" /></a>
  </section>;

  const clips = <section id="clips" className="scroll-mt-28 border-t border-[#38404e] py-8" aria-labelledby="clips-title">
    <h2 id="clips-title" className="m-0 text-[24px] font-bold">Watch Today’s Videos</h2>
    <FireworkVideoCarousel showTitle={false} />
  </section>;

  const heroSection = <section className={isDesktop ? "relative flex min-h-[500px] w-full flex-col justify-end overflow-hidden rounded-3xl px-10 pb-0 pt-24" : "relative -mx-4 flex min-h-[560px] w-[calc(100%+2rem)] flex-col justify-end overflow-hidden px-4 pb-0 pt-24"} aria-labelledby="hub-title">
    {hero?.thumbnail && <img className="absolute inset-0 size-full object-cover" src={hero.thumbnail.url} alt="" loading="eager" />}
    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.14)_0%,rgba(10,10,12,0.08)_35%,rgba(10,10,12,0.9)_74%,rgb(10,10,12)_100%)]" />
    <div className={isDesktop ? "relative max-w-2xl pb-10" : "relative w-full pb-8"}>
      <h1 id="hub-title" className={isDesktop ? "m-0 text-[64px] font-semibold leading-none" : "m-0 text-[52px] font-semibold leading-none"}>{hub.title}</h1>
      <p className={isDesktop ? "m-0 mt-4 max-w-xl text-base leading-[1.5] text-[#e2e2e5]" : "m-0 mt-3 text-sm leading-[1.5] text-[#e2e2e5]"}>{hub.description}</p>
      <button className={"mt-6 rounded-full px-4 py-2.5 text-sm font-bold " + (isDesktop ? "min-w-[190px] " : "w-full ") + (following ? "bg-[#3c4657] text-white" : "bg-[#DC361A] text-white")} type="button" aria-pressed={following} onClick={() => setFollowing((value) => !value)}>{following ? "Following" : "Follow"}</button>
    </div>
    <HubSectionLinks alignment={isDesktop ? "start" : "distributed"} className={isDesktop ? "relative -mx-10 w-[calc(100%+5rem)] border-t border-white/20 bg-black/60 px-10 py-4 backdrop-blur-sm" : "relative -mx-4 w-[calc(100%+2rem)] border-t border-white/20 bg-black/60 px-4 py-3 backdrop-blur-sm"} />
  </section>;

  const feedRail = <aside className="sticky top-4 self-start overflow-hidden rounded-3xl border border-white/10 bg-[#1d222d] shadow-xl shadow-black/20" aria-labelledby="latest-updates-title">
    <header className="flex items-center justify-between border-b border-[#38404e] px-5 py-4">
      <div><p className="m-0 text-[11px] font-semibold uppercase text-gr-action">RPG feed</p><h2 id="latest-updates-title" className="m-0 mt-1 text-[20px] font-semibold">Latest updates</h2></div>
      <a className="text-sm font-semibold text-gr-action no-underline" href={getFeedPath()}>Open feed</a>
    </header>
    <div className="desktop-feed-rail__scroll h-[calc(100dvh-12rem)] min-h-[520px] overflow-y-auto overscroll-contain px-5">
      {feedArticles.map((article, index) => <ArticleCard key={article.id} article={article} author={authorFor(article, authors)} isFirst={index === 0} />)}
    </div>
  </aside>;

  return <div className={isDesktop ? "pb-16 text-gr-text" : "pb-10 text-gr-text"}>
    <HubSectionNav />
    <SinceLastVisit />

    {isDesktop ? <>
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(340px,1fr)] items-start gap-8">
        <div className="min-w-0">
          {heroSection}
          {featuredCoverage}
          <HubTimeline items={hub.timeline} />
          <HubEditorialStances stances={hub.editorialStances} onEngagement={setEngagementMessage} />
          <div className="grid grid-cols-2 gap-8">
            <HubHotTakes takes={hub.hotTakes} onEngagement={setEngagementMessage} />
            <HubVersus versus={hub.versus} />
          </div>
          {clips}
          <HubMakeYourMark />
        </div>
        {feedRail}
      </div>
    </> : <>
      {heroSection}
      {featuredCoverage}
      <HubTimeline items={hub.timeline} />
      <HubEditorialStances stances={hub.editorialStances} onEngagement={setEngagementMessage} />
      <HubHotTakes takes={hub.hotTakes} onEngagement={setEngagementMessage} />
      <HubVersus versus={hub.versus} />
      {clips}
      <HubMakeYourMark />
    </>}
    {engagementMessage && <HubEngagementToast message={engagementMessage} onDismiss={() => setEngagementMessage(undefined)} />}
  </div>;
}
