import { 
  LayoutDashboard, 
  Users, 
  ArrowRightLeft, 
  Trophy, 
  FileText,
  Settings,
  Goal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", path: "/" },
  { icon: Users, label: "Players", id: "players", path: "/players" },
  { icon: ArrowRightLeft, label: "Transfers", id: "transfers", path: "/transfers" },
  { icon: Trophy, label: "Matches", id: "matches", path: "/matches" },
  { icon: FileText, label: "Reports", id: "reports", path: "/reports" },
  { icon: Settings, label: "Settings", id: "settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="w-64 bg-sidebar-background min-h-screen p-6 shadow-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-sidebar-primary rounded-full flex items-center justify-center shadow-lg">
            <Goal className="text-sidebar-primary-foreground" size={24} />
          </div>
          <div>
            <h1 className="text-sidebar-foreground font-bold text-xl">FAZ Portal</h1>
            <p className="text-sidebar-foreground/70 text-sm font-medium">Football Association</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <div className="text-sidebar-foreground/60 text-xs font-semibold uppercase tracking-wider mb-4">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === "/" && location.pathname === "/");
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 no-underline",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg transform scale-105" 
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:transform hover:translate-x-1"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}