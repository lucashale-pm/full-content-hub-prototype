import { useEffect, useRef, useState } from "react";

const draftKey = "gamesradar-title-card-draft";

const defaultDraft = {
  width: 430,
  height: 932,
  eyebrow: "GamesRadar RPG",
  heading: "Introducing Content & Community Hubs",
  subheading: "A new home for the games you love, the stories that matter, and the people who play them.",
};

type Draft = typeof defaultDraft;

export function TitleCardsPage() {
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const hydrated = useRef(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(draftKey);
    if (saved) {
      try {
        setDraft({ ...defaultDraft, ...JSON.parse(saved) });
      } catch {
        window.localStorage.removeItem(draftKey);
      }
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(draftKey, JSON.stringify(draft));
  }, [draft]);

  function updateText(field: "eyebrow" | "heading" | "subheading", value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateSize(field: "width" | "height", value: string) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    const limits = field === "height" ? { min: 320, max: 932 } : { min: 240, max: 1600 };
    setDraft((current) => ({ ...current, [field]: Math.min(limits.max, Math.max(limits.min, parsed)) }));
  }

  return (
    <main className="title-card-configurator">
      <section className="title-card-editor" aria-label="Title card editor">
        <p className="title-card-editor__eyebrow">Title card configurator</p>
        <h1>Make your card</h1>
        <p className="title-card-editor__hint">Type copy. Preview updates live. Draft stays on this device.</p>
        <div className="title-card-editor__sizes">
          <label><span>Width (px)</span><input type="number" min="240" max="1600" value={draft.width} onChange={(event) => updateSize("width", event.target.value)} /></label>
          <label><span>Height (px)</span><input type="number" min="320" max="932" value={draft.height} onChange={(event) => updateSize("height", event.target.value)} /></label>
        </div>
        <label><span>Eyebrow</span><input value={draft.eyebrow} onChange={(event) => updateText("eyebrow", event.target.value)} /></label>
        <label><span>Heading</span><textarea rows={3} value={draft.heading} onChange={(event) => updateText("heading", event.target.value)} /></label>
        <label><span>Subheading</span><textarea rows={5} value={draft.subheading} onChange={(event) => updateText("subheading", event.target.value)} /></label>
      </section>
      <section className="title-card-preview" aria-label="Live title card preview">
        <div className="title-card" style={{ width: `${draft.width}px`, height: `${draft.height}px` }}>
          <div className="title-card__glow title-card__glow--top" aria-hidden="true" />
          <div className="title-card__glow title-card__glow--bottom" aria-hidden="true" />
          <div className="title-card__content">
            <p className="title-card__eyebrow">{draft.eyebrow}</p>
            <span className="title-card__rule" aria-hidden="true" />
            <h2>{draft.heading}</h2>
            <p className="title-card__subheading">{draft.subheading}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
