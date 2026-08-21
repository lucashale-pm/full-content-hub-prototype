import { MobileShell } from "../components/MobileShell";
import { ArticleCard } from "../components/ArticleCard";
import { VerticalVideoCard } from "../components/VerticalVideoCard";
import { LandscapeVideoCard } from "../components/LandscapeVideoCard";
import { FireworkVideoCarousel } from "../components/FireworkVideoCarousel";
import { BigPreviewCard } from "../components/BigPreviewCard";
import { loadFeed } from "../content/loadFeed";
import { useHashRoute } from "./useHashRoute";
import articles from "../../content/articles.json";
import authors from "../../content/authors.json";
import type { ArticleAuthor, ArticleRecord } from "../content/types";

const feed = loadFeed();
const articleById = new Map((articles as ArticleRecord[]).map((article) => [article.id, article]));
const authorPool = authors as ArticleAuthor[];
const videoArticle = articleById.get(feed.items[10]?.sourceId);

function stableHash(value: string) {
  return [...value].reduce((hash, character) => ((hash << 5) - hash + character.charCodeAt(0)) | 0, 0);
}

const demoStateItems = [...feed.items]
  .sort((left, right) => stableHash(left.sourceId) - stableHash(right.sourceId))
  .slice(0, 4);
const savedArticleIds = new Set(demoStateItems.slice(0, 2).map((item) => item.sourceId));
const reactedArticleIds = new Set(demoStateItems.slice(2, 4).map((item) => item.sourceId));

function stableAuthorIndex(id: string) {
  return Math.abs(stableHash(id)) % authorPool.length;
}

function renderStandardCard(item: (typeof feed.items)[number], index: number) {
  const article = articleById.get(item.sourceId);
  return article ? <ArticleCard key={item.id} article={article} author={authorPool[stableAuthorIndex(article.id)]} isSaved={savedArticleIds.has(article.id)} isReacted={reactedArticleIds.has(article.id)} isFirst={index === 0} /> : null;
}

export function App() {
  const route = useHashRoute();

  return (
    <MobileShell>
      <section className="px-4 py-6" aria-live="polite">
        {route.name === "item" ? (
          <p className="m-0 text-sm leading-6 text-gr-muted">
            Story detail foundation for: {route.id}
          </p>
        ) : (
          <div className="flex flex-col" aria-label="RPG article feed">
            {feed.items.slice(0, 3).map(renderStandardCard)}
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
    </MobileShell>
  );
}
