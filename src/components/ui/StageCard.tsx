import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface StageCardProps {
  name: string;
  count: number;
  total: number;
  color?: string;
  delay?: number;
}

export const StageCard = ({
  name,
  count,
  total,
  delay = 0,
}: StageCardProps) => {
  const progress = total > 0 ? (count / total) * 100 : 0;

  return (
    <GlassCard delay={delay} className="text-center">
      <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        {name}
      </h3>
      <motion.p
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring" }}
        className="font-serif text-3xl font-bold text-foreground mb-4"
      >
        {count}
      </motion.p>
      
      {/* Progress Bar */}
      <div className="h-1.5 bg-gold/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gold-gradient rounded-full"
        />
      </div>
    </GlassCard>
  );
};

export default StageCard;
