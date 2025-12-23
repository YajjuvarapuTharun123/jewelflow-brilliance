import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, Plus, Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import FilterPill from "@/components/ui/FilterPill";
import DataTable from "@/components/ui/DataTable";
import StatusBadge from "@/components/ui/StatusBadge";

interface Order {
  id: string;
  orderNo: string;
  client: string;
  product: string;
  material: string;
  purity: string;
  weight: string;
  stage: string;
  status: string;
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNo: "JF-2024-001",
    client: "Royal Jewellers",
    product: "Diamond Necklace",
    material: "Gold",
    purity: "22K",
    weight: "45g",
    stage: "Polish",
    status: "in_progress",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    orderNo: "JF-2024-002",
    client: "Heritage Gold",
    product: "Wedding Ring Set",
    material: "Gold",
    purity: "24K",
    weight: "15g",
    stage: "Setting",
    status: "in_progress",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    orderNo: "JF-2024-003",
    client: "Divine Ornaments",
    product: "Temple Bangles",
    material: "Gold",
    purity: "22K",
    weight: "120g",
    stage: "Casting",
    status: "pending",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    orderNo: "JF-2024-004",
    client: "Platinum Plus",
    product: "Silver Anklet",
    material: "Silver",
    purity: "925",
    weight: "35g",
    stage: "QC",
    status: "in_progress",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    orderNo: "JF-2024-005",
    client: "Classic Gems",
    product: "Emerald Pendant",
    material: "Gold",
    purity: "18K",
    weight: "8g",
    stage: "Delivery",
    status: "completed",
    createdAt: "2024-01-11",
  },
];

const filters = ["All", "Design", "Casting", "Filing", "Polish", "Setting", "QC", "Final", "Delivery"];

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || order.stage === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      key: "orderNo",
      header: "Manifest Identity",
      render: (order: Order) => (
        <span className="font-heading font-semibold text-gold">{order.orderNo}</span>
      ),
    },
    {
      key: "product",
      header: "Artifact Specification",
      render: (order: Order) => (
        <div>
          <p className="font-body text-foreground">{order.product}</p>
          <p className="text-xs text-muted-foreground">{order.client}</p>
        </div>
      ),
    },
    {
      key: "material",
      header: "Material",
      render: (order: Order) => (
        <div>
          <p className="font-body text-foreground">{order.material}</p>
          <p className="text-xs text-muted-foreground">{order.purity} · {order.weight}</p>
        </div>
      ),
    },
    {
      key: "stage",
      header: "Artisan Depth",
      render: (order: Order) => <span className="badge-gold">{order.stage}</span>,
    },
    {
      key: "status",
      header: "Protocol Status",
      render: (order: Order) => <StatusBadge status={order.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (order: Order) => (
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gold/10 transition-colors group">
            <Eye className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gold/10 transition-colors group">
            <Edit className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        icon={Package}
        label="Inventory Hub"
        title="Order Manifest"
        highlightWord="Manifest"
        action={
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/create-order")}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Order</span>
          </motion.button>
        }
      />

      {/* Filter Bar */}
      <GlassCard delay={0.1}>
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="form-input pl-12 w-full"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <FilterPill
                key={filter}
                label={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredOrders}
          onRowClick={(order) => setSelectedOrder(order.id)}
          selectedId={selectedOrder ?? undefined}
        />
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <p>
          Showing <span className="text-gold font-semibold">{filteredOrders.length}</span> of{" "}
          <span className="text-gold font-semibold">{mockOrders.length}</span> orders
        </p>
      </motion.div>
    </div>
  );
};

export default Orders;
