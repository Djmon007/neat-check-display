import { Issue } from "@/data/mockReport";
import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PhotoLightbox from "./PhotoLightbox";

interface Props {
  issues: Issue[];
}

const priorityConfig = {
  urgent: { label: "Urgent", icon: AlertTriangle, dotClass: "bg-status-critical", badgeClass: "bg-status-critical-bg text-status-critical" },
  normal: { label: "Normal", icon: AlertCircle, dotClass: "bg-status-warning", badgeClass: "bg-status-warning-bg text-status-warning" },
  fyi: { label: "FYI", icon: Info, dotClass: "bg-status-info", badgeClass: "bg-status-info-bg text-status-info" },
};

const statusBadge = {
  new: "bg-status-warning-bg text-status-warning",
  acknowledged: "bg-status-info-bg text-status-info",
  resolved: "bg-status-ready-bg text-status-ready",
};

const IssuesSection = ({ issues }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(issues[0]?.id || null);

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-status-warning" />
        Exceptions & Issues
        <span className="text-sm font-normal text-muted-foreground">({issues.length})</span>
      </h2>

      {/* Compact table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-report-section-border text-left">
              <th className="py-2 pr-3 font-medium text-muted-foreground">Priority</th>
              <th className="py-2 pr-3 font-medium text-muted-foreground">Category</th>
              <th className="py-2 pr-3 font-medium text-muted-foreground">Location</th>
              <th className="py-2 pr-3 font-medium text-muted-foreground">Description</th>
              <th className="py-2 pr-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => {
              const p = priorityConfig[issue.priority];
              return (
                <tr
                  key={issue.id}
                  className="border-b border-report-section-border cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedId(expandedId === issue.id ? null : issue.id)}
                >
                  <td className="py-2.5 pr-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${p.badgeClass}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.dotClass}`} />
                      {p.label}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-foreground">{issue.category}</td>
                  <td className="py-2.5 pr-3 text-foreground font-medium">{issue.location}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground max-w-[240px] truncate">{issue.description}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusBadge[issue.status]}`}>
                      {issue.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail cards */}
      <div className="space-y-3">
        {issues.map((issue) => {
          const isOpen = expandedId === issue.id;
          const p = priorityConfig[issue.priority];
          return (
            <div
              key={issue.id}
              className="report-card border border-report-section-border rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(isOpen ? null : issue.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${p.dotClass}`} />
                  <span className="font-semibold text-foreground">
                    {issue.location} — {issue.linkedTask}
                  </span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-report-section-border pt-4">
                  <p className="text-sm text-foreground mb-3">{issue.description}</p>
                  {issue.photos.length > 0 && (
                    <div className="mb-3">
                      <PhotoLightbox photos={issue.photos} alt={issue.linkedTask} />
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Suggested Action:</span>
                      <p className="font-medium text-foreground">{issue.suggestedAction}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Recommendation:</span>
                      <p className="font-medium text-foreground">{issue.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IssuesSection;
