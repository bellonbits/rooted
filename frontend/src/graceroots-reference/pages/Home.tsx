import { useNavigate } from "react-router-dom";
import { Bell, Heart, MessageCircle, BookOpen, Users, HandHeart, Library } from "lucide-react";
import BottomNav from "../components/BottomNav";

const discussions = [
  {
    name: "Hannah Miller",
    meta: "Mother of 3 · 2h ago",
    text: "Struggling with screen time limits for my 8-year-old. How do you all balance tech usage with Bible reading and outdoor play?",
    likes: 18,
    comments: 9,
  },
  {
    name: "David Vance",
    meta: "Father of 2 · 4h ago",
    text: "Our family spent this morning praying for wisdom in our neighborhood schools. Grateful to teach my kids the power of grace.",
    likes: 24,
    comments: 12,
  },
];

const quickLinks = [
  { label: "Devotionals", icon: BookOpen, to: "/devotionals" },
  { label: "Community", icon: Users, to: "/community" },
  { label: "Prayer Wall", icon: HandHeart, to: "/prayer" },
  { label: "Resources", icon: Library, to: "/resources" },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        <header className="flex items-center justify-between px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-200 flex items-center justify-center font-serif text-forest-700">
              S
            </div>
            <div>
              <p className="text-[12px] text-ink/45">Welcome back</p>
              <p className="text-[15px] font-medium text-ink">Sarah</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center relative"
          >
            <Bell size={17} className="text-ink/70" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-clay" />
          </button>
        </header>

        <div className="px-5">
          <button
            onClick={() => navigate("/devotionals")}
            className="w-full text-left bg-forest-600 rounded-xl2 p-5 relative overflow-hidden"
          >
            <p className="text-[10px] uppercase tracking-wider text-cream-200/70 mb-2">
              Daily Verse
            </p>
            <p className="font-serif text-[18px] leading-snug text-cream-50 italic">
              "Train up a child in the way he should go; even when he is old he
              will not depart from it."
            </p>
            <p className="mt-3 text-[13px] text-cream-200/80">Proverbs 22:6</p>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 px-5 mt-5">
          {quickLinks.map(({ label, icon: Icon, to }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className="flex flex-col items-center gap-1.5 py-2"
            >
              <span className="w-11 h-11 rounded-full bg-cream-200 flex items-center justify-center text-forest-600">
                <Icon size={18} />
              </span>
              <span className="text-[11px] text-ink/60 text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-5 mt-7 mb-3">
          <h2 className="font-serif text-[17px] text-ink">Community Discussions</h2>
          <button onClick={() => navigate("/community")} className="text-[12px] text-forest-600 font-medium">
            See All
          </button>
        </div>

        <div className="px-5 flex flex-col gap-3">
          {discussions.map((d) => (
            <div key={d.name} className="bg-cream-100 rounded-xl2 p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-forest-200 flex items-center justify-center text-[12px] font-medium text-forest-700">
                  {d.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-ink">{d.name}</p>
                  <p className="text-[11px] text-ink/40">{d.meta}</p>
                </div>
              </div>
              <p className="text-[13.5px] text-ink/70 leading-relaxed">{d.text}</p>
              <div className="flex items-center gap-4 mt-3 text-ink/40">
                <span className="flex items-center gap-1 text-[12px]">
                  <Heart size={14} /> {d.likes}
                </span>
                <span className="flex items-center gap-1 text-[12px]">
                  <MessageCircle size={14} /> {d.comments}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
