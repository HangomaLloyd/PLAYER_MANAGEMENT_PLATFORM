import { Users, ArrowRightLeft, Trophy, AlertTriangle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import PlayerRoster from "@/components/PlayerRoster";
import RecentActivity from "@/components/RecentActivity";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-gray-50 flex">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-16 bg-gradient-to-b from-primary to-success rounded-full"></div>
              <div>
                <h1 className="text-5xl font-bold text-foreground mb-3 tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-lg font-medium">Welcome back, John. Here's what's happening with your club today.</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <StatsCard
              title="Total Players"
              value="156"
              subtitle="12 new registrations this month"
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="Active Transfers"
              value="8"
              subtitle="3 pending approval from FAZ"
              icon={ArrowRightLeft}
              color="green"
            />
            <StatsCard
              title="Matches Played"
              value="24"
              subtitle="18 wins, 4 draws, 2 losses"
              icon={Trophy}
              color="orange"
            />
            <StatsCard
              title="Disciplinary Actions"
              value="5"
              subtitle="2 active bans under review"
              icon={AlertTriangle}
              color="red"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <PlayerRoster />
            </div>
            <div className="space-y-8">
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
