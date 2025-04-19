/**
 * @file AlbumSlot.tsx
 * @description Componente que representa un espacio para un álbum en una cuadrícula.
 *
 * Este componente permite arrastrar y soltar álbumes en un espacio específico de la cuadrícula.
 */

import { Album } from "../../types/album";
import { GridConfig } from "../../types/GridConfig";
import { AlbumGrid } from "../ui/AlbumGrid";

/**
 * @types EditorGridProps
 * @description Propiedades del componente EditorGrid.
 */
type EditorGridProps = {
  /**
   * @property albums
   * @description Lista de álbumes que se mostrarán en la cuadrícula.
   */
  albums: Album[];

  /**
   * @property config
   * @description Configuración de la cuadrícula.
   */
  config: GridConfig;

  /**
   * @property updateAlbums
   * @description Función para actualizar la lista de álbumes.
   */
  updateAlbums: (albums: Album[]) => void;

  /**
   * @property showTitle
   * @description Indica si se deben mostrar los títulos de los álbumes.
   */
  showTitle?: boolean;
};

/**
 * @component EditorGrid
 * @description Componente que representa una cuadrícula de álbumes en el editor.
 *
 * Este componente permite arrastrar y soltar álbumes en la cuadrícula y actualizar la lista de álbumes.
 */
export const EditorGrid = ({
  albums,
  config,
  updateAlbums,
}: EditorGridProps) => {
  /**
   * @function handleDropAlbum
   * @description Maneja el evento de soltar un álbum en la cuadrícula.
   *
   * @param droppedAlbum - Álbum que se ha soltado.
   * @param targetIndex - Índice del espacio de destino en la cuadrícula.
   * @param source - Fuente del álbum (puede ser "search" o "editor").
   */
  const handleDropAlbum = (
    droppedAlbum: Album,
    targetIndex: number,
    source: string
  ) => {
    // Si no hay un álbum válido, no hacer nada
    if (!droppedAlbum?.id) return;

    /**
     * @constant newList
     * @description Nueva lista de álbumes después de la operación de arrastre y suelta.
     */
    const newList = [...albums]; // Crear una copia de la lista actual de álbumes
    const currentIndex = newList.findIndex((a) => a?.id === droppedAlbum.id); // Buscar el índice actual del álbum arrastrado

    /**
     * @description Si la fuente es "search", simplemente reemplazar el álbum en la posición de destino.
     * Si la fuente es "editor", eliminar el álbum de su posición actual y colocarlo en la nueva posición.
     */
    if (source === "search") {
      newList[targetIndex] = droppedAlbum;
    } else {
      if (currentIndex !== -1) {
        newList.splice(currentIndex, 1);
      }
      newList.splice(targetIndex, 0, droppedAlbum);
    }

    // Actualizar la lista de álbumes en el estado del componente padre
    updateAlbums(newList);
  };

  return (
    <div className="flex">
      {/* Collage de álbumes */}
      <div className="flex-1">
        <AlbumGrid
          albums={albums}
          config={config}
          onDropAlbum={handleDropAlbum}
          fixedHeight={true}
          source="editor"
        />
      </div>

      {/* Lista de títulos (solo si showTitles está activado) */}
      {config.showTitles && (
        <div className="px-4 overflow-y-auto w-full">
          <ul
            className="space-y-2 w-full break-words"
            style={{
              fontSize:
                config.rows && config.rows > 5
                  ? `${Math.max(6, 12 - (config.rows - 5) * 3)}px`
                  : "12px",
              color: config.textcolor,
            }}
          >
            {Array.from({ length: config.rows || 0 }).map((_, rowIndex) => {
              const startIndex = rowIndex * config.columns;
              const rowAlbums = albums.slice(
                startIndex,
                startIndex + config.columns
              );

              return (
                <li key={rowIndex} className="mb-2">
                  <ul className="py-1">
                    {rowAlbums.map((album, index) =>
                      album ? (
                        <li key={album.id}>
                          {album.name} — {album.artist}
                        </li>
                      ) : (
                        <li key={`empty-${index}`} className="text-neutral-500">
                          Vacío
                        </li>
                      )
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditorGrid;
