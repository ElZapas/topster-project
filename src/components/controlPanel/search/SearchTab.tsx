// src/components/tabs/SearchTab.tsx
import { useState } from "react";
import { SearchBar } from "../../ui/SearchBar";
import { useAlbumSearch } from "../../../hooks/useAlbumSearch";
import { SearchResultsGrid } from "../search/SearchResultsGrid";
import { GridConfig } from "../../../types/GridConfig";

export const SearchTab = () => {
  const [query, setQuery] = useState("");
  const { albums, loading, error, searchAlbums } = useAlbumSearch();
  const gridConfig: GridConfig = {
    columns: 2,
    gap: 1,
    backgroundColor: "#1a1a1a",
    textcolor: "#ffffff",
  };

  const handleSearch = async () => {
    if (query.trim() !== "") {
      await searchAlbums(query);
    }
  };

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      {loading && <p className="text-white">Buscando álbumes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {albums.length > 0 && (
        <SearchResultsGrid albums={albums} config={gridConfig} />
      )}
    </div>
  );
};

export default SearchTab;
