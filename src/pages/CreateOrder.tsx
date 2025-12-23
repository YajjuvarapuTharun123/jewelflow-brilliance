import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, User, Diamond, ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const purityOptions = ["24K", "22K", "18K"];

const CreateOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    productName: "",
    material: "",
    purity: "",
    weight: "",
    quantity: "1",
    deadline: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Reset purity when material changes
    if (field === "material" && value !== "Gold") {
      setFormData((prev) => ({ ...prev, purity: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Created",
      description: "Manifest initialization successful. Order has been queued for production.",
    });
    navigate("/orders");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        icon={Plus}
        label="Manifest Initialization"
        title="Create New Order"
        highlightWord="Order"
        action={
          <button
            onClick={() => navigate("/orders")}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        }
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Client Details */}
          <GlassCard delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                <User className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Client Details
                </h2>
                <p className="text-xs text-muted-foreground">
                  Customer information
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  placeholder="Enter client name"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                  placeholder="client@example.com"
                  className="form-input"
                />
              </div>
            </div>
          </GlassCard>

          {/* Artifact Specification */}
          <GlassCard delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                <Diamond className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Artifact Specification
                </h2>
                <p className="text-xs text-muted-foreground">
                  Product configuration
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange("productName", e.target.value)}
                  placeholder="e.g., Diamond Necklace, Wedding Ring"
                  className="form-input"
                  required
                />
              </div>

              {/* Material Selection */}
              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Material *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Gold", "Silver"].map((material) => (
                    <button
                      key={material}
                      type="button"
                      onClick={() => handleInputChange("material", material)}
                      className={cn(
                        "p-4 rounded-lg border transition-all duration-200 text-center",
                        formData.material === material
                          ? "bg-gold text-primary-foreground border-gold shadow-lg shadow-gold/30"
                          : "bg-transparent border-gold/30 text-muted-foreground hover:border-gold hover:text-foreground"
                      )}
                    >
                      <span className="font-heading font-semibold text-sm uppercase tracking-wider">
                        {material}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Purity Selection - Only for Gold */}
              {formData.material === "Gold" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Purity *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {purityOptions.map((purity) => (
                      <button
                        key={purity}
                        type="button"
                        onClick={() => handleInputChange("purity", purity)}
                        className={cn(
                          "p-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2",
                          formData.purity === purity
                            ? "bg-gold text-primary-foreground border-gold shadow-lg shadow-gold/30"
                            : "bg-transparent border-gold/30 text-muted-foreground hover:border-gold hover:text-foreground"
                        )}
                      >
                        {formData.purity === purity && <Check className="w-4 h-4" />}
                        <span className="font-heading font-semibold text-sm uppercase tracking-wider">
                          {purity}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Weight (grams) *
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="0.00"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="1"
                    className="form-input"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Notes Section */}
        <GlassCard delay={0.3} className="mt-8">
          <label className="block text-xs font-heading font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Special Instructions
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Enter any special requirements, design specifications, or notes for the artisans..."
            rows={4}
            className="form-input resize-none"
          />
        </GlassCard>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center justify-end gap-4"
        >
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Initialize Manifest</span>
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default CreateOrder;
