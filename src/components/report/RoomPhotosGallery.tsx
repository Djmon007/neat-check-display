import { Room } from "@/data/mockReport";
import { Camera, Download } from "lucide-react";
import PhotoLightbox from "./PhotoLightbox";

interface Props {
  rooms: Room[];
}

const downloadPhoto = (url: string, filename: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const RoomPhotosGallery = ({ rooms }: Props) => {
  const allPhotos = rooms.flatMap((r) => r.photos);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          Room Photos
          <span className="text-sm font-normal text-muted-foreground">({allPhotos.length} photos)</span>
        </h2>
        <button
          className="no-print inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          onClick={() => allPhotos.forEach((p, i) => downloadPhoto(p.fullRes, `photo-${i + 1}.jpg`))}
        >
          <Download className="w-3.5 h-3.5" />
          Download All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.filter((r) => r.photos.length > 0).map((room) => (
          <div
            key={room.name}
            className="report-card border border-report-section-border rounded-lg overflow-hidden"
          >
            <div className="bg-report-room-header px-4 py-2.5 flex items-center justify-between">
              <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                <span>{room.icon}</span>
                {room.name}
              </div>
              <button
                className="no-print inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => room.photos.forEach((p, i) => downloadPhoto(p.fullRes, `${room.name.toLowerCase().replace(/\s/g, "-")}-${i + 1}.jpg`))}
              >
                <Download className="w-3 h-3" />
                Download Room
              </button>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap gap-2">
                {room.photos.map((photo, i) => (
                  <div key={i} className="relative group">
                    <PhotoLightbox photos={[photo.src]} alt={`${room.name} - ${photo.caption}`} />
                    <button
                      className="no-print absolute bottom-1 right-1 bg-foreground/70 text-background p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPhoto(photo.fullRes, `${room.name.toLowerCase().replace(/\s/g, "-")}-${i + 1}.jpg`);
                      }}
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-muted-foreground mt-2">
                {room.photos[0]?.timestamp} · {room.photos[0]?.photographer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomPhotosGallery;
