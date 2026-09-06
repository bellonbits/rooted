import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding/1"), 1600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div
      onClick={() => navigate("/onboarding/1")}
      className="app-shell bg-forest-500 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
    >
      <svg
        className="absolute -top-16 -right-16 opacity-[0.08]"
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
      >
        <circle cx="140" cy="140" r="139" stroke="#F7F2E7" strokeWidth="1" />
      </svg>
      <svg
        className="absolute -bottom-24 -left-20 opacity-[0.06]"
        width="320"
        height="320"
        viewBox="0 0 320 320"
        fill="none"
      >
        <circle cx="160" cy="160" r="159" stroke="#F7F2E7" strokeWidth="1" />
      </svg>

      <div className="w-20 h-20 rounded-full bg-cream-50 flex items-center justify-center shadow-card mb-6">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v18M5 8h14" stroke="#B98249" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <h1 className="font-serif text-3xl text-cream-50 tracking-tight">GraceRoots</h1>
      <p className="mt-2 text-sm text-cream-200/80">Rooted in Faith. Growing Together.</p>

      <div className="absolute bottom-3 w-32 h-1 rounded-full bg-cream-50/30" />
    </div>
  );
}
