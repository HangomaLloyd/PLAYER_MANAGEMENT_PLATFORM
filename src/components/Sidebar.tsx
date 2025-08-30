import { 
  LayoutDashboard, 
  Users, 
  ArrowRightLeft, 
  Trophy, 
  FileText,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem?: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Players", id: "players" },
  { icon: ArrowRightLeft, label: "Transfers", id: "transfers" },
  { icon: Trophy, label: "Matches", id: "matches" },
  { icon: FileText, label: "Reports", id: "reports" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function Sidebar({ activeItem = "dashboard" }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-800 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">FAZ Portal</h1>
            <p className="text-slate-400 text-sm">Club Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}