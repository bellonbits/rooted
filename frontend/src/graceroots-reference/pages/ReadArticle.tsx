import { Share2 } from "lucide-react";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";

export default function ReadArticle() {
  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <TopBar title="Read Article" right={<Share2 size={16} />} />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="mx-4 mt-3 rounded-xl2 overflow-hidden aspect-[16/10] bg-forest-100">
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <rect width="400" height="250" fill="#E1E6D8" />
            <circle cx="130" cy="120" r="34" fill="#B98249" />
            <circle cx="200" cy="105" r="40" fill="#4B5B3F" />
            <circle cx="270" cy="122" r="32" fill="#869B63" />
            <rect x="90" y="180" width="220" height="8" rx="4" fill="#F7F2E7" />
          </svg>
        </div>

        <div className="px-5 pt-5">
          <h1 className="font-serif text-[21px] leading-snug text-ink mb-3">
            Nurturing Children's Hearts in a Busy World
          </h1>

          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-full bg-forest-200 flex items-center justify-center text-[12px] font-medium text-forest-700">
              SJ
            </div>
            <div>
              <p className="text-[13px] font-medium text-ink">Sarah Jenkins</p>
              <p className="text-[11px] text-ink/40">Oct 24, 2026 · 6 min read</p>
            </div>
          </div>

          <p className="text-[14.5px] leading-relaxed text-ink/65 mb-5">
            In the blur of morning schedules, after-school practices, and work
            commitments, our homes can quickly transform into spaces of pure
            logistics rather than spiritual shelter.
          </p>

          <div className="bg-forest-50 border border-forest-100 rounded-xl p-4 mb-5">
            <p className="text-[11px] font-medium tracking-wide text-forest-600 mb-1.5">
              DEUTERONOMY 6:6-7
            </p>
            <p className="font-serif text-[14.5px] italic leading-relaxed text-ink/80">
              "These commandments that I give you today are to be on your
              hearts. Impress them on your children. Talk about them when you
              sit at home..."
            </p>
          </div>

          <p className="text-[14.5px] leading-relaxed text-ink/65 mb-6">
            True spiritual training isn't reserved only for Sunday school. It
            lives in the casual conversations around the dining table, the
            peaceful prayers before sleep, and the grace we offer when toys are
            broken.
          </p>

          <h2 className="font-serif text-[16px] text-ink mb-3">
            Related Devotionals
          </h2>
          <div className="flex items-center gap-3 bg-cream-100 rounded-xl2 p-3 mb-6">
            <div className="w-14 h-14 rounded-lg bg-forest-100 shrink-0" />
            <div>
              <p className="text-[13.5px] font-medium text-ink leading-snug">
                The Sabbath Rest for Weary Parents
              </p>
              <p className="text-[11.5px] text-ink/40 mt-0.5">4 min read</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
