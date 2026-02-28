import { ReportData } from "@/data/mockReport";
import { ClipboardCheck, Printer, Download, Link2, FileText } from "lucide-react";

interface Props {
  data: ReportData;
}

const statusConfig = {
  ready: { label: "Ready for Guest", className: "bg-status-ready text-primary-foreground" },
  exceptions: { label: "Ready with Exceptions", className: "bg-status-warning text-primary-foreground" },
  "not-ready": { label: "Not Ready", className: "bg-status-critical text-primary-foreground" },
};

const ReportHeader = ({ data }: Props) => {
  const s = statusConfig[data.status];
  const reportUrl = `yoursite.com/reports/${data.workOrderId}`;

  return (
    <>
      <header className="bg-report-header text-report-header-fg rounded-xl p-6 md:p-8 print:rounded-none print:p-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3 opacity-80 text-xs font-medium tracking-widest uppercase">
              <ClipboardCheck className="w-3.5 h-3.5" />
              Housekeeping Service Report
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">{data.property.name}</h1>
            <div className="text-lg md:text-xl font-medium opacity-90">{data.property.unit}</div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${s.className}`}>
              ✓ {s.label}
            </span>
            <div className="text-xs opacity-70 md:text-right space-y-0.5">
              <div>Report # {data.workOrderId}</div>
              <div>Generated {data.generatedAt}</div>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-5 pt-4 border-t border-primary-foreground/20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          <div>
            <div className="opacity-60 uppercase tracking-wider mb-0.5">Checkout</div>
            <div className="font-medium">{data.stay.checkout}</div>
          </div>
          <div>
            <div className="opacity-60 uppercase tracking-wider mb-0.5">Ready By</div>
            <div className="font-medium">{data.stay.readyBy}</div>
          </div>
          <div>
            <div className="opacity-60 uppercase tracking-wider mb-0.5">Housekeeper</div>
            <div className="font-medium">{data.preparedBy.name}</div>
          </div>
          <div>
            <div className="opacity-60 uppercase tracking-wider mb-0.5">Team</div>
            <div className="font-medium">{data.preparedBy.team}</div>
          </div>
          <div>
            <div className="opacity-60 uppercase tracking-wider mb-0.5">Time on Site</div>
            <div className="font-medium">{data.timeOnSite}</div>
          </div>
          <div>
            <div className="opacity-60 uppercase tracking-wider mb-0.5">Address</div>
            <div className="font-medium">{data.property.address}</div>
          </div>
        </div>
      </header>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-3 no-print">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Printer className="w-4 h-4" />
          Print Report
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <FileText className="w-4 h-4" />
          Export PDF
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Download className="w-4 h-4" />
          Download All Photos
        </button>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hidden sm:inline font-mono text-xs bg-muted px-3 py-1.5 rounded-md">{reportUrl}</span>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors">
            <Link2 className="w-3.5 h-3.5" />
            Copy link
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportHeader;
