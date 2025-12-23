import { cn } from "@/lib/utils";

type Status = "pending" | "in_progress" | "completed" | "cancelled" | "qc_pass" | "qc_fail";

interface StatusBadgeProps {
  status: Status | string;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-amber-500/10", text: "text-amber-400" },
  in_progress: { bg: "bg-blue-500/10", text: "text-blue-400" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  cancelled: { bg: "bg-red-500/10", text: "text-red-400" },
  qc_pass: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  qc_fail: { bg: "bg-red-500/10", text: "text-red-400" },
  default: { bg: "bg-gold/10", text: "text-gold" },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "_");
  const style = statusStyles[normalizedStatus] || statusStyles.default;

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider",
        style.bg,
        style.text,
        "border",
        style.text.replace("text-", "border-") + "/20"
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
};

export default StatusBadge;
