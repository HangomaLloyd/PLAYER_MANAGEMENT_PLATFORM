import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";

export default function SuperAdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <SuperAdminSidebar />
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
    </div>
  );
}
