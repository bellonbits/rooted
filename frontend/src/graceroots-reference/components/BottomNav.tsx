import { NavLink } from "react-router-dom";
import { Home, BookOpen, Users, Heart, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/devotionals", label: "Devotionals", icon: BookOpen },
  { to: "/community", label: "Community", icon: Users },
  { to: "/prayer", label: "Prayer", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-cream-50/95 backdrop-blur border-t border-cream-300 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <ul className="flex items-center justify-between">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 text-[11px] transition-colors ${
                  isActive ? "text-forest-600" : "text-ink/40"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span className={isActive ? "font-medium" : ""}>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
