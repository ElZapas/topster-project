/**
 * @file AlbumSlot.tsx
 * @description Componente que representa un espacio para un álbum en una cuadrícula.
 * 
 * Este componente permite arrastrar y soltar álbumes en un espacio específico de la cuadrícula.
 */

/**
 * @imports 
 * - useState: Hook de React para manejar el estado local del componente.
 */
import { useState } from "react";

/**
 * @imports
 * - useLastFmUserAlbums: Hook personalizado para obtener álbumes de un usuario de LastFM.
 */
import { useLastFmUserAlbums } from "../../../hooks/useLastFmSearch";

/**
 * @imports
 * - Album: Tipo de datos que representa un álbum.
 */
import { Album } from "../../../types/album";

/**
 * @type Period
 * @description Tipo que representa los períodos disponibles para la consulta de álbumes.
 */
type Period = "7day" | "1month" | "6month" | "12month" | "overall";

/**
 * @interface ImportLastFmTabProps
 * @description Propiedades del componente ImportLastFmTab.
 */
interface ImportLastFmTabProps {
  /**
   * @property setAlbums
   * @description Función para actualizar el estado de los álbumes.
   */
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
}

/**
 * @function ImportLastFmTab
 * @description Componente que permite importar álbumes desde LastFM.
 * 
 * Este componente incluye un campo de entrada para el nombre de usuario de LastFM y un botón para importar álbumes.
 * Muestra un mensaje de error si la importación falla.
 * 
 * @param {ImportLastFmTabProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente ImportLastFmTab.
 */
export const ImportLastFmTab = ({ setAlbums }: ImportLastFmTabProps) => {

  /**
   * @constant {string} username - Nombre de usuario de LastFM.
   */
  const [username, setUsername] = useState("");

  /**
   * @constant {Period} period - Período seleccionado para la consulta de álbumes.
   */
  const [period, setPeriod] = useState<Period>("overall");

  /**
   * @constant loading - Estado de carga de la importación.
   * @constant error - Mensaje de error si la importación falla.
   * @constant fetchUserAlbums - Función para obtener álbumes de LastFM.
   * @description Hook personalizado para obtener álbumes de un usuario de LastFM.
   */
  const { loading, error, fetchUserAlbums } = useLastFmUserAlbums();

  /**
   * @function handleImport
   * @description Función que maneja la importación de álbumes desde LastFM.
   * 
   * Esta función se ejecuta al hacer clic en el botón de importar álbumes.
   * Si el nombre de usuario no está vacío, llama a la función fetchUserAlbums para obtener los álbumes.
   */
  const handleImport = async () => {
    if (username.trim() === "") return;
    const albums = await fetchUserAlbums(username, period);
    setAlbums(albums);
  };

  /**
   * @returns {JSX.Element} Componente ImportLastFmTab.
   * 
   * Renderiza un campo de entrada para el nombre de usuario de LastFM, un botón para importar álbumes y un mensaje de error si la importación falla.
   */
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white">Importar álbumes desde LastFM</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ingresa tu usuario de LastFM"
        className="p-2 rounded bg-neutral-800 text-white outline-none"
      />
      
      <label className="text-white">
        Periodo:
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="ml-2 p-2 rounded bg-neutral-800 text-white outline-none"
        >
          <option value="7day">Última semana</option>
          <option value="1month">Último mes</option>
          <option value="6month">Últimos 6 meses</option>
          <option value="12month">Último año</option>
          <option value="overall">Todos los tiempos</option>
        </select>
      </label>
      
      <button
        onClick={handleImport}
        className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Importando..." : "Importar álbumes"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImportLastFmTab;

