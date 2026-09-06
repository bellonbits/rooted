import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";

export default function Onboarding2() {
  const navigate = useNavigate();
  return (
    <OnboardingLayout
      step={2}
      totalSteps={3}
      title="Daily Devotionals"
      description="Receive daily scripture, parenting wisdom, and curated prayer prompts designed to weave faith naturally into the beautiful chaos of daily family life."
      ctaLabel="Next"
      onNext={() => navigate("/onboarding/3")}
      visual={
        <div className="w-full h-full bg-gradient-to-br from-cream-200 to-forest-100 flex items-center justify-center p-8">
          <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none">
            <rect width="320" height="240" fill="#EFE7D3" />
            <path d="M70 70h180l-14 110H84L70 70z" fill="#F7F2E7" stroke="#C3CDB1" />
            <line x1="160" y1="70" x2="160" y2="180" stroke="#C3CDB1" />
            <line x1="90" y1="95" x2="140" y2="95" stroke="#A4B48A" strokeWidth="3" />
            <line x1="90" y1="112" x2="130" y2="112" stroke="#A4B48A" strokeWidth="3" />
            <line x1="90" y1="129" x2="135" y2="129" stroke="#A4B48A" strokeWidth="3" />
            <line x1="180" y1="95" x2="230" y2="95" stroke="#A4B48A" strokeWidth="3" />
            <line x1="180" y1="112" x2="220" y2="112" stroke="#A4B48A" strokeWidth="3" />
            <line x1="180" y1="129" x2="225" y2="129" stroke="#A4B48A" strokeWidth="3" />
          </svg>
        </div>
      }
    />
  );
}
