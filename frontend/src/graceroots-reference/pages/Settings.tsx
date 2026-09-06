import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors ${
        on ? "bg-forest-500" : "bg-cream-300"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-cream-50 shadow transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Row({
  label,
  value,
  danger,
  onClick,
}: {
  label: string;
  value?: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3.5 text-left"
    >
      <span className={`text-[14px] ${danger ? "text-red-500" : "text-ink"}`}>{label}</span>
      <span className="flex items-center gap-1.5 text-ink/40">
        {value && <span className="text-[13px]">{value}</span>}
        {!danger && <ChevronRight size={15} />}
      </span>
    </button>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] uppercase tracking-wide text-ink/35 font-medium mt-6 mb-1">
      {children}
    </p>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [daily, setDaily] = useState(true);
  const [community, setCommunity] = useState(false);
  const [prayer, setPrayer] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <header className="flex items-center justify-between px-4 h-14 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-200"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="font-serif text-[16px] text-ink">Settings</h1>
        <div className="w-8" />
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
        <p className="text-[13px] text-ink/50 leading-relaxed -mt-1">
          Manage your GraceRoots profile and privacy preferences.
        </p>

        <SectionLabel>Account Preferences</SectionLabel>
        <div className="divide-y divide-cream-200">
          <Row label="Edit Profile" onClick={() => navigate("/profile")} />
          <Row label="Change Password" />
          <Row label="Linked Accounts" value="Google" />
        </div>

        <SectionLabel>Push Notifications</SectionLabel>
        <div className="divide-y divide-cream-200">
          <div className="flex items-center justify-between py-3.5">
            <span className="text-[14px] text-ink">Daily Devotionals</span>
            <Toggle on={daily} onChange={() => setDaily((v) => !v)} />
          </div>
          <div className="flex items-center justify-between py-3.5">
            <span className="text-[14px] text-ink">Community Activity</span>
            <Toggle on={community} onChange={() => setCommunity((v) => !v)} />
          </div>
          <div className="flex items-center justify-between py-3.5">
            <span className="text-[14px] text-ink">Prayer Requests</span>
            <Toggle on={prayer} onChange={() => setPrayer((v) => !v)} />
          </div>
        </div>

        <SectionLabel>App Preferences</SectionLabel>
        <div className="divide-y divide-cream-200">
          <div className="flex items-center justify-between py-3.5">
            <span className="text-[14px] text-ink">Dark Mode</span>
            <Toggle on={dark} onChange={() => setDark((v) => !v)} />
          </div>
          <Row label="Text Size" value="Medium" />
          <Row label="Language" value="English" />
        </div>

        <SectionLabel>Support & Legals</SectionLabel>
        <div className="divide-y divide-cream-200">
          <Row label="Help Center" />
          <Row label="Feedback & Ideas" />
          <Row label="Terms & Privacy Policy" />
        </div>

        <button
          onClick={() => navigate("/onboarding/1")}
          className="w-full text-left py-4 mt-4 text-[14px] text-red-500 font-medium"
        >
          Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
