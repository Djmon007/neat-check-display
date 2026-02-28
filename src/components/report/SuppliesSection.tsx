import { Supply } from "@/data/mockReport";

interface Props {
  supplies: Supply[];
}

const SuppliesSection = ({ supplies }: Props) => {
  const lowItems = supplies.filter((s) => s.status === "low" || s.status === "out");

  return (
    <div className="report-card border border-report-section-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-report-section-border">
        <h3 className="font-bold text-foreground">Supplies Used</h3>
      </div>
      <div className="divide-y divide-report-section-border">
        {supplies.map((s) => (
          <div key={s.item} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <div>
              <div className="font-medium text-foreground">{s.item}</div>
              <div className="text-xs text-muted-foreground">{s.location}</div>
            </div>
            {s.status === "restocked" ? (
              <span className="font-semibold text-status-ready">+{s.quantity}</span>
            ) : (
              <span className="text-status-warning font-medium flex items-center gap-1">
                ⚠ Low
              </span>
            )}
          </div>
        ))}
      </div>
      {lowItems.length > 0 && (
        <div className="mx-4 mb-3 mt-1 p-3 bg-status-warning-bg rounded-lg text-xs text-status-warning">
          <span className="font-semibold">Owner action needed:</span> Order {lowItems.map((i) => i.item.toLowerCase()).join(", ")}
        </div>
      )}
    </div>
  );
};

export default SuppliesSection;
