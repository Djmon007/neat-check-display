import { Room } from "@/data/mockReport";
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, ClipboardList } from "lucide-react";
import { useState } from "react";

interface Props {
  rooms: Room[];
}

const statusIcon = {
  complete: <CheckCircle className="w-4 h-4 text-status-ready shrink-0" />,
  issue: <AlertTriangle className="w-4 h-4 text-status-warning shrink-0" />,
  incomplete: <XCircle className="w-4 h-4 text-status-critical shrink-0" />,
};

const ChecklistSection = ({ rooms }: Props) => {
  const [openRooms, setOpenRooms] = useState<Set<string>>(new Set([rooms[0]?.name]));

  const toggle = (name: string) => {
    setOpenRooms((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <section className="print-break-before">
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-primary" />
        Checklist Results
      </h2>
      <div className="space-y-2">
        {rooms.map((room) => {
          const completed = room.items.filter((i) => i.status === "complete").length;
          const total = room.items.length;
          const isOpen = openRooms.has(room.name);
          const allDone = completed === total;

          return (
            <div
              key={room.name}
              className="report-card border border-report-section-border rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                onClick={() => toggle(room.name)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{room.icon}</span>
                  <span className="font-semibold text-foreground">{room.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    allDone
                      ? "bg-status-ready-bg text-status-ready"
                      : "bg-status-warning-bg text-status-warning"
                  }`}>
                    {completed}/{total} complete
                  </span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {isOpen && (
                <div className="border-t border-report-section-border">
                  {room.items.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-4 py-2.5 text-sm ${
                        i < room.items.length - 1 ? "border-b border-report-section-border" : ""
                      } ${item.status === "issue" ? "bg-status-warning-bg/30" : item.status === "incomplete" ? "bg-status-critical-bg/30" : ""}`}
                    >
                      {statusIcon[item.status]}
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground">{item.name}</div>
                        {item.note && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.issueId && (
                              <span className="text-status-warning font-medium">Issue logged</span>
                            )}
                            {item.issueId && " — "}
                            {item.note}
                          </div>
                        )}
                      </div>
                      {item.completedAt && (
                        <div className="text-[11px] text-muted-foreground shrink-0 text-right">
                          <div>{item.completedAt}</div>
                          <div className="opacity-70">{item.markedBy}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChecklistSection;
