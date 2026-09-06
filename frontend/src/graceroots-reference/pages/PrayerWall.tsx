import { Heart } from "lucide-react";
import { useState } from "react";
import BottomNav from "../components/BottomNav";

const requests = [
  {
    name: "Hannah Miller",
    meta: "3h ago",
    text: '"Please pray for my daughter\'s upcoming school exams and her persistent anxiety. We are teaching her to find rest in the Lord."',
    joined: 32,
  },
  {
    name: "David Vance",
    meta: "1d ago",
    text: '"Seeking spiritual strength and physical healing for my father who is undergoing physical therapy after major knee surgery."',
    joined: 54,
  },
  {
    name: "Ester Kim",
    meta: "2d ago",
    text: '"Pray for wisdom for our neighborhood church leaders as they design our new children\'s summer bible program."',
    joined: 19,
  },
];

export default function PrayerWall() {
  const [joined, setJoined] = useState<string[]>([]);

  const toggle = (name: string) =>
    setJoined((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        <div className="px-5 pt-6 pb-1">
          <h1 className="font-serif text-[24px] text-ink">Prayer Wall</h1>
          <p className="text-[13.5px] text-ink/50 mt-1 leading-relaxed">
            Bear one another's burdens, and so fulfill the law of Christ.
          </p>
        </div>

        <div className="mx-5 mt-4 bg-forest-50 border border-forest-100 rounded-xl2 p-4">
          <p className="text-[13.5px] font-medium text-ink mb-2">
            How can we pray for you today?
          </p>
          <textarea
            placeholder="Share your request gently..."
            rows={2}
            className="w-full bg-cream-50 rounded-lg border border-cream-300 p-3 text-[13.5px] outline-none focus:border-forest-400 placeholder:text-ink/35 resize-none mb-3"
          />
          <button className="bg-forest-500 hover:bg-forest-600 text-cream-50 rounded-full px-5 py-2 text-[13.5px] font-medium">
            Submit Request
          </button>
        </div>

        <div className="px-5 mt-5 flex flex-col gap-3">
          {requests.map((r) => {
            const isJoined = joined.includes(r.name);
            return (
              <div key={r.name} className="bg-cream-100 rounded-xl2 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-medium text-ink">{r.name}</p>
                  <p className="text-[11px] text-ink/40">{r.meta}</p>
                </div>
                <p className="text-[13.5px] text-ink/70 leading-relaxed italic">
                  {r.text}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => toggle(r.name)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium border ${
                      isJoined
                        ? "bg-forest-500 border-forest-500 text-cream-50"
                        : "border-forest-300 text-forest-600"
                    }`}
                  >
                    <Heart size={13} fill={isJoined ? "currentColor" : "none"} />
                    Praying for you
                  </button>
                  <span className="text-[12px] text-ink/40">
                    {r.joined + (isJoined ? 1 : 0)} joined
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
