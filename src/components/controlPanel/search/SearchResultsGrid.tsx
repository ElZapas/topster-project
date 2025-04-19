/**
 * @file SearchResultsGrid.tsx
 * @description Este componente se encarga de renderizar una cuadrícula de álbumes
 * basada en los resultados de búsqueda. Utiliza el componente AlbumGrid para mostrar
 */

/**
 * @imports 
 * 
 * - Album: Tipo que representa un álbum, importado desde el archivo de tipos.
 * - GridConfig: Tipo que representa la configuración de la cuadrícula, importado desde el archivo de tipos.
 * - AlbumGrid: Componente que renderiza una cuadrícula de álbumes, importado desde el archivo de componentes de UI.
 */
import { Album } from "../../../types/album";
import { GridConfig } from "../../../types/GridConfig";
import { AlbumGrid } from "../../ui/AlbumGrid";

/**
 * @types 
 * 
 * - SearchResultsGridProps: Tipo que representa las propiedades del componente SearchResultsGrid.
 */
type SearchResultsGridProps = {
  /**
   * albums: Array de álbumes que se mostrarán en la cuadrícula.
   * config: Configuración de la cuadrícula, que incluye propiedades como columnas, espacio entre elementos, etc.
   */
  albums: Album[];
  config: GridConfig;
};

/**
 * @component SearchResultsGrid
 * 
 * Este componente renderiza una cuadrícula de álbumes basada en los resultados de búsqueda.
 * Utiliza el componente AlbumGrid para mostrar los álbumes en una cuadrícula.
 * 
 * @param {SearchResultsGridProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa la cuadrícula de álbumes.
 */
export const SearchResultsGrid = ({ albums, config }: SearchResultsGridProps) => {
  return (
    <div className="mt-4">
    <AlbumGrid
      albums={albums}
      config={config}
      fixedHeight={false}
      source="search"
    />
    </div>
  );
};

export default SearchResultsGrid;

