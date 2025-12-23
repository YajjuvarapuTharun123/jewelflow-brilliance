import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const FilterPill = ({ label, active = false, onClick }: FilterPillProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-200",
        active
          ? "bg-gold text-primary-foreground shadow-lg shadow-gold/30"
          : "bg-transparent border border-gold/30 text-muted-foreground hover:border-gold hover:text-gold"
      )}
    >
      {label}
    </button>
  );
};

export default FilterPill;
