import { AlbumCard } from "./AlbumCard";
import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";

interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year?: string;
}

interface PlaylistSectionProps {
  title: string;
  albums: Album[];
}

export const PlaylistSection = ({ title, albums }: PlaylistSectionProps) => {
  const handlePlay = (album: Album) => {
    console.log("Playing album:", album.title);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onPlay={handlePlay}
          />
        ))}
      </div>
    </section>
  );
};

// Default albums data
export const defaultAlbums: Album[] = [
  {
    id: "1",
    title: "Electronic Dreams",
    artist: "Stellar Sounds",
    artwork: album1,
    year: "2024"
  },
  {
    id: "2",
    title: "Vintage Vibes",
    artist: "Retro Collective",
    artwork: album2,
    year: "2023"
  },
  {
    id: "3",
    title: "Jazz Nights",
    artist: "Smooth Ensemble",
    artwork: album3,
    year: "2024"
  },
  {
    id: "4",
    title: "Electronic Dreams",
    artist: "Future Bass",
    artwork: album1,
    year: "2024"
  },
  {
    id: "5",
    title: "Acoustic Sessions",
    artist: "Indie Folk",
    artwork: album2,
    year: "2023"
  },
  {
    id: "6",
    title: "Midnight Jazz",
    artist: "Cool Cats",
    artwork: album3,
    year: "2024"
  }
];