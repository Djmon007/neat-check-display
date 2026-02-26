import { mockReport } from "@/data/mockReport";
import ReportHeader from "@/components/report/ReportHeader";
import SummaryCards from "@/components/report/SummaryCards";
import IssuesSection from "@/components/report/IssuesSection";
import BeforeAfterGallery from "@/components/report/BeforeAfterGallery";
import ChecklistSection from "@/components/report/ChecklistSection";
import SuppliesSection from "@/components/report/SuppliesSection";
import SignOffSection from "@/components/report/SignOffSection";
import { Printer } from "lucide-react";

const Index = () => {
  const data = mockReport;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-6">
        <ReportHeader data={data} />
        <SummaryCards data={data} />
        <IssuesSection issues={data.issues} />
        <BeforeAfterGallery rooms={data.rooms} />
        <ChecklistSection rooms={data.rooms} />
        <SuppliesSection supplies={data.supplies} />
        <SignOffSection signOff={data.signOff} />

        {/* Print button */}
        <div className="flex justify-center py-4 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>

        <footer className="text-center text-xs text-muted-foreground pb-8">
          Report ID: {data.workOrderId} · Generated {data.generatedAt} · This report is a permanent record.
        </footer>
      </div>
    </div>
  );
};

export default Index;
