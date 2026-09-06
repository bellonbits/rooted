import { useState } from "react";
import BottomNav from "../components/BottomNav";

const filters = ["Ages & Stages", "Discipline", "Faith", "Marriage"];

const resources = [
  { type: "Guide", title: "Spiritual Milestones", meta: "12 pages" },
  { type: "Video", title: "Gentle Discipline Practices", meta: "18 mins" },
  { type: "Podcast", title: "Sabbath Rest Self-Care", meta: "32 mins" },
  { type: "Article", title: "Building Family Altars", meta: "5 min read" },
];

export default function Resources() {
  const [active, setActive] = useState("Ages & Stages");

  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        <div className="px-5 pt-6 pb-1">
          <h1 className="font-serif text-[24px] text-ink">Resources</h1>
          <p className="text-[13.5px] text-ink/50 mt-1 leading-relaxed">
            Find articles, videos, and guides curated for Christian households.
          </p>
        </div>

        <div className="flex gap-2 px-5 mt-4 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border ${
                active === f
                  ? "bg-forest-500 border-forest-500 text-cream-50"
                  : "border-cream-300 text-ink/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <h2 className="font-serif text-[16px] text-ink px-5 mt-6 mb-3">
          Featured Resources
        </h2>

        <div className="grid grid-cols-2 gap-3 px-5">
          {resources.map((r) => (
            <button key={r.title} className="text-left bg-cream-100 rounded-xl2 overflow-hidden">
              <div className="aspect-[4/3] bg-forest-100 flex items-center justify-center">
                <svg viewBox="0 0 100 75" className="w-full h-full">
                  <rect width="100" height="75" fill="#E1E6D8" />
                  <circle cx="50" cy="37" r="16" fill="#A4B48A" opacity="0.6" />
                </svg>
              </div>
              <div className="p-3">
                <p className="text-[10.5px] uppercase tracking-wide text-forest-600 font-medium mb-1">
                  {r.type}
                </p>
                <p className="text-[13.5px] font-medium text-ink leading-snug mb-0.5">
                  {r.title}
                </p>
                <p className="text-[11.5px] text-ink/40">{r.meta}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
