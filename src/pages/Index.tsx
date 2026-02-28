import { mockReport } from "@/data/mockReport";
import ReportHeader from "@/components/report/ReportHeader";
import SummaryCards from "@/components/report/SummaryCards";
import IssuesSection from "@/components/report/IssuesSection";
import RoomPhotosGallery from "@/components/report/RoomPhotosGallery";
import ChecklistSection from "@/components/report/ChecklistSection";
import SuppliesSection from "@/components/report/SuppliesSection";
import SignOffSection from "@/components/report/SignOffSection";

const Index = () => {
  const data = mockReport;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-5">
        <ReportHeader data={data} />
        <SummaryCards data={data} />

        {/* Two-column layout: main content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <IssuesSection issues={data.issues} />
            <RoomPhotosGallery rooms={data.rooms} />
            <ChecklistSection rooms={data.rooms} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <SuppliesSection supplies={data.supplies} />
            <SignOffSection signOff={data.signOff} auditLog={data.auditLog} />
          </div>
        </div>

        <footer className="text-center text-xs text-muted-foreground pb-8 pt-4">
          Report ID: {data.workOrderId} · Generated {data.generatedAt} · This report is a permanent record.
        </footer>
      </div>
    </div>
  );
};

export default Index;
