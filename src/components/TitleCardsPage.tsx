import { useEffect, useState } from "react";

const cards = [
  {
    eyebrow: "GamesRadar RPG",
    heading: "Introducing Content & Community Hubs",
    subheading: "A new home for the games you love, the stories that matter, and the people who play them.",
  },
  {
    eyebrow: "Your hub, updated",
    heading: "Since you were last here",
    subheading: "Catch up on the latest stories, videos, debates, and community moments in one quick recap.",
  },
  {
    eyebrow: "A feed built for you",
    heading: "Feed",
    subheading: "Personalise what you see, follow the topics you care about, or browse the latest stories by hub.",
  },
  {
    eyebrow: "Stay close to the action",
    heading: "Follow games on the pages by becoming a member",
    subheading: "Keep the games you love and their latest updates close at hand.",
  },
  {
    eyebrow: "More than the news",
    heading: "New Stance pages",
    subheading: "Experts and community members share detailed viewpoints on the latest news.",
  },
] as const;

export function TitleCardsPage() {
  const [active, setActive] = useState(0);
  const card = cards[active];

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + cards.length) % cards.length);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight" || event.key === " ") move(1);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="title-card-stage" aria-label="Content hub video title cards">
      <section className="title-card" aria-live="polite">
        <div className="title-card__glow title-card__glow--top" aria-hidden="true" />
        <div className="title-card__glow title-card__glow--bottom" aria-hidden="true" />
        <div className="title-card__content">
          <p className="title-card__eyebrow">{card.eyebrow}</p>
          <span className="title-card__rule" aria-hidden="true" />
          <h1>{card.heading}</h1>
          <p className="title-card__subheading">{card.subheading}</p>
        </div>
      </section>
    </main>
  );
}
