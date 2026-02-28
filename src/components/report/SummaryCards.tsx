import { ReportData } from "@/data/mockReport";
import { CheckCircle, AlertTriangle, AlertCircle, Camera, Image } from "lucide-react";

interface Props {
  data: ReportData;
}

const SummaryCards = ({ data }: Props) => {
  const pct = Math.round((data.checklist.completed / data.checklist.total) * 100);

  const stats = [
    {
      icon: <CheckCircle className="w-5 h-5 text-status-ready" />,
      value: data.checklist.completed,
      sub: <span className="text-muted-foreground text-[10px] uppercase">/ {data.checklist.total}</span>,
      label: "Completed",
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-status-warning" />,
      value: data.issueCount.total,
      label: "Issues",
      accent: true,
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-status-critical" />,
      value: data.issueCount.urgent,
      label: "Urgent",
      accent: data.issueCount.urgent > 0,
    },
    {
      icon: <Camera className="w-5 h-5 text-muted-foreground" />,
      value: data.photosUploaded,
      label: "Photos",
    },
    {
      icon: <Image className="w-5 h-5 text-muted-foreground" />,
      value: data.beforeAfterPairs,
      label: "B/A Pairs",
    },
  ];

  return (
    <section className="report-card border border-report-section-border rounded-lg p-4">
      <div className="flex flex-wrap items-center gap-6 md:gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            {s.icon}
            <div className="leading-tight">
              <div className="text-xl font-bold text-foreground">
                {s.value} {s.sub}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{s.label}</div>
            </div>
          </div>
        ))}

        {/* Progress bar */}
        <div className="flex-1 min-w-[160px] ml-auto">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Checklist Progress</span>
            <span className="font-semibold text-foreground">{pct}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-status-ready rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
