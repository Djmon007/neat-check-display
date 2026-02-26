import { Room } from "@/data/mockReport";
import { Camera } from "lucide-react";
import PhotoLightbox from "./PhotoLightbox";

interface Props {
  rooms: Room[];
}

const BeforeAfterGallery = ({ rooms }: Props) => {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-primary" />
        Before & After Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div
            key={room.name}
            className="report-card border border-report-section-border rounded-lg overflow-hidden"
          >
            <div className="bg-report-room-header px-4 py-2.5 font-semibold text-sm text-foreground flex items-center gap-2">
              <span>{room.icon}</span>
              {room.name}
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">Before</div>
                  <PhotoLightbox photos={[room.beforePhoto]} alt={`${room.name} before`} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">After</div>
                  <PhotoLightbox photos={[room.afterPhoto]} alt={`${room.name} after`} />
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground mt-2">
                {room.photoTimestamp} · {room.photographer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
