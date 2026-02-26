import { ReportData } from "@/data/mockReport";
import { ClipboardCheck, MapPin, Clock, User, FileText } from "lucide-react";

interface Props {
  data: ReportData;
}

const ReportHeader = ({ data }: Props) => {
  return (
    <header className="bg-report-header text-report-header-fg rounded-xl p-6 md:p-8 print:rounded-none print:p-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 opacity-80 text-sm font-medium tracking-wide uppercase">
            <ClipboardCheck className="w-4 h-4" />
            Housekeeping Service Report
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{data.property.name}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-90">
            <span className="font-medium">{data.property.unit}</span>
            <span className="opacity-50">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.property.address}
            </span>
          </div>
        </div>
        <div className="text-sm space-y-1 md:text-right shrink-0">
          <div className="flex items-center gap-1.5 md:justify-end">
            <FileText className="w-3.5 h-3.5 opacity-70" />
            <span className="opacity-70">Work Order:</span>
            <span className="font-semibold">{data.workOrderId}</span>
          </div>
          <div className="flex items-center gap-1.5 md:justify-end">
            <Clock className="w-3.5 h-3.5 opacity-70" />
            <span className="opacity-70">Stay:</span>
            <span>{data.stay.checkout} → {data.stay.readyBy}</span>
          </div>
          <div className="flex items-center gap-1.5 md:justify-end">
            <User className="w-3.5 h-3.5 opacity-70" />
            <span>{data.preparedBy.name}</span>
            <span className="opacity-50">•</span>
            <span className="opacity-80">{data.preparedBy.team}</span>
          </div>
          <div className="opacity-60 text-xs">Generated {data.generatedAt}</div>
        </div>
      </div>
    </header>
  );
};

export default ReportHeader;
