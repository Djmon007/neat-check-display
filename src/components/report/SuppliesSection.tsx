import { Supply } from "@/data/mockReport";
import { Package } from "lucide-react";

interface Props {
  supplies: Supply[];
}

const statusStyle = {
  restocked: "text-status-ready",
  low: "text-status-warning",
  out: "text-status-critical",
};

const statusLabel = {
  restocked: "Restocked",
  low: "Low Stock",
  out: "Out of Stock",
};

const SuppliesSection = ({ supplies }: Props) => {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" />
        Supplies & Inventory
      </h2>
      <div className="report-card border border-report-section-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-report-room-header border-b border-report-section-border">
              <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Item</th>
              <th className="text-center py-2.5 px-4 font-medium text-muted-foreground">Qty</th>
              <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((s, i) => (
              <tr
                key={s.item}
                className={i < supplies.length - 1 ? "border-b border-report-section-border" : ""}
              >
                <td className="py-2 px-4 text-foreground">{s.item}</td>
                <td className="py-2 px-4 text-center text-foreground font-medium">{s.quantity}</td>
                <td className={`py-2 px-4 font-medium ${statusStyle[s.status]}`}>
                  {statusLabel[s.status]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SuppliesSection;
