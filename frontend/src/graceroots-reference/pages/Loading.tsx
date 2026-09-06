import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding/1"), 1200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="app-shell bg-cream-50 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-forest-200 flex items-center justify-center mb-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.2 5 6 5c2 0 3.3 1.1 4 2.3C10.7 6.1 12 5 14 5c3.8 0 5.3 3.9 3.5 7.5C15 16.65 12 21 12 21z"
            stroke="#4B5B3F"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="font-serif text-2xl text-forest-600">GraceRoots</h1>
      <p className="mt-1.5 text-xs text-ink/40 tracking-wide">Rooted in Faith. Growing Together.</p>
    </div>
  );
}
