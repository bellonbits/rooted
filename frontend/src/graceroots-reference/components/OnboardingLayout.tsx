import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingLayout({
  visual,
  title,
  description,
  step,
  totalSteps,
  ctaLabel,
  onNext,
}: {
  visual: ReactNode;
  title: string;
  description: string;
  step: number;
  totalSteps: number;
  ctaLabel: string;
  onNext: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="flex items-center justify-end px-5 pt-4">
        {step < totalSteps && (
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-ink/50 font-medium"
          >
            Skip
          </button>
        )}
      </div>

      <div className="px-6 pt-2">
        <div className="rounded-xl2 overflow-hidden aspect-[4/3] bg-forest-100">
          {visual}
        </div>
      </div>

      <div className="px-7 pt-8 flex-1 flex flex-col">
        <h1 className="font-serif text-[26px] leading-snug text-ink">{title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{description}</p>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step - 1 ? "w-6 bg-forest-500" : "w-1.5 bg-forest-200"
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="w-full bg-forest-500 hover:bg-forest-600 text-cream-50 rounded-full py-3.5 font-medium text-[15px] mb-6 transition-colors"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
