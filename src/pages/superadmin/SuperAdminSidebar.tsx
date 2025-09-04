import { LayoutDashboard, Users, ArrowRightLeft, Trophy, FileText, ShieldCheck, LogOut, Sun, Moon } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/superadmin" },
  { icon: Users, label: "Clubs", path: "/superadmin/clubs" },
  { icon: ShieldCheck, label: "Players", path: "/superadmin/players" },
  { icon: ArrowRightLeft, label: "Transfers & Bans", path: "/superadmin/transfers-bans" },
  { icon: Trophy, label: "Fixtures & Matches", path: "/superadmin/fixtures" },
  { icon: FileText, label: "Reports", path: "/superadmin/reports" },
];

export default function SuperAdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

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
    navigate("/auth");
  };

  return (
    <div className="w-64 bg-sidebar-background min-h-screen p-6 flex flex-col justify-between shadow-xl">
      <div>
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-sidebar-primary rounded-full flex items-center justify-center shadow-lg">
            <ShieldCheck size={28} className="text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-sidebar-foreground">FAZ Super Admin</h1>
            <p className="text-sidebar-foreground/70 text-sm font-medium">Super Admin Panel</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="space-y-2">
          <div className="text-sidebar-foreground/60 text-xs font-semibold uppercase tracking-wider mb-4">
            Main Menu
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 no-underline ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg transform scale-105"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:transform hover:translate-x-1"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      {/* Footer */}
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
