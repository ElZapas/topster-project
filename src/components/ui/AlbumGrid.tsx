/**
 * @file useAlbumSearch.tsx
 * @description Componente reutilizable para mostrar una cuadrícula de álbumes.
 *
 * Este componente permite mostrar una cuadrícula de álbumes con un diseño configurable.
 * Permite arrastrar y soltar álbumes entre diferentes cuadrículas y personalizar su apariencia.
 */

/**
 * @imports
 * - Album: Tipo de datos que representa un álbum.
 */
import { Album } from "../../types/album";

/**
 * @imports
 * - GridConfig: Tipo de datos que representa la configuración de la cuadrícula.
 */
import { GridConfig } from "../../types/GridConfig";

/**
 * @imports
 * - AlbumSlot: Componente que representa un espacio para un álbum en la cuadrícula.
 */
import { AlbumSlot } from "./AlbumSlot";

/**
 * @types
 * Declarando el tipo de las propiedades del componente AlbumGrid.
 */
type AlbumGridProps = {
  /**
   * @type {Album[]}
   * @description Lista de álbumes a mostrar en la cuadrícula.
   */
  albums: Album[];

  /**
   * @type {GridConfig}
   * @description Configuración de la cuadrícula, incluyendo columnas, filas y colores.
   */
  config: GridConfig;

  /**
   * @type {(droppedAlbum: Album, targetIndex: number, source: string) => void}
   * @description Función de callback que se ejecuta al soltar un álbum en un espacio de la cuadrícula.
   */
  onDropAlbum?: (
    droppedAlbum: Album,
    targetIndex: number,
    source: string
  ) => void;

  /**
   * @type {boolean}
   * @description Indica si la cuadrícula debe tener una altura fija.
   */
  fixedHeight?: boolean;

  /**
   * @type {string}
   * @description Fuente de los álbumes, utilizada para identificar el origen del álbum.
   */
  source: string;
};

/**
 * @component AlbumGrid
 * @description Componente que muestra una cuadrícula de álbumes.
 * 
 * Este componente permite arrastrar y soltar álbumes entre diferentes cuadrículas y personalizar su apariencia.
 * 
 * @example
 * <AlbumGrid>
 *  param = {value}
 * </AlbumGrid>
 */
export const AlbumGrid = ({
  albums,
  config,
  onDropAlbum,
  fixedHeight,
  source,
}: AlbumGridProps) => {

  /**
   * @constant rows
   * @description Número de filas en la cuadrícula, calculado a partir del número de álbumes y columnas.
   * Si no se especifica, se calcula automáticamente.
   */
  const rows = config.rows ?? Math.ceil(albums.length / config.columns);

  /**
   * @constant totalSlots
   * @description Número total de espacios en la cuadrícula, calculado a partir del número de columnas y filas.
   */
  const totalSlots = config.columns * rows;

  /**
   * @constant slots
   * @description Array que representa los espacios de la cuadrícula, inicializado con null.
   */
  const slots = new Array(totalSlots).fill(null);

  /**
   * @constant aspectRatio
   * @description Relación de aspecto de la cuadrícula, calculada a partir del número de columnas y filas.
   */
  const aspectRatio = config.columns / rows;

  return (
    /**
     * @return {JSX.Element}
     * @description Renderiza la cuadrícula de álbumes con los espacios y álbumes correspondientes.
     */
    <div
      className="flex justify-center items-center"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
          gridTemplateRows: `repeat(${config.rows}, 1fr)`,
          gap: `${config.gap}rem`,
          ...(fixedHeight
            ? {
                width: aspectRatio >= 1 ? "90vh" : `${90 * aspectRatio}vh`,
                height: aspectRatio <= 1 ? "90vh" : `${90 / aspectRatio}vh`,
              }
            : {
                width: "100%",
              }),
        }}
      >
        {slots.map((_, index) => {
          const album = albums[index];
          return (
            <AlbumSlot
              key={album?.id || `empty-${index}`}
              album={album}
              index={index}
              onDropAlbum={onDropAlbum}
              backgroundColor={config.backgroundColor}
              textcolor={config.textcolor}
              source={source}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AlbumGrid;
