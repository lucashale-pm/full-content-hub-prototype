import { MobileShell } from "../components/MobileShell";
import { ArticleCard } from "../components/ArticleCard";
import { VerticalVideoCard } from "../components/VerticalVideoCard";
import { LandscapeVideoCard } from "../components/LandscapeVideoCard";
import { FireworkVideoCarousel } from "../components/FireworkVideoCarousel";
import { BigPreviewCard } from "../components/BigPreviewCard";
import { StanceDetailPage } from "../components/StanceDetailPage";
import { TitleCardsPage } from "../components/TitleCardsPage";
import { StanceFeedCard } from "../components/StanceFeedCard";
import { StanceUpdateCard } from "../components/StanceUpdateCard";
import { HubPage } from "../components/HubPage";
import { BackToHubBanner } from "../components/BackToHubBanner";
import { loadFeed } from "../content/loadFeed";
import { useHashRoute } from "./useHashRoute";
import articles from "../../content/articles.json";
import authors from "../../content/authors.json";
import editorialContexts from "../../content/editorial-contexts.json";
import stances from "../../content/stances.json";
import type { ArticleAuthor, ArticleEditorialContextDocument, ArticleRecord, StanceDocument } from "../content/types";

const feed = loadFeed();
const articleById = new Map((articles as ArticleRecord[]).map((article) => [article.id, article]));
const authorPool = authors as ArticleAuthor[];
const articleEditorialContexts = (editorialContexts as ArticleEditorialContextDocument).contexts;
const videoArticle = articleById.get(feed.items[10]?.sourceId);
const stanceRecords = (stances as StanceDocument).stances;
const leadStance = stanceRecords[0];
const leadStanceUpdate = leadStance?.opinions.find((opinion) => opinion.id === leadStance.featuredOpinionId);

function stableHash(value: string) {
  return [...value].reduce((hash, character) => ((hash << 5) - hash + character.charCodeAt(0)) | 0, 0);
}

const savedArticleIds = new Set([
  "78JShzv7yFeBLLKPWJ8BHK",
  "fKtxRfUR98Biq2GM8mni5c",
  "8Euq3RHT62eTyWc6GsCa45",
]);
const reactedArticleIds = new Set([
  "Q6MgfGevUwVt7VpaMxVGfE",
  "ptij7nU6MEs5QJoH7XqAdW",
  "8G7JrMbNmCkpqV5Hju9PTA",
]);

function stableAuthorIndex(id: string) {
  return Math.abs(stableHash(id)) % authorPool.length;
}

function renderStandardCard(item: (typeof feed.items)[number], index: number) {
  const article = articleById.get(item.sourceId);
  return article ? <ArticleCard key={item.id} article={article} author={authorPool[stableAuthorIndex(article.id)]} editorialContext={articleEditorialContexts[article.id]} isSaved={savedArticleIds.has(article.id)} isReacted={reactedArticleIds.has(article.id)} isFirst={index === 0} /> : null;
}

export function App() {
  const route = useHashRoute();

  return (
    route.name === "title-cards" ? <TitleCardsPage /> :
    route.name === "desktop" ? (
      <main className="min-h-dvh bg-gr-page text-gr-text">
        <section className="mx-auto w-full max-w-[1200px] px-4 py-6" aria-live="polite">
          <HubPage articles={articleById} authors={authorPool} layout="desktop" />
        </section>
      </main>
    ) :
    <MobileShell>
      {route.name === "hub" ? (
        <section className="px-4" aria-live="polite">
          <HubPage articles={articleById} authors={authorPool} />
        </section>
      ) : (
        <section className="px-4 py-6" aria-live="polite">
        {route.name === "item" ? (
          <p className="m-0 text-sm leading-6 text-gr-muted">
            Story detail foundation for: {route.id}
          </p>
        ) : route.name === "stance" ? (
          (() => {
            const stance = stanceRecords.find((record) => record.id === route.id);
            return stance ? <StanceDetailPage stance={stance} /> : <p className="m-0 text-sm leading-6 text-gr-muted">Stance not found.</p>;
          })()
        ) : (
          <div className="flex flex-col" aria-label="RPG article feed">
            <BackToHubBanner />
            {feed.items.slice(0, 1).map(renderStandardCard)}
            {leadStance && leadStanceUpdate && <StanceUpdateCard stance={leadStance} opinion={leadStanceUpdate} />}
            {feed.items.slice(1, 3).map((item, index) => renderStandardCard(item, index + 1))}
            {leadStance && <StanceFeedCard stance={leadStance} />}
            {videoArticle && <VerticalVideoCard article={videoArticle} author={authorPool[stableAuthorIndex(videoArticle.id)]} />}
            {feed.items.slice(3, 4).map((item, index) => renderStandardCard(item, index + 3))}
            <LandscapeVideoCard title="1666: Amsterdam is a spooky love letter to Assassin's Creed of old | Preview" videoId="Qbfmx-SlRUA" />
            {feed.items.slice(4, 5).map((item, index) => renderStandardCard(item, index + 4))}
            <FireworkVideoCarousel />
            {feed.items.slice(5, 7).map((item, index) => renderStandardCard(item, index + 5))}
            <BigPreviewCard />
            {feed.items.slice(7, 10).map((item, index) => renderStandardCard(item, index + 7))}
          </div>
        )}
        </section>
      )}
    </MobileShell>
  );
}
