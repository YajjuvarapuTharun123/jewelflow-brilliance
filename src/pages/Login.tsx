import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Diamond, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard on login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--bg-deep))] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gold Orbs */}
      <div className="gold-orb w-[500px] h-[500px] -top-40 -left-40 opacity-20" />
      <div className="gold-orb w-[600px] h-[600px] -bottom-60 -right-40 opacity-15" />
      <div className="gold-orb w-[300px] h-[300px] top-1/2 left-1/3 opacity-10" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8 md:p-10 relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="relative inline-block mb-4">
            <Diamond className="w-14 h-14 text-gold animate-float" />
            <div className="absolute inset-0 bg-gold/30 blur-2xl rounded-full" />
          </div>
          <h1 className="font-serif text-4xl gold-gradient-text font-bold">
            JewelFlow
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-body">
            Luxury Manufacturing ERP
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                  focusedField === "email" ? "text-gold" : "text-muted-foreground"
                )}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your email"
                className="form-input pl-12"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                  focusedField === "password" ? "text-gold" : "text-muted-foreground"
                )}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                className="form-input pl-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-right"
          >
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-gold transition-colors font-heading"
            >
              Forgot Password?
            </a>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            type="submit"
            className="btn-primary w-full py-4"
          >
            Sign In
          </motion.button>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Precision craftsmanship meets digital excellence
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
