/**
 * @file useAlbumSearch.tsx
 * @description Hook para buscar los álbumes más escuchados por un usuario de LastFM.
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
import { API_KEY, API_URL } from "../config/env";

/**
 * @imports
 * - Album: Importa el tipo Album que representa la estructura de un álbum.
 */
import { Album } from "../types/album";

/**
 * @imports
 * - LastFmSearchResponse: Importa el tipo LastFmSearchResponse que representa la respuesta de la API de Last.fm.
 */
import { LastFmUserAlbumsResponse } from "../types/api";

/**
 * @typedef Period
 * @description Define los períodos disponibles para la consulta a LastFM.
 */
type Period = "7day" | "1month" | "6month" | "12month" | "overall";

/**
 * Uso de MOCK_MODE para simular respuestas de la API.
 * Si es verdadero, se utilizará un archivo JSON simulado en lugar de realizar una solicitud a la API real.
 */
const MOCK_MODE = false;

/**
 * @function useLastFmUserAlbums
 * @description Hook para buscar álbumes de un usuario utilizando la API de Last.fm.
 *
 * @returns {Object} Un objeto que contiene:
 * - albums: Lista de álbumes encontrados.
 * - loading: Estado de carga de la búsqueda.
 * - error: Mensaje de error si ocurre algún problema.
 * - fetchUserAlbums: Función para realizar la búsqueda de álbumes del usuario.
 */
export const useLastFmUserAlbums = () => {
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
   * @function fetchUserAlbums
   * @description Función para buscar álbumes de un usuario en Last.fm.
   *
   * @param {string} username - Nombre de usuario de Last.fm.
   * @param {Period} period - Período de tiempo para filtrar los álbumes.
   * @returns {Promise<Album[]>} Promesa que resuelve con la lista de álbumes encontrados.
   */
  const fetchUserAlbums = async (
    username: string,
    period: Period = "overall"
  ): Promise<Album[]> => {
    
    // Validar la consulta de búsqueda
    setLoading(true);

    // Si la consulta está vacía, no se realiza la búsqueda
    setError(null);

    /**
     * Usando un try-catch para manejar errores en la búsqueda de álbumes.
     * Si ocurre un error, se captura y se establece el mensaje de error en el estado.
     */
    try {
      let data: LastFmUserAlbumsResponse;

      // Si MOCK_MODE es verdadero, se importa un archivo JSON simulado.
      if (MOCK_MODE) {
        data = (await import(
          "../mocks/lastfm-mock.json"
        )) as unknown as LastFmUserAlbumsResponse;
      } else {
        // Si es falso, se realiza una solicitud a la API de Last.fm.
        const response = await fetch(
          `${API_URL}?method=user.gettopalbums&user=${encodeURIComponent(
            username
          )}&api_key=${API_KEY}&format=json&period=${period}`
        );
        if (!response.ok)
          throw new Error("Error buscando álbumes del usuario.");
        data = await response.json();
      }

      /**
       * Mapeo de los álbumes obtenidos de la respuesta de la API.
       * Se utiliza crypto.randomUUID() para generar un ID único para cada álbum.
       */
      const parsedAlbums: Album[] = data.topalbums.album.map((album) => ({
        id: crypto.randomUUID(), // Generar un ID único para cada álbum
        name: album.name, // Nombre del álbum
        artist: album.artist.name, // Artista del álbum
        imageUrl:
          album.image.find((img) => img.size === "large")?.["#text"] || "", // URL de la imagen del álbum
      }));

      /**
       * Actualización del estado de álbumes con los álbumes obtenidos.
       */
      setAlbums(parsedAlbums);

      /**
       * @returns {Album[]} Lista de álbumes encontrados.
       * Esta lista se puede utilizar en otros componentes o funciones.
       */
      return parsedAlbums;

    /**
     * Manejo de errores en la búsqueda de álbumes del usuario.
     */
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
