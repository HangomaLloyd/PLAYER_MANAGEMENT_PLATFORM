import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  ArrowRightLeft, 
  Trophy, 
  FileText,
  Settings,
  Goal,
  Sun,
  Moon,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// The paths have been updated to include '/dashboard' to match the new routing in App.tsx
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", path: "/dashboard" },
  { icon: Users, label: "Players", id: "players", path: "/dashboard/players" },
  { icon: ArrowRightLeft, label: "Transfers", id: "transfers", path: "/dashboard/transfers" },
  { icon: Trophy, label: "Matches", id: "matches", path: "/dashboard/matches" },
  { icon: FileText, label: "Reports", id: "reports", path: "/dashboard/reports" },
  { icon: Settings, label: "Settings", id: "settings", path: "/dashboard/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [clubData, setClubData] = useState(null); // State to hold club data

  // Load theme preference and club data from local storage on initial render
  useEffect(() => {
    // Load theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Load club data
    const savedClubData = localStorage.getItem("clubData");
    if (savedClubData) {
      setClubData(JSON.parse(savedClubData));
    }
  }, []);

  // Handle theme toggle and update local storage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("clubData"); // Clear club data on logout
    navigate("/auth");
  };

  return (
    <div className="w-64 bg-sidebar-background min-h-screen p-6 shadow-xl flex flex-col justify-between">
      <div>
        {/* Header - Now shows Club Logo and Name */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {clubData && clubData.logo ? (
              // Display club logo if available
              <img
                src={clubData.logo.startsWith('/') ? clubData.logo : `/lovable-uploads/${clubData.logo}`}
                alt={`${clubData.name} Logo`}
                className="w-12 h-12 rounded-full object-cover border-2 border-sidebar-primary"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            ) : clubData && clubData.name ? (
              // Fallback to initials if no logo but club name exists
              <div className="w-12 h-12 bg-sidebar-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-sidebar-primary-foreground">
                  {clubData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            ) : (
              // Fallback to FAZ Goal icon
              <div className="w-12 h-12 bg-sidebar-primary rounded-full flex items-center justify-center shadow-lg">
                <Goal className="text-sidebar-primary-foreground" size={24} />
              </div>
            )}
            <div>
              <h1 className="text-sidebar-foreground font-bold text-xl">
                {clubData ? `FAZ Portal - ${clubData.name}` : "FAZ Portal"}
              </h1>
            
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
            // We now use location.pathname.startsWith() to correctly highlight the active link
            // For example, both '/dashboard/players' and '/dashboard/players/123' will highlight the Players link
            const isActive = location.pathname.startsWith(item.path);
            
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
      
      {/* Footer with Theme Toggle and Logout */}
      <div className="mt-8 pt-4 border-t border-sidebar-foreground/10 space-y-2">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-300"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );


}
