import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Search for songs, artists, or albums...", onSearch }: SearchBarProps) => {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 transition-colors"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
};