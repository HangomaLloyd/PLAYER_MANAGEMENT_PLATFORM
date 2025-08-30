import { 
  LayoutDashboard, 
  Users, 
  ArrowRightLeft, 
  Trophy, 
  FileText,
  Settings,
  Goal,
  Shield
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
    <div className="w-72 bg-gradient-to-b from-sidebar-background to-sidebar-background/95 min-h-screen p-6 shadow-2xl border-r border-sidebar-border/20 animate-slide-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center shadow-xl animate-float">
              <Shield className="text-white" size={28} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-sidebar-foreground font-bold text-2xl tracking-tight">FAZ Portal</h1>
            <p className="text-sidebar-foreground/70 text-sm font-medium">Football Association of Zambia</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        <div className="text-sidebar-foreground/50 text-xs font-bold uppercase tracking-[0.15em] mb-6 px-2">
          Navigation
        </div>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <div
              key={item.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className={cn(
                  "w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-success text-white shadow-2xl shadow-primary/25 transform scale-105" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground hover:transform hover:translate-x-2"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  isActive 
                    ? "bg-white/20" 
                    : "bg-sidebar-foreground/5 group-hover:bg-primary/10"
                )}>
                  <Icon size={20} />
                </div>
                <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full"></div>
                )}
              </button>
            </div>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="mt-auto pt-8">
        <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-warning/10 border border-secondary/20">
          <p className="text-sidebar-foreground/60 text-xs text-center font-medium">
            © 2024 Football Association of Zambia
          </p>
        </div>
      </div>
    </div>
  );
}