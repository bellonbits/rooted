import { useState } from "react";
import { Settings as SettingsIcon, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const stats = [
  { label: "Discussions", value: "14" },
  { label: "Prayers Raised", value: "89" },
  { label: "Saved Articles", value: "32" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"posts" | "saved">("posts");

  return (
    <div className="app-shell bg-cream-50 flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        <div className="flex items-center justify-end px-5 pt-5">
          <button
            onClick={() => navigate("/settings")}
            className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center text-ink/60"
          >
            <SettingsIcon size={16} />
          </button>
        </div>

        <div className="flex flex-col items-center px-5 -mt-2">
          <div className="w-20 h-20 rounded-full bg-forest-200 flex items-center justify-center font-serif text-2xl text-forest-700 mb-3">
            SJ
          </div>
          <h1 className="font-serif text-[19px] text-ink">Sarah Jenkins</h1>
          <p className="text-[13px] text-ink/50 mt-1">
            Mother of two beautiful kids · Joined Jan 2025
          </p>
          <button className="mt-3 border border-cream-300 rounded-full px-5 py-1.5 text-[13px] font-medium text-ink/70">
            Edit Profile
          </button>
        </div>

        <div className="flex justify-around mx-5 mt-6 bg-cream-100 rounded-xl2 py-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-2">
              <p className="font-serif text-[18px] text-ink">{s.value}</p>
              <p className="text-[11px] text-ink/45 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-6 px-5 mt-6 border-b border-cream-300">
          <button
            onClick={() => setTab("posts")}
            className={`pb-2.5 text-[13.5px] font-medium border-b-2 -mb-px ${
              tab === "posts" ? "border-forest-500 text-ink" : "border-transparent text-ink/40"
            }`}
          >
            My Posts
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`pb-2.5 text-[13.5px] font-medium border-b-2 -mb-px ${
              tab === "saved" ? "border-forest-500 text-ink" : "border-transparent text-ink/40"
            }`}
          >
            Saved List
          </button>
        </div>

        <div className="px-5 mt-4">
          {tab === "posts" ? (
            <button
              onClick={() => navigate("/community/article")}
              className="w-full text-left bg-cream-100 rounded-xl2 p-4"
            >
              <p className="text-[11.5px] text-ink/40 mb-1.5">
                Posted 3 days ago in Toddlers
              </p>
              <p className="text-[14px] text-ink leading-snug">
                What are some good Christian bedtime books that kids will love?
              </p>
              <span className="flex items-center gap-1 mt-2 text-[12px] text-ink/40">
                <MessageSquare size={13} /> 4 replies
              </span>
            </button>
          ) : (
            <p className="text-[13.5px] text-ink/45 text-center py-8">
              Articles you save will appear here.
            </p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
