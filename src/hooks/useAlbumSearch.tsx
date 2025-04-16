import { useState } from "react";
import { API_URL, API_KEY } from "../config/env";
import { Album } from "../types/album";
import { LastFmSearchResponse } from "../types/api";

const MOCK_MODE = true;

export const useAlbumSearch = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAlbums = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      let data: LastFmSearchResponse;
  
      if (MOCK_MODE) {
        data = await import("../mocks/lastfm-mock.json") as unknown as LastFmSearchResponse;
      } else {
        const response = await fetch(`${API_URL}?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json`);
        if (!response.ok) throw new Error("Error buscando álbumes");
        data = await response.json() as LastFmSearchResponse;
      }
  
      const mappedAlbums = data.results.albummatches.album.map((album) => ({
        name: album.name,
        artist: album.artist,
        imageUrl: album.image.find((img) => img.size === "large")?.["#text"] || "",
      }));
  
      setAlbums(mappedAlbums);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  
  return { albums, loading, error, searchAlbums };
};
