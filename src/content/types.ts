export type FeedItemType =
  | "article"
  | "video"
  | "articleUpdate"
  | "comment"
  | "stance";

export type MediaOrientation = "vertical" | "horizontal";

export interface RemoteMedia {
  url: string;
  alt: string;
}

export interface FeedItemBase {
  id: string;
  type: FeedItemType;
  publishedAt: string;
}

export interface ArticleItem extends FeedItemBase {
  type: "article";
  title: string;
  strapline?: string;
  authorId: string;
  image?: RemoteMedia;
  featured?: boolean;
}

export interface VideoItem extends FeedItemBase {
  type: "video";
  title: string;
  orientation: MediaOrientation;
  video: RemoteMedia;
  poster?: RemoteMedia;
  duration?: string;
}

export interface ArticleUpdateItem extends FeedItemBase {
  type: "articleUpdate";
  parentId: string;
  update: string;
}

export interface CommentItem extends FeedItemBase {
  type: "comment";
  parentId: string;
  authorId: string;
  body: string;
  verified?: boolean;
}

export interface StanceContributor {
  authorId: string;
  paragraphs: string[];
  verified?: boolean;
  video?: {
    orientation: MediaOrientation;
    source: RemoteMedia;
    poster?: RemoteMedia;
  };
}

export interface StanceItem extends FeedItemBase {
  type: "stance";
  title: string;
  leadParagraphs: string[];
  contributors: StanceContributor[];
  image?: RemoteMedia;
}

export type FeedItem =
  | ArticleItem
  | VideoItem
  | ArticleUpdateItem
  | CommentItem
  | StanceItem;

export interface FeedDocument {
  category: string;
  source: string;
  items: FeedReference[];
}

export interface FeedReference {
  id: string;
  type: "article";
  sourceId: string;
}

export interface ArticleRecord {
  id: string;
  title: string;
  game: string;
  kind: string;
  categories: string[];
  tags: string[];
  publishedAt: string | null;
  modifiedAt: string | null;
  canonicalUrl: string | null;
  publisher: string;
  thumbnail: RemoteMedia | null;
  thumbnailCredit: string | null;
  reactionCount: number;
  commentCount: number;
  blocks: unknown[];
  contentHtml: string;
}

export interface ArticleEditorialContext {
  label: string;
  copy: string;
}

export interface ArticleEditorialContextDocument {
  contexts: Record<string, ArticleEditorialContext>;
}

export interface ArticleAuthor {
  id: string;
  name: string;
  image: string;
}

export interface BigPreviewRelated {
  id: string;
  title: string;
  strapline: string;
  author: string;
  url: string;
  reactionCount: number;
  commentCount: number;
}

export interface BigPreviewRecord {
  id: string;
  type: "bigPreview";
  game: string;
  label: string;
  title: string;
  strapline: string;
  packageIntro?: string;
  canonicalUrl: string;
  publishedAt: string;
  author: ArticleAuthor;
  hero: RemoteMedia;
  reactionCount: number;
  commentCount: number;
  related: BigPreviewRelated[];
}

export type StanceSentiment = "opposing" | "neutral" | "supporting";

export interface StanceProfile {
  name: string;
  initials: string;
  role?: string;
  image?: string;
}

export interface StanceCredential {
  icon: "medal" | "chart" | "brain" | "mic" | "trophy";
  text: string;
}

export interface StanceOpinion {
  id: string;
  addedLabel: string;
  sentiment: StanceSentiment;
  label: string;
  statement: string;
  author: StanceProfile;
  credentials: StanceCredential[];
  paragraphs: string[];
  video?: {
    channel: string;
    videoId: string;
  };
}

export interface StanceVoteOption {
  id: "opposing" | "supporting";
  label: string;
  voteCount: number;
}

export interface StanceComment {
  id: string;
  author: StanceProfile;
  postedAt: string;
  body: string;
  likes: number;
}

export interface StanceRecord {
  id: string;
  featuredOpinionId?: string;
  label: string;
  game: string;
  topic: string;
  title: string;
  author: StanceProfile;
  hero: RemoteMedia;
  publishedLabel: string;
  updatedLabel: string;
  updateSummary: string;
  commentCount: number;
  snippet: string;
  primer: string[];
  opinions: StanceOpinion[];
  vote: {
    title: string;
    options: StanceVoteOption[];
  };
  commentCta: {
    title: string;
    body: string;
  };
  comments: StanceComment[];
}

export interface StanceDocument {
  stances: StanceRecord[];
}
