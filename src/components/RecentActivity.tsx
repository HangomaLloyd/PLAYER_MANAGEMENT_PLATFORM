import { Clock, UserCheck, ArrowRightLeft, AlertTriangle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "registration",
    message: "Moses Banda registered successfully",
    time: "2 hours ago",
    icon: UserCheck,
    color: "text-success bg-success/10"
  },
  {
    id: 2,
    type: "transfer",
    message: "Transfer request submitted for John Phiri",
    time: "5 hours ago",
    icon: ArrowRightLeft,
    color: "text-primary bg-primary/10"
  },
  {
    id: 3,
    type: "disciplinary",
    message: "Patrick Mulenga received disciplinary action",
    time: "1 day ago",
    icon: AlertTriangle,
    color: "text-destructive bg-destructive/10"
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-card rounded-2xl shadow-2xl border border-gray-200/50 p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-success flex items-center justify-center">
          <Clock size={16} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
      </div>
      
      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div 
              key={activity.id} 
              className="flex items-start gap-5 p-4 rounded-xl hover:bg-gray-50/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`p-3 rounded-xl ${activity.color} shadow-lg`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground mb-2">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Admin Profile */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">JM</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">John Mwanza</p>
            <p className="text-xs text-muted-foreground font-medium">Club Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}