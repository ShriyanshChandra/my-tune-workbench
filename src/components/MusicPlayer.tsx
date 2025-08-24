import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  artwork: string;
}

interface MusicPlayerProps {
  currentTrack?: Track;
}

export const MusicPlayer = ({ currentTrack }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([23]);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);

  const defaultTrack: Track = {
    id: "1",
    title: "Cosmic Journey",
    artist: "Stellar Sounds",
    album: "Electronic Dreams",
    duration: "3:42",
    artwork: "/placeholder.svg"
  };

  const track = currentTrack || defaultTrack;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 gradient-player border-t border-border">
      <div className="glass-effect">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Track Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-14 h-14 bg-card rounded-lg flex-shrink-0 overflow-hidden">
              <img 
                src={track.artwork} 
                alt={track.album}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-foreground truncate">{track.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsLiked(!isLiked)}
              className="flex-shrink-0"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="ghost">
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              <Button size="sm" variant="ghost">
                <SkipForward className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost">
                <Repeat className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-muted-foreground">1:23</span>
              <Slider
                value={progress}
                onValueChange={setProgress}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground">{track.duration}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};