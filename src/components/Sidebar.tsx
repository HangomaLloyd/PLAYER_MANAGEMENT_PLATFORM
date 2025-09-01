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
    <div className="w-64 bg-primary min-h-screen p-6 shadow-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg border-2 border-primary-foreground/20">
            <Goal className="text-primary-foreground" size={24} />
          </div>
          <div>
            <h1 className="text-primary-foreground font-bold text-xl">FAZ Portal</h1>
            <p className="text-primary-foreground/70 text-sm font-medium">Football Association</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <div className="text-primary-foreground/60 text-xs font-semibold uppercase tracking-wider mb-4">
          Main Menu
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300",
                isActive 
                  ? "bg-secondary text-primary shadow-lg transform scale-105" 
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:transform hover:translate-x-1"
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