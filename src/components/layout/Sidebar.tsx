import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Plus,
  Users,
  Settings,
  LogOut,
  Diamond,
  ChevronLeft,
  ChevronRight,
  Hammer,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole?: string;
  onLogout?: () => void;
}

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Create Order", url: "/create-order", icon: Plus },
  { title: "Worker Dashboard", url: "/worker", icon: Hammer },
  { title: "Tasks", url: "/tasks", icon: ClipboardList },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const Sidebar = ({ userRole = "PRODUCTION ADMIN", onLogout }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300",
        "bg-[hsl(var(--sidebar-background))] border-r border-gold/20",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-6 flex flex-col items-center border-b border-gold/10">
        <div className="relative mb-3">
          <Diamond className="w-10 h-10 text-gold animate-float" />
          <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h1 className="font-serif text-2xl gold-gradient-text font-bold">
              JewelFlow
            </h1>
            <span className="badge-gold text-[10px] mt-2 inline-block">
              {userRole}
            </span>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    "text-muted-foreground hover:text-foreground",
                    isActive && [
                      "text-gold bg-gradient-to-r from-gold/10 to-transparent",
                      "border-l-[3px] border-gold",
                    ],
                    !isActive && "hover:bg-gold/5",
                    collapsed && "justify-center px-3"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-gold" : "group-hover:text-gold"
                    )}
                  />
                  {!collapsed && (
                    <span className="font-heading text-sm font-medium">
                      {item.title}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gold/10">
        <button
          onClick={onLogout}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200",
            "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center px-3"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && (
            <span className="font-heading text-sm font-medium">Logout</span>
          )}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center justify-center w-full mt-3 py-2 rounded-lg",
            "text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Decorative Gold Glow */}
      <div className="gold-orb w-40 h-40 -bottom-20 -left-20 opacity-30" />
    </motion.aside>
  );
};

export default Sidebar;
