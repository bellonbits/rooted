import { ChevronLeft, Heart, BookOpen, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const notifications = [
  {
    icon: Heart,
    text: "Sarah Jenkins replied to your prayer request",
    time: "18m ago",
  },
  {
    icon: BookOpen,
    text: "New Weekly Devotional available: 'Sabbath Rest'",
    time: "2h ago",
  },
  {
    icon: MessageSquare,
    text: "Your post 'Screen time balance' received 5 likes",
    time: "5h ago",
  },
  {
    icon: BookOpen,
    text: "Pastor Thomas posted a new audio study",
    time: "1d ago",
  },
];

export default function Notifications() {
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
        <h1 className="font-serif text-[16px] text-ink">Notifications</h1>
        <button className="text-[12px] text-forest-600 font-medium">Mark all read</button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 divide-y divide-cream-200">
        {notifications.map((n) => (
          <div key={n.text} className="flex items-start gap-3 py-4">
            <div className="w-9 h-9 shrink-0 rounded-full bg-forest-100 flex items-center justify-center text-forest-600">
              <n.icon size={16} />
            </div>
            <div className="flex-1">
              <p className="text-[13.5px] text-ink leading-snug">{n.text}</p>
              <p className="text-[11.5px] text-ink/40 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
