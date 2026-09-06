import { useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";

export default function Onboarding1() {
  const navigate = useNavigate();
  return (
    <OnboardingLayout
      step={1}
      totalSteps={3}
      title="Welcome to GraceRoots"
      description="A dedicated space for Christian parents. Nurture your children's faith while building a loving, spiritually rooted home alongside an engaged family community."
      ctaLabel="Next"
      onNext={() => navigate("/onboarding/2")}
      visual={
        <div className="w-full h-full bg-gradient-to-br from-forest-100 to-cream-200 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 320 240" fill="none">
            <rect width="320" height="240" fill="#E1E6D8" />
            <rect x="60" y="150" width="200" height="8" rx="4" fill="#A4B48A" />
            <rect x="90" y="60" width="140" height="90" rx="6" fill="#F7F2E7" />
            <circle cx="120" cy="95" r="16" fill="#B98249" />
            <circle cx="160" cy="90" r="14" fill="#4B5B3F" />
            <circle cx="198" cy="97" r="15" fill="#869B63" />
            <rect x="100" y="120" width="120" height="6" rx="3" fill="#C3CDB1" />
          </svg>
        </div>
      }
    />
  );
}
