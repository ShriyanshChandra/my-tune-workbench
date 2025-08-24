import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year?: string;
}

interface AlbumCardProps {
  album: Album;
  onPlay?: (album: Album) => void;
}

export const AlbumCard = ({ album, onPlay }: AlbumCardProps) => {
  return (
    <div className="group relative">
      <div className="gradient-card p-4 rounded-xl music-hover border border-border/50">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <img
            src={album.artwork}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="lg"
              onClick={() => onPlay?.(album)}
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
            >
              <Play className="w-5 h-5 ml-0.5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {album.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {album.artist}
          </p>
          {album.year && (
            <p className="text-xs text-muted-foreground">
              {album.year}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};