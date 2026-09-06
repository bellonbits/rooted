import { Search, MessageSquare, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "../components/BottomNav";

const filters = ["All", "Toddlers", "Teen Years", "Marriage", "Faith Talk"];

const threads = [
  {
    name: "Hannah Miller",
    meta: "Toddlers · 2h ago",
    title: "Screen time balance with Bible reading",
    replies: 18,
  },
  {
    name: "David Vance",
    meta: "Teen Years · 5h ago",
    title: "Teens questioning faith - how to stay patient?",
    replies: 34,
  },
  {
    name: "Rachel Green",
    meta: "Marriage · 1d ago",
    title: "Spiritual leadership in our household marriage",
    replies: 12,
  },
  {
    name: "Michael Chang",
    meta: "Faith Talk · 2d ago",
    title: "Easy night time prayers for 5 year olds",
    replies: 8,
  },
];

export default function Community() {
  const navigate = useNavigate();
  const [active, setActive] = useState("All");

  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 relative">
        <div className="px-5 pt-6 pb-1">
          <h1 className="font-serif text-[24px] text-ink">Community</h1>
          <p className="text-[13.5px] text-ink/50 mt-1">
            Connect, share wisdom, and walk together in faith.
          </p>
        </div>

        <div className="px-5 mt-4">
          <div className="flex items-center gap-2 bg-cream-200 rounded-full px-4 py-2.5">
            <Search size={16} className="text-ink/40" />
            <input
              placeholder="Search topics or questions..."
              className="bg-transparent outline-none text-[13.5px] w-full placeholder:text-ink/40"
            />
          </div>
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

        <h2 className="font-serif text-[16px] text-ink px-5 mt-6 mb-2">
          Recent Discussions
        </h2>

        <div className="px-5 flex flex-col divide-y divide-cream-200">
          {threads.map((t) => (
            <button
              key={t.title}
              onClick={() => navigate("/community/article")}
              className="text-left py-4 flex gap-3"
            >
              <div className="w-9 h-9 shrink-0 rounded-full bg-forest-200 flex items-center justify-center text-[12px] font-medium text-forest-700">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-ink">{t.name}</p>
                <p className="text-[11px] text-ink/40 mb-1">{t.meta}</p>
                <p className="text-[14px] text-ink/75 leading-snug">{t.title}</p>
                <span className="flex items-center gap-1 mt-1.5 text-[12px] text-ink/40">
                  <MessageSquare size={13} /> {t.replies} replies
                </span>
              </div>
            </button>
          ))}
        </div>

        <button className="absolute bottom-4 right-5 w-12 h-12 rounded-full bg-forest-500 text-cream-50 flex items-center justify-center shadow-card">
          <Plus size={22} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
