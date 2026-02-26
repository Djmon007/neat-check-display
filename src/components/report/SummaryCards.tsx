import { ReportData } from "@/data/mockReport";
import { CheckCircle, AlertTriangle, XCircle, Camera, Clock, Package } from "lucide-react";

interface Props {
  data: ReportData;
}

const statusConfig = {
  ready: { label: "Ready", icon: CheckCircle, colorClass: "bg-status-ready-bg text-status-ready border-status-ready/20" },
  exceptions: { label: "Ready with Exceptions", icon: AlertTriangle, colorClass: "bg-status-warning-bg text-status-warning border-status-warning/20" },
  "not-ready": { label: "Not Ready", icon: XCircle, colorClass: "bg-status-critical-bg text-status-critical border-status-critical/20" },
};

const SummaryCards = ({ data }: Props) => {
  const s = statusConfig[data.status];
  const StatusIcon = s.icon;
  const pct = Math.round((data.checklist.completed / data.checklist.total) * 100);

  const cards = [
    {
      label: "Overall Status",
      value: s.label,
      icon: <StatusIcon className="w-5 h-5" />,
      className: s.colorClass,
    },
    {
      label: "Checklist",
      value: `${data.checklist.completed}/${data.checklist.total}`,
      sub: `${pct}% complete`,
      icon: <CheckCircle className="w-5 h-5" />,
      className: pct === 100
        ? "bg-status-ready-bg text-status-ready border-status-ready/20"
        : "bg-status-warning-bg text-status-warning border-status-warning/20",
    },
    {
      label: "Issues Logged",
      value: `${data.issueCount.total}`,
      sub: data.issueCount.urgent > 0 ? `${data.issueCount.urgent} urgent` : "None urgent",
      icon: <AlertTriangle className="w-5 h-5" />,
      className: data.issueCount.urgent > 0
        ? "bg-status-critical-bg text-status-critical border-status-critical/20"
        : "bg-status-warning-bg text-status-warning border-status-warning/20",
    },
    {
      label: "Photos",
      value: `${data.photosUploaded}`,
      sub: "uploaded",
      icon: <Camera className="w-5 h-5" />,
      className: "bg-status-info-bg text-status-info border-status-info/20",
    },
    {
      label: "Time on Site",
      value: data.timeOnSite,
      icon: <Clock className="w-5 h-5" />,
      className: "bg-secondary text-secondary-foreground border-border",
    },
    {
      label: "Supplies",
      value: data.suppliesRestocked ? "Restocked" : "Pending",
      icon: <Package className="w-5 h-5" />,
      className: data.suppliesRestocked
        ? "bg-status-ready-bg text-status-ready border-status-ready/20"
        : "bg-status-warning-bg text-status-warning border-status-warning/20",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`report-card rounded-lg border p-4 ${card.className}`}
          >
            <div className="flex items-center gap-2 mb-2 opacity-80">
              {card.icon}
              <span className="text-xs font-medium uppercase tracking-wide">{card.label}</span>
            </div>
            <div className="text-xl font-bold leading-tight">{card.value}</div>
            {card.sub && <div className="text-xs mt-0.5 opacity-70">{card.sub}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SummaryCards;
