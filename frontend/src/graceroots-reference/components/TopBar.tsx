import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TopBar({
  title,
  right,
  transparent = false,
}: {
  title: string;
  right?: ReactNode;
  transparent?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <header
      className={`flex items-center justify-between px-4 h-14 shrink-0 ${
        transparent ? "" : "bg-cream-100 border-b border-cream-300"
      }`}
    >
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full hover:bg-cream-200 text-ink"
      >
        <ChevronLeft size={22} />
      </button>
      <h1 className="font-serif text-[17px] font-medium text-ink">{title}</h1>
      <div className="w-8 h-8 flex items-center justify-center">{right}</div>
    </header>
  );
}
