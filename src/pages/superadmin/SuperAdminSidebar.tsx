import { LayoutDashboard, Users, ArrowRightLeft, Trophy, FileText, ShieldCheck, LogOut } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth");
  };

  return (
    <aside className="w-64 bg-gray-950 text-white min-h-screen p-6 flex flex-col justify-between shadow-xl">
      <div>
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl">FAZ Super Admin</h1>
            <p className="text-gray-400 text-sm font-medium">Super Admin Panel</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 no-underline ${
                  isActive
                    ? "bg-blue-700 text-white shadow-lg scale-105"
                    : "text-gray-300 hover:bg-blue-800 hover:text-white hover:translate-x-1"
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
      <div className="mt-8 pt-4 border-t border-gray-700 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
