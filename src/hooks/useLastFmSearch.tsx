import { useState } from "react";
import { Album } from "../types/album";
import { API_KEY, API_URL } from "../config/env";
import { LastFmUserAlbumsResponse } from "../types/api";

const MOCK_MODE = true;

export const useLastFmUserAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserAlbums = async (username: string): Promise<Album[]> => {
    setLoading(true);
    setError(null);

    try {
      let data: LastFmUserAlbumsResponse;

      if (MOCK_MODE) {
        data = await import("../mocks/lastfm-mock.json") as unknown as LastFmUserAlbumsResponse;
      } else {
        const response = await fetch(`${API_URL}?method=user.gettopalbums&user=${encodeURIComponent(username)}&api_key=${API_KEY}&format=json`);
        if (!response.ok) throw new Error("Error buscando álbumes del usuario.");
        data = await response.json();
      }

      const parsedAlbums: Album[] = data.topalbums.album.map((album) => ({
        name: album.name,
        artist: album.artist.name,
        imageUrl: album.image.find((img) => img.size === "large")?.["#text"] || ""
      }));

      setAlbums(parsedAlbums);
      return parsedAlbums;

    } catch (err) {
      console.error("Error fetching user albums:", err);
      setError("No se pudieron cargar los álbumes.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { albums, loading, error, fetchUserAlbums };
};

export default useLastFmUserAlbums;