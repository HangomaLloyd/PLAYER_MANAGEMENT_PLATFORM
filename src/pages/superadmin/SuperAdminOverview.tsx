import { TrendingUp, Users, UserCheck, Clock, ArrowRightLeft } from "lucide-react";

export default function SuperAdminOverview() {
  // Placeholder data for metrics and activities
  const metrics = [
    { icon: TrendingUp, label: "Total Registered Clubs", value: 48, change: "+4%" },
    { icon: Users, label: "Total Registered Players", value: 1200, change: "+2%" },
    { icon: UserCheck, label: "Pending Club Registrations", value: 3, change: "-1" },
    { icon: ArrowRightLeft, label: "Pending Transfer Requests", value: 7, change: "+1" },
  ];
  const activities = [
    { action: "Club Registration Approved", entity: "Green Buffaloes FC", time: "2m ago" },
    { action: "Transfer Request Submitted", entity: "John Banda", time: "10m ago" },
    { action: "Player Suspension Applied", entity: "Mike Zulu", time: "30m ago" },
    { action: "Club Registration Denied", entity: "Red Arrows FC", time: "1h ago" },
    { action: "Transfer Request Approved", entity: "Peter Phiri", time: "2h ago" },
    { action: "Player Ban Lifted", entity: "James Mwale", time: "3h ago" },
  ];

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-gray-800 rounded-xl p-6 flex flex-col items-start shadow-lg">
            <div className="mb-2 flex items-center gap-2">
              <m.icon size={28} className="text-blue-400" />
              <span className="text-lg font-semibold">{m.label}</span>
            </div>
            <div className="text-4xl font-bold mb-1">{m.value}</div>
            <div className="text-green-400 text-sm">{m.change}</div>
            {/* Sparkline placeholder */}
            <div className="w-full h-2 bg-blue-900 rounded mt-2">
              <div className="h-2 bg-blue-400 rounded" style={{ width: "60%" }} />
            </div>
          </div>
        ))}
      </div>
      {/* Recent Activities */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <ul className="divide-y divide-gray-700">
          {activities.slice(0, 7).map((a, i) => (
            <li key={i} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-medium text-blue-300">{a.action}</span> <span className="text-gray-300">{a.entity}</span>
              </div>
              <span className="text-gray-400 text-xs">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
