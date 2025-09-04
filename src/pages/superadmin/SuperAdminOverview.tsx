import { useState, useEffect } from "react";
import { TrendingUp, Users, UserCheck, Clock, ArrowRightLeft } from "lucide-react";

const API_BASE_URL = "/api";

export default function SuperAdminOverview() {
  const [metrics, setMetrics] = useState([
    { icon: TrendingUp, label: "Total Registered Clubs", value: 0, change: "Loading..." },
    { icon: Users, label: "Total Registered Players", value: 0, change: "Loading..." },
    { icon: UserCheck, label: "Pending Club Registrations", value: 0, change: "Loading..." },
    { icon: ArrowRightLeft, label: "Pending Transfer Requests", value: 0, change: "Loading..." },
  ]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch data from multiple endpoints
        const [playersRes, transfersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/players`),
          fetch(`${API_BASE_URL}/transfers`)
        ]);

        if (!playersRes.ok || !transfersRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const players = await playersRes.json();
        const transfers = await transfersRes.json();

        // Calculate metrics
        const totalPlayers = players.length;
        const pendingTransfers = transfers.filter((t: any) => t.status === 'Pending').length;

        // For now, use placeholder values for clubs since we don't have a clubs endpoint
        const totalClubs = 48; // This would come from a clubs API
        const pendingClubs = 3; // This would come from a clubs API

        setMetrics([
          { icon: TrendingUp, label: "Total Registered Clubs", value: totalClubs, change: "+4%" },
          { icon: Users, label: "Total Registered Players", value: totalPlayers, change: "+2%" },
          { icon: UserCheck, label: "Pending Club Registrations", value: pendingClubs, change: "-1" },
          { icon: ArrowRightLeft, label: "Pending Transfer Requests", value: pendingTransfers, change: "+1" },
        ]);

        // Generate activities from recent transfers
        const recentActivities = transfers.slice(0, 6).map((transfer: any) => ({
          action: transfer.status === 'Pending' ? "Transfer Request Submitted" : `Transfer ${transfer.status}`,
          entity: transfer.player?.name || "Unknown Player",
          time: new Date(transfer.requestDate).toLocaleString()
        }));

        setActivities(recentActivities);

      } catch (err) {
        setError("Failed to load overview data");
        console.error("Error fetching overview data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading overview data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-destructive mb-4 text-lg">⚠️ Error loading data</div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Super Admin Overview</h1>
        <p className="text-muted-foreground">System-wide statistics and recent activities</p>
      </header>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="mb-4 flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <m.icon size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{m.label}</p>
                <p className="text-2xl font-bold text-foreground">{m.value}</p>
              </div>
            </div>
            <div className="text-success text-sm font-medium">{m.change}</div>
            {/* Sparkline placeholder */}
            <div className="w-full h-2 bg-muted rounded mt-3">
              <div className="h-2 bg-primary rounded" style={{ width: "60%" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recent Activities</h2>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.slice(0, 7).map((a, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <span className="font-medium text-primary">{a.action}</span>
                  <span className="text-muted-foreground ml-2">{a.entity}</span>
                </div>
                <span className="text-muted-foreground text-sm">{a.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No recent activities</p>
        )}
      </div>
    </div>
  );
}
