import { Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Devotional() {
  const navigate = useNavigate();
  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <header className="flex items-center justify-between px-4 h-14 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-200"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-serif text-[16px] text-ink">Daily Devotional</h1>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-200">
          <Share2 size={16} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="mx-4 rounded-xl2 overflow-hidden aspect-[16/10] bg-forest-100">
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <rect width="400" height="250" fill="#E1E6D8" />
            <rect x="30" y="150" width="150" height="70" rx="4" fill="#F7F2E7" />
            <rect x="50" y="170" width="110" height="6" rx="3" fill="#C3CDB1" />
            <rect x="50" y="184" width="80" height="6" rx="3" fill="#C3CDB1" />
            <circle cx="320" cy="70" r="40" fill="#A4B48A" opacity="0.5" />
          </svg>
        </div>

        <div className="px-5 pt-5">
          <div className="bg-forest-50 border border-forest-100 rounded-xl p-4 mb-5">
            <p className="text-[11px] font-medium tracking-wide text-forest-600 mb-1.5">
              MATTHEW 18:10
            </p>
            <p className="font-serif text-[15px] italic leading-relaxed text-ink/80">
              "See that you do not despise one of these little ones. For I tell
              you that in heaven their angels always see the face of my Father
              who is in heaven."
            </p>
          </div>

          <h2 className="font-serif text-[22px] text-ink mb-3">
            The Angels of the Little Ones
          </h2>

          <p className="text-[14.5px] leading-relaxed text-ink/65 mb-4">
            In the daily routine of raising children, it's remarkably easy to
            overlook their spiritual significance. We focus on feeding,
            clothing, schooling, and guiding them, but Christ reminds us that
            children hold an esteemed position in the eyes of God.
          </p>

          <p className="text-[14.5px] leading-relaxed text-ink/65 mb-6">
            Our parenting is not merely a biological task, but a divine
            responsibility. May we view our kids today through the lens of
            heaven — valuing their trust, protecting their innocence, and
            nurturing their hearts.
          </p>

          <button
            onClick={() => navigate("/prayer")}
            className="w-full bg-forest-500 hover:bg-forest-600 text-cream-50 rounded-full py-3.5 font-medium text-[15px] mb-6"
          >
            Pray About This
          </button>

          <div className="bg-cream-200 rounded-xl2 p-4 mb-4">
            <p className="text-[12px] font-medium text-ink/50 mb-1.5">
              Today's Journal Prompt
            </p>
            <p className="text-[14px] text-ink/70 leading-relaxed">
              What is one small way you can honor the spiritual journey of your
              child today? Record your reflection.
            </p>
          </div>

          <div className="flex items-center justify-between py-4 text-[13px] text-ink/50 font-medium">
            <button className="flex items-center gap-1">
              <ChevronLeft size={15} /> Yesterday
            </button>
            <button className="flex items-center gap-1">
              Tomorrow <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
