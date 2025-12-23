import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import KPICard from "@/components/ui/KPICard";
import StageCard from "@/components/ui/StageCard";
import GlassCard from "@/components/ui/GlassCard";

const stages = [
  { name: "Design", count: 12, total: 50 },
  { name: "Casting", count: 8, total: 50 },
  { name: "Filing", count: 15, total: 50 },
  { name: "Polish", count: 6, total: 50 },
  { name: "Setting", count: 10, total: 50 },
  { name: "QC", count: 4, total: 50 },
  { name: "Final", count: 3, total: 50 },
  { name: "Delivery", count: 2, total: 50 },
];

const recentActivity = [
  { id: 1, order: "ORD-2024-001", action: "Completed Polishing", time: "5 min ago" },
  { id: 2, order: "ORD-2024-002", action: "Moved to QC", time: "12 min ago" },
  { id: 3, order: "ORD-2024-003", action: "New Order Created", time: "25 min ago" },
  { id: 4, order: "ORD-2024-004", action: "Casting Approved", time: "1 hour ago" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        icon={LayoutDashboard}
        label="System Overview"
        title="Command Center"
        highlightWord="Command"
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          icon={Package}
          value="156"
          label="Active Orders"
          trend={{ value: 12, positive: true }}
          delay={0}
        />
        <KPICard
          icon={DollarSign}
          value="₹24.5L"
          label="Revenue MTD"
          trend={{ value: 8, positive: true }}
          delay={0.1}
        />
        <KPICard
          icon={TrendingUp}
          value="94%"
          label="On-Time Delivery"
          trend={{ value: 3, positive: true }}
          delay={0.2}
        />
        <KPICard
          icon={Users}
          value="28"
          label="Active Workers"
          delay={0.3}
        />
      </div>

      {/* Pipeline Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gold" />
          <span>Production Pipeline</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {stages.map((stage, index) => (
            <StageCard
              key={stage.name}
              name={stage.name}
              count={stage.count}
              total={stage.total}
              delay={0.5 + index * 0.05}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <GlassCard delay={0.6}>
          <h3 className="text-sm font-heading font-semibold uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b border-gold/10 last:border-0"
              >
                <div>
                  <p className="text-sm font-body text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.order}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <GlassCard delay={0.7}>
          <h3 className="text-sm font-heading font-semibold uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Alerts & Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <div>
                <p className="text-sm font-body text-foreground">
                  5 orders completed today
                </p>
                <p className="text-xs text-muted-foreground">
                  Ahead of schedule by 2 orders
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <div>
                <p className="text-sm font-body text-foreground">
                  3 orders pending QC approval
                </p>
                <p className="text-xs text-muted-foreground">
                  Requires immediate attention
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gold/10 border border-gold/20">
              <Package className="w-6 h-6 text-gold" />
              <div>
                <p className="text-sm font-body text-foreground">
                  8 new orders received
                </p>
                <p className="text-xs text-muted-foreground">
                  Awaiting production assignment
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
