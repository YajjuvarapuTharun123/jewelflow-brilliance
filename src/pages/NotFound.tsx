import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle, Diamond } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-deep))] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="gold-orb w-[400px] h-[400px] -top-40 -right-40 opacity-15" />
      <div className="gold-orb w-[300px] h-[300px] -bottom-40 -left-40 opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-10 text-center max-w-md relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative inline-block mb-6"
        >
          <Diamond className="w-16 h-16 text-gold animate-float" />
          <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-serif text-6xl gold-gradient-text font-bold mb-4">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <AlertCircle className="w-5 h-5 text-gold" />
            <p className="text-sm font-heading uppercase tracking-widest">
              Route Not Found
            </p>
          </div>
          <p className="text-muted-foreground font-body mb-8">
            The page you're looking for doesn't exist or has been moved to a
            different location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
