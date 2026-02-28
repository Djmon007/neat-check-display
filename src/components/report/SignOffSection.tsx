import { SignOff, AuditEntry } from "@/data/mockReport";
import { ShieldCheck } from "lucide-react";

interface Props {
  signOff: SignOff;
  auditLog: AuditEntry[];
}

const SignOffSection = ({ signOff, auditLog }: Props) => {
  return (
    <div className="space-y-4">
      {/* Digital signature card */}
      <div className="report-card border border-report-section-border rounded-lg p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {signOff.completedBy.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="font-bold text-foreground">{signOff.completedBy}</div>
            <div className="text-xs text-muted-foreground">{signOff.role}</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-status-ready-bg text-status-ready rounded-full text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          ✓ Digitally signed · {signOff.signedAt}
        </div>
      </div>

      {/* Audit log */}
      <div className="report-card border border-report-section-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-report-section-border">
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">Audit Log</h3>
        </div>
        <div className="divide-y divide-report-section-border">
          {auditLog.map((entry, i) => (
            <div key={i} className="flex gap-4 px-4 py-2.5 text-sm">
              <span className="text-muted-foreground font-mono text-xs w-16 shrink-0 pt-0.5">{entry.time}</span>
              <span className="text-foreground">{entry.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignOffSection;
