import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";

export default function Onboarding3() {
  const navigate = useNavigate();
  return (
    <OnboardingLayout
      step={3}
      totalSteps={3}
      title="A Faith-Filled Community"
      description="Join supportive forums, share prayer requests on the wall, and exchange rich, faith-inspired resources with parents who share your values."
      ctaLabel="Get Started"
      onNext={() => navigate("/signup")}
      visual={
        <div className="w-full h-full bg-gradient-to-br from-forest-100 to-cream-200 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none">
            <rect width="320" height="240" fill="#E1E6D8" />
            <circle cx="110" cy="90" r="20" fill="#B98249" />
            <circle cx="160" cy="80" r="24" fill="#4B5B3F" />
            <circle cx="212" cy="92" r="18" fill="#869B63" />
            <path d="M80 170c8-30 26-46 80-46s72 16 80 46" stroke="#A4B48A" strokeWidth="3" fill="none" />
          </svg>
        </div>
      }
    />
  );
}
