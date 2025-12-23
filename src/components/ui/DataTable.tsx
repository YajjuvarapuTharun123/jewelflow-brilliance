import { ReactNode } from "react";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  selectedId?: string | number;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  selectedId,
}: DataTableProps<T>) {
  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="luxury-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedId === item.id && [
                    "bg-gold/10",
                    "border-l-2 border-gold",
                    "shadow-lg shadow-gold/10",
                  ]
                )}
              >
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

export default DataTable;
