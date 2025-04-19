/**
 * @file AlbumSlot.tsx
 * @description Componente que representa un espacio para un álbum en una cuadrícula.
 *
 * Este componente permite arrastrar y soltar álbumes en un espacio específico de la cuadrícula.
 * También maneja la lógica para mostrar un álbum en el espacio y permite eliminarlo si es necesario.
 */

/**
 * @imports
 * - useState: Hook de React para manejar el estado local del componente.
 * - SearchBar: Componente de barra de búsqueda para buscar álbumes.
 * - useAlbumSearch: Hook personalizado para manejar la lógica de búsqueda de álbumes.
 * - SearchResultsGrid: Componente que muestra los resultados de búsqueda en una cuadrícula.
 * - GridConfig: Tipo que representa la configuración de la cuadrícula.
 */
import { useState } from "react";
import { SearchBar } from "../../ui/SearchBar";
import { useAlbumSearch } from "../../../hooks/useAlbumSearch";
import { SearchResultsGrid } from "../search/SearchResultsGrid";
import { GridConfig } from "../../../types/GridConfig";

/**
 * @component SearchTab
 *
 * Este componente representa la pestaña de búsqueda en el panel de control.
 * Permite a los usuarios buscar álbumes y muestra los resultados en una cuadrícula.
 *
 * @returns {JSX.Element} - Elemento JSX que representa la pestaña de búsqueda.
 */
export const SearchTab = () => {
  /**
   * @state
   * - query: Estado local que almacena la consulta de búsqueda del usuario.
   * - setQuery: Función para actualizar el estado de la consulta.
   */
  const [query, setQuery] = useState("");

  /**
   * @hooks
   * - useAlbumSearch: Hook personalizado que maneja la lógica de búsqueda de álbumes.
   *
   * @returns {Object} - Objeto que contiene los álbumes encontrados, el estado de carga, el error y la función de búsqueda.
   */
  const { albums, loading, error, searchAlbums } = useAlbumSearch();

  /**
   * @config
   * - gridConfig: Configuración de la cuadrícula que define el número de columnas, el espacio entre elementos y los colores.
   */
  const gridConfig: GridConfig = {
    columns: 2,
    gap: 1,
    backgroundColor: "#1a1a1a",
    textcolor: "#ffffff",
  };

  /**
   * @function handleSearch
   *
   * Esta función se llama cuando el usuario realiza una búsqueda.
   * Verifica si la consulta no está vacía y llama a la función de búsqueda de álbumes.
   */
  const handleSearch = async () => {
    if (query.trim() !== "") {
      await searchAlbums(query);
    }
  };

  /**
   * @component
   *
   * Este componente renderiza la pestaña de búsqueda.
   * Incluye una barra de búsqueda, un mensaje de carga y los resultados de búsqueda en una cuadrícula.
   *
   * @returns {JSX.Element}
   * - Elemento JSX que representa la pestaña de búsqueda.
   * */
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
