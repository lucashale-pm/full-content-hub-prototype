import fs from "node:fs";

const sourcePath = "content/source/en_feed_fd62aacd.json";
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const first = (value) => Array.isArray(value) ? value[0] : value;
const clean = (value) => typeof value === "string" ? value : "";

function stableNumber(id) {
  return [...id].reduce((total, character) => total + character.charCodeAt(0), 0);
}

const gameById = {
  "78JShzv7yFeBLLKPWJ8BHK": "Banishers: Ghosts of New Eden",
  "xmKhBe8SbF9n8eBjKJsJm7": "Banishers: Ghosts of New Eden",
  "Q6MgfGevUwVt7VpaMxVGfE": "Persona 3 Reload",
  "u5nVnwsNuvoHGhHZvZwfWc": "Avowed",
  "e7VJm8j3Vn3YhV2PzJx1qL": "Persona 3 Reload",
  "n8L2yQv3Wz6Dk1Pj5Hr9sT": "Like a Dragon: Infinite Wealth",
  "RPG-BLOODLINES-2": "Vampire: The Masquerade – Bloodlines 2",
  "RPG-YAKUZA-LOCALIZATION": "Like a Dragon: Infinite Wealth",
  "RPG-AVOWED-OPEN-ZONES": "Avowed",
  "zhxPmtD2yDvyNGHNC9Emxb": "Baldur's Gate 3",
  "RPG-FF-PIXEL-REMASTER": "Final Fantasy Pixel Remaster",
  "RPG-AVOWED-COMBAT": "Avowed",
  "L4P8JWWXFnRQccsmtF3rfK": "Pillars of Eternity 3",
  "RPG-WITCHER-REMAKE": "The Witcher Remake",
  "RPG-DEUS-EX": "Deus Ex",
  "RPG-PALWORLD-MIND": "Palworld",
  "y8BDwQYFeUUDv4GQo4w5xn": "Final Fantasy 6",
  "RPG-BG3-DICE-ROLL": "Baldur's Gate 3",
  "RPG-ELDEN-RING-MALENIA": "Elden Ring",
  "RPG-SUICIDE-SQUAD": "Suicide Squad: Kill the Justice League",
  "RPG-AVOWED-MORALITY": "Avowed",
  "RPG-STARFIELD-MODS": "Starfield",
  "cMTkxGckQwZBF957KH755b": "Baldur's Gate 3",
  "RPG-DRAGONS-DOGMA-2": "Dragon's Dogma 2",
  "RPG-AVOWED-CHOICE": "Avowed",
  "RPG-TALES-OF-SEIKYU": "Tales of Seikyu",
  "Eh2vYc7XpwDaxXB6KAzUoe": "Tales of Seikyu",
  "RPG-STARFIELD-LIGHTING": "Starfield",
  "PkguTcEYT3mvQ6zHAWwg6j": "Avowed",
  "RPG-PALWORLD-COMMANDS": "Palworld",
  "kRxyZza8xZR96H3oGJy5jX": "The Witcher 4"
};

const gameByTitle = [
  ["Persona 3 Reload", "Persona 3 Reload"],
  ["Avowed", "Avowed"],
  ["Like a Dragon: Infinite Wealth", "Like a Dragon: Infinite Wealth"],
  ["Vampire: The Masquerade", "Vampire: The Masquerade – Bloodlines 2"],
  ["Baldur's Gate 3", "Baldur's Gate 3"],
  ["Final Fantasy Pixel Remaster", "Final Fantasy Pixel Remaster"],
  ["Pillars of Eternity 3", "Pillars of Eternity 3"],
  ["The Witcher remake", "The Witcher Remake"],
  ["Deus Ex", "Deus Ex"],
  ["Palworld", "Palworld"],
  ["Final Fantasy 6", "Final Fantasy 6"],
  ["Elden Ring", "Elden Ring"],
  ["Suicide Squad: Kill the Justice League", "Suicide Squad: Kill the Justice League"],
  ["Starfield", "Starfield"],
  ["Dragon's Dogma 2", "Dragon's Dogma 2"],
  ["Banishers Ghosts of New Eden", "Banishers: Ghosts of New Eden"],
  ["The Witcher 4", "The Witcher 4"],
  ["Tales of Seikyu", "Tales of Seikyu"]
];

function getGame(record) {
  if (gameById[record.id]) return gameById[record.id];
  const title = record.title || record.documentname || "";
  return gameByTitle.find(([needle]) => title.includes(needle))?.[1] || "RPG";
}

function parseBlocks(record) {
  const raw = first(record.articlepage);
  if (typeof raw !== "string") return [];

  try {
    return JSON.parse(raw).map((block) => {
      const data = block?.data || {};
      if (block.type === "text") return { type: "text", paragraphs: data.paragraphs || [] };
      if (block.type === "heading" || block.type === "section") {
        return { type: block.type, text: clean(data.text) };
      }
      if (block.type === "image") {
        return {
          type: "image",
          src: clean(data.src).replace(/^http:\/\//, "https://"),
          alt: clean(data.alt),
          width: data.width || null,
          height: data.height || null,
          credit: clean(data.credit),
        };
      }
      if (block.type === "list") {
        return { type: "list", listType: data.type || "ul", items: data.items || [], start: data.start || null };
      }
      if (block.type === "boxout") {
        return { type: "boxout", title: clean(data.title), text: data.text || [], image: data.image || [] };
      }
      return { type: block.type, data };
    });
  } catch {
    return [];
  }
}

const articles = source.map((record) => ({
  id: record.id,
  title: record.title || record.documentname,
  game: getGame(record),
  kind: record.articletype || "article",
  categories: record.articlecategory || [],
  tags: record.articletag || [],
  publishedAt: record.publish_date || record.publisheddate || null,
  modifiedAt: record.last_modified || record.modifieddate || null,
  canonicalUrl: record.canonical || null,
  publisher: record.published_by || "GamesRadar+",
  thumbnail: record.thumbnail ? {
    url: record.thumbnail.replace(/^http:\/\//, "https://"),
    alt: record.image_thumbnail?.title || record.title || record.documentname || "",
  } : null,
  thumbnailCredit: record.image_thumbnail?.credit || null,
  // Prototype-only engagement values. Replace with supplied metrics later if needed.
  reactionCount: 40 + (stableNumber(record.id) * 17) % 1960,
  commentCount: 3 + (stableNumber(record.id) * 7) % 148,
  blocks: parseBlocks(record),
  contentHtml: record.content || "",
}));

const feed = {
  category: "RPG",
  source: "en_feed_fd62aacd.json",
  items: source.map((record) => ({ id: `article-${record.id}`, type: "article", sourceId: record.id })),
};

fs.writeFileSync("content/articles.json", `${JSON.stringify(articles, null, 2)}\n`);
fs.writeFileSync("content/feed.json", `${JSON.stringify(feed, null, 2)}\n`);
console.log(`Normalized ${articles.length} articles.`);
