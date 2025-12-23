import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, Check, Upload, Clock, ChevronRight, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  orderNo: string;
  product: string;
  client: string;
  material: string;
  weight: string;
  stage: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

const mockTasks: Task[] = [
  {
    id: "1",
    orderNo: "JF-2024-001",
    product: "Diamond Necklace",
    client: "Royal Jewellers",
    material: "Gold 22K",
    weight: "45g",
    stage: "Polish",
    dueDate: "2024-01-20",
    priority: "high",
  },
  {
    id: "2",
    orderNo: "JF-2024-003",
    product: "Temple Bangles",
    client: "Divine Ornaments",
    material: "Gold 22K",
    weight: "120g",
    stage: "Casting",
    dueDate: "2024-01-22",
    priority: "medium",
  },
  {
    id: "3",
    orderNo: "JF-2024-006",
    product: "Pearl Earrings",
    client: "Ocean Gems",
    material: "Gold 18K",
    weight: "12g",
    stage: "Setting",
    dueDate: "2024-01-25",
    priority: "low",
  },
];

const stages = [
  "Design",
  "Casting",
  "Filing",
  "Polish",
  "Setting",
  "QC",
  "Final",
  "Delivery",
];

const WorkerDashboard = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteTask = () => {
    if (!uploadedImage) {
      toast({
        title: "Image Required",
        description: "Please upload an image of the completed work before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsCompleting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Task Completed",
        description: `${selectedTask?.orderNo} has been moved to the next stage.`,
      });
      setSelectedTask(null);
      setUploadedImage(null);
      setIsCompleting(false);
    }, 1500);
  };

  const getNextStage = (currentStage: string) => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      return stages[currentIndex + 1];
    }
    return "Complete";
  };

  const priorityColors = {
    high: "border-red-500/50 bg-red-500/10",
    medium: "border-amber-500/50 bg-amber-500/10",
    low: "border-emerald-500/50 bg-emerald-500/10",
  };

  return (
    <div className="space-y-8">
      <PageHeader
        icon={Hammer}
        label="Artisan Workspace"
        title="My Tasks"
        highlightWord="Tasks"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-heading font-semibold uppercase tracking-widest text-gold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Tasks
          </h2>

          <div className="space-y-4">
            {mockTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard
                  hover
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedTask?.id === task.id && "ring-2 ring-gold shadow-gold"
                  )}
                >
                  <div
                    onClick={() => setSelectedTask(task)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-2 h-12 rounded-full",
                          task.priority === "high" && "bg-red-500",
                          task.priority === "medium" && "bg-amber-500",
                          task.priority === "low" && "bg-emerald-500"
                        )}
                      />
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-heading font-semibold text-gold">
                            {task.orderNo}
                          </span>
                          <span className="badge-gold text-[10px]">{task.stage}</span>
                        </div>
                        <p className="text-sm text-foreground font-body">
                          {task.product}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {task.client} · {task.material} · {task.weight}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="text-sm font-heading font-semibold text-foreground">
                          {new Date(task.dueDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Task Detail Panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedTask ? (
              <motion.div
                key={selectedTask.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="sticky top-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading font-bold text-xl text-gold">
                          {selectedTask.orderNo}
                        </span>
                        <StatusBadge status="in_progress" />
                      </div>
                      <p className="text-lg font-serif font-semibold text-foreground">
                        {selectedTask.product}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTask.client}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-gold/5 border border-gold/10">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Material
                        </p>
                        <p className="text-sm font-heading font-semibold text-foreground">
                          {selectedTask.material}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gold/5 border border-gold/10">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Weight
                        </p>
                        <p className="text-sm font-heading font-semibold text-foreground">
                          {selectedTask.weight}
                        </p>
                      </div>
                    </div>

                    {/* Stage Progress */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Current Stage
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="badge-gold">{selectedTask.stage}</span>
                        <ChevronRight className="w-4 h-4 text-gold" />
                        <span className="text-sm text-muted-foreground">
                          {getNextStage(selectedTask.stage)}
                        </span>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Upload Completion Image
                      </p>
                      <label
                        className={cn(
                          "flex flex-col items-center justify-center w-full h-40 rounded-lg border-2 border-dashed cursor-pointer transition-all",
                          uploadedImage
                            ? "border-gold/50 bg-gold/5"
                            : "border-gold/20 hover:border-gold/40 hover:bg-gold/5"
                        )}
                      >
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <ImageIcon className="w-10 h-10 text-gold/50 mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Click to upload image
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Complete Button */}
                    <button
                      onClick={handleCompleteTask}
                      disabled={isCompleting}
                      className={cn(
                        "btn-primary w-full flex items-center justify-center gap-2",
                        isCompleting && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isCompleting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Complete Task</span>
                        </>
                      )}
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard className="text-center py-12">
                  <Hammer className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                  <p className="text-muted-foreground font-body">
                    Select a task to view details
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
