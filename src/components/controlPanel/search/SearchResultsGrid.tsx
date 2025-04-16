// src/components/ui/SearchResultsGrid.tsx
import { Album } from "../../../types/album";
import { GridConfig } from "../../../types/GridConfig";
import { AlbumGrid } from "../../ui/AlbumGrid";

type SearchResultsGridProps = {
  albums: Album[];
  config: GridConfig;
};

export const SearchResultsGrid = ({ albums, config }: SearchResultsGridProps) => {
  return (
    <div className="mt-4">
    <AlbumGrid
      albums={albums}
      config={config}
      fixedHeight={false}
    />
    </div>
  );
};

export default SearchResultsGrid;

