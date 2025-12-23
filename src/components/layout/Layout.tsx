import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  userRole?: string;
}

export const Layout = ({ userRole = "PRODUCTION ADMIN" }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-deep))] flex w-full">
      <Sidebar userRole={userRole} onLogout={handleLogout} />
      
      <main
        className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-8"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="gold-orb w-96 h-96 top-1/4 right-0 opacity-10" />
        <div className="gold-orb w-64 h-64 bottom-1/4 left-1/3 opacity-5" />
      </div>
    </div>
  );
};

export default Layout;
