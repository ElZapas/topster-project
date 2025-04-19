/**
 * @file useAlbumSearch.tsx
 * @description Hook para buscar álbumes utilizando la API de Last.fm.
 *
 * Este hook permite realizar búsquedas de álbumes y gestiona el estado de la búsqueda,
 * incluyendo los resultados, el estado de carga y los posibles errores.
 */

/**
 * @imports
 * - React: Importa los hooks useState de React.
 */
import { useState } from "react";

/**
 * @imports
 * - API_URL y API_KEY: Importa las constantes de configuración de la API.
 */
import { API_URL, API_KEY } from "../config/env";

/**
 * @imports
 * - Album: Importa el tipo Album que representa la estructura de un álbum.
 */
import { Album } from "../types/album";

/**
 * @imports
 * - LastFmSearchResponse: Importa el tipo LastFmSearchResponse que representa la respuesta de la API de Last.fm.
 */
import { LastFmSearchResponse } from "../types/api";

/**
 * Uso de MOCK_MODE para simular respuestas de la API.
 * Si es verdadero, se utilizará un archivo JSON simulado en lugar de realizar una solicitud a la API real.
 */
const MOCK_MODE = false;

/**
 * @function useAlbumSearch
 * @description Hook para buscar álbumes utilizando la API de Last.fm.
 *
 * @returns {Object} Un objeto que contiene:
 * - albums: Lista de álbumes encontrados.
 * - loading: Estado de carga de la búsqueda.
 * - error: Mensaje de error si ocurre algún problema.
 * - searchAlbums: Función para realizar la búsqueda de álbumes.
 */
export const useAlbumSearch = () => {
  /**
   * @state albums
   * @description Estado que almacena la lista de álbumes encontrados.
   */
  const [albums, setAlbums] = useState<Album[]>([]);

  /**
   * @state loading
   * @description Estado que indica si la búsqueda está en curso.
   */
  const [loading, setLoading] = useState(false);

  /**
   * @state error
   * @description Estado que almacena el mensaje de error si ocurre algún problema.
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * @function searchAlbums
   * @description Función para buscar álbumes utilizando la API de Last.fm.
   *
   * @param {string} query - La consulta de búsqueda para los álbumes.
   */
  const searchAlbums = async (query: string) => {
    // Validar la consulta de búsqueda
    setLoading(true);

    // Si la consulta está vacía, no se realiza la búsqueda
    setError(null);

    /**
     * Usando un try-catch para manejar errores en la búsqueda de álbumes.
     */
    try {
      // Si MOCK_MODE es verdadero, se importa un archivo JSON simulado.
      let data: LastFmSearchResponse;
      if (MOCK_MODE) {
        data = (await import(
          "../mocks/lastfm-mock.json"
        )) as unknown as LastFmSearchResponse;
      } else {
        // Si es falso, se realiza una solicitud a la API de Last.fm.
        const response = await fetch(
          `${API_URL}?method=album.search&album=${encodeURIComponent(
            query
          )}&api_key=${API_KEY}&format=json`
        );
        if (!response.ok) throw new Error("Error buscando álbumes");
        data = (await response.json()) as LastFmSearchResponse;
      }

      /**
       * Mapeo de los álbumes obtenidos de la respuesta de la API.
       * Se extraen los campos necesarios y se asigna un ID único a cada álbum.
       */
      const mappedAlbums = data.results.albummatches.album.map((album) => ({
        id: crypto.randomUUID(), // Generar un ID único para cada álbum
        name: album.name, // Nombre del álbum
        artist: album.artist, // Artista del álbum
        imageUrl:
          album.image.find((img) => img.size === "large")?.["#text"] || "", // URL de la imagen del álbum
      }));

      /**
       * Actualización del estado de los álbumes con los datos mapeados.
       */
      setAlbums(mappedAlbums);

      /**
       * Manejo de errores en la búsqueda de álbumes.
       */
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return { albums, loading, error, searchAlbums };
};
