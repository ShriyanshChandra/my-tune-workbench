import { SearchBar } from "@/components/SearchBar";
import { PlaylistSection, defaultAlbums } from "@/components/PlaylistSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import heroBackground from "@/assets/hero-bg.jpg";

const Index = () => {
  const featuredAlbums = defaultAlbums.slice(0, 3);
  const popularAlbums = defaultAlbums.slice(2, 6);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="gradient-hero absolute inset-0"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Music Universe
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover millions of songs, create playlists, and immerse yourself in the ultimate music streaming experience.
          </p>
          <SearchBar placeholder="What do you want to listen to?" />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Featured Albums */}
        <PlaylistSection
          title="Featured Albums"
          albums={featuredAlbums}
        />

        {/* Popular This Week */}
        <PlaylistSection
          title="Popular This Week"
          albums={popularAlbums}
        />

        {/* Recently Played */}
        <PlaylistSection
          title="Recently Played"
          albums={defaultAlbums}
        />
      </main>

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Index;