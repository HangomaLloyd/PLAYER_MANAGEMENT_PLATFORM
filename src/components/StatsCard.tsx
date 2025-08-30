import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "red";
}

const colorVariants = {
  blue: "text-accent bg-accent/10 border border-accent/20",
  green: "text-success bg-success/10 border border-success/20",
  orange: "text-warning bg-warning/10 border border-warning/20",
  red: "text-destructive bg-destructive/10 border border-destructive/20",
};

export default function StatsCard({ title, value, subtitle, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="group bg-card rounded-2xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden animate-scale-in">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-semibold mb-3 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">{value}</p>
          <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
        </div>
        
        <div className={`p-5 rounded-2xl ${colorVariants[color]} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          <Icon size={28} className="transition-transform duration-300 group-hover:rotate-12" />
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
    </div>
  );
}