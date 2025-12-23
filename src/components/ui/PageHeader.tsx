import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  icon: LucideIcon;
  label: string;
  title: string;
  highlightWord?: string;
  action?: ReactNode;
}

export const PageHeader = ({
  icon: Icon,
  label,
  title,
  highlightWord,
  action,
}: PageHeaderProps) => {
  const renderTitle = () => {
    if (!highlightWord) {
      return <span className="text-foreground">{title}</span>;
    }

    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="gold-gradient-text">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-8 flex items-start justify-between"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-gold" />
          <span className="text-xs font-heading font-semibold uppercase tracking-widest text-gold">
            {label}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold">
          {renderTitle()}
        </h1>
      </div>
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default PageHeader;
