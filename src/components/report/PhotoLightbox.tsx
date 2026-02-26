import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

interface Props {
  photos: string[];
  alt: string;
}

const PhotoLightbox = ({ photos, alt }: Props) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {photos.map((src, i) => (
          <button
            key={i}
            className="relative group rounded-lg overflow-hidden border border-border w-20 h-20 md:w-24 md:h-24 shrink-0 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => setLightboxSrc(src.replace("w=800", "w=2400").replace("h=600", "h=1800"))}
          >
            <img
              src={src}
              alt={`${alt} photo ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
              <ZoomIn className="w-5 h-5 text-card opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4 no-print"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 text-card hover:text-card/80 transition-colors"
            onClick={() => setLightboxSrc(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxSrc}
            alt={alt}
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default PhotoLightbox;
