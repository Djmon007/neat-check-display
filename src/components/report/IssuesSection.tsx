import { Issue } from "@/data/mockReport";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { useState } from "react";
import PhotoLightbox from "./PhotoLightbox";

interface Props {
  issues: Issue[];
}

const priorityConfig = {
  urgent: { label: "URGENT", dotClass: "bg-status-critical", badgeClass: "bg-status-critical text-primary-foreground" },
  normal: { label: "Normal", dotClass: "bg-status-warning", badgeClass: "bg-status-warning-bg text-status-warning" },
  fyi: { label: "FYI", dotClass: "bg-status-info", badgeClass: "bg-status-info-bg text-status-info" },
};

const IssuesSection = ({ issues }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(issues[0]?.id || null);

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-status-warning" />
        Exceptions & Issues
        <span className="ml-1 text-xs font-medium px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning">
          {issues.length} logged
        </span>
      </h2>

      <div className="space-y-3">
        {issues.map((issue) => {
          const p = priorityConfig[issue.priority];
          const isOpen = expandedId === issue.id;
          return (
            <div
              key={issue.id}
              className="report-card border border-report-section-border rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-4 text-left hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(isOpen ? null : issue.id)}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${p.badgeClass} shrink-0 mt-0.5`}>
                    {p.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground">
                      {issue.location} — {issue.linkedTask}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{issue.description}</p>
                  </div>
                  {issue.photos.length > 0 && (
                    <div className="shrink-0 hidden sm:block">
                      <PhotoLightbox photos={issue.photos} alt={issue.linkedTask} />
                    </div>
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-report-section-border pt-3 space-y-3">
                  {/* Mobile photos */}
                  {issue.photos.length > 0 && (
                    <div className="sm:hidden">
                      <PhotoLightbox photos={issue.photos} alt={issue.linkedTask} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {issue.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-status-warning font-medium">⚡ Suggested:</span>{" "}
                    <span className="text-foreground">{issue.suggestedAction}</span>
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
