import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface KPICardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  delay?: number;
}

export const KPICard = ({ icon: Icon, value, label, trend, delay = 0 }: KPICardProps) => {
  return (
    <GlassCard delay={delay} className="relative overflow-hidden">
      {/* Background Icon */}
      <Icon className="absolute -right-4 -bottom-4 w-24 h-24 text-gold/5" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
            <Icon className="w-6 h-6 text-gold" />
          </div>
          {trend && (
            <span
              className={cn(
                "text-xs font-heading font-semibold px-2 py-1 rounded",
                trend.positive
                  ? "text-emerald-400 bg-emerald-400/10"
                  : "text-red-400 bg-red-400/10"
              )}
            >
              {trend.positive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
        >
          <p className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">
            {value}
          </p>
          <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
        </motion.div>
      </div>
    </GlassCard>
  );
};

export default KPICard;
