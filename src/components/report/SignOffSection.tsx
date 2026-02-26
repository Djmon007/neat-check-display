import { SignOff } from "@/data/mockReport";
import { ShieldCheck, Clock, User, CheckSquare } from "lucide-react";

interface Props {
  signOff: SignOff;
}

const SignOffSection = ({ signOff }: Props) => {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        Sign-Off & Audit Trail
      </h2>
      <div className="report-card border border-report-section-border rounded-lg p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Completed By</div>
              <div className="font-semibold text-foreground">{signOff.completedBy}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Verified By</div>
              <div className="font-semibold text-foreground">{signOff.verifiedBy}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Work Window</div>
              <div className="font-semibold text-foreground">{signOff.startTime} — {signOff.endTime}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckSquare className="w-4 h-4 text-status-ready mt-0.5" />
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Confirmation</div>
              <div className="font-semibold text-status-ready">
                {signOff.confirmed ? "✓ Tasks completed to standard" : "Pending confirmation"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignOffSection;
