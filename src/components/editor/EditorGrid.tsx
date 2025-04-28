/**
 * @file AlbumSlot.tsx
 * @description Componente que representa un espacio para un álbum en una cuadrícula.
 *
 * Este componente permite arrastrar y soltar álbumes en un espacio específico de la cuadrícula.
 */

import { Album } from "../../types/album";
import { GridConfig } from "../../types/GridConfig";
import { AlbumGrid } from "../ui/AlbumGrid";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

/**
 * @types EditorGridProps
 * @description Propiedades del componente EditorGrid.
 */


type EditorGridProps = {
/**
 * @typedef EditorGridProps
 * @property {Album[]} albums - Lista de álbumes que se mostrarán en la cuadrícula.
 * @property {GridConfig} config - Configuración de la cuadrícula que define su comportamiento y diseño.
 * @property {(albums: Album[]) => void} updateAlbums - Función para actualizar la lista de álbumes.
 * @property {boolean} [showTitle] - Indica si se debe mostrar el título (opcional).
 */
  albums: Album[];
  config: GridConfig;
  updateAlbums: (albums: Album[]) => void;
  showTitle?: boolean;
};

/**
 * @component EditorGrid
 * @description Componente que representa una cuadrícula de álbumes en el editor.
 *
 * Este componente permite arrastrar y soltar álbumes en la cuadrícula y actualizar la lista de álbumes.
 */

export const EditorGrid = ({ albums, config, updateAlbums }: EditorGridProps) => {
  
  const gridRef = useRef<HTMLDivElement>(null);

  const [isCapturing, setIsCapturing] = useState(false);

  const handleDownloadImage = async () => {
    if (!gridRef.current) return;
  
    if (albums.length === 0) {
      alert("No hay álbumes en el collage para descargar.");
      return;
    }
  
    setIsCapturing(true);
  
    try {
      const canvas = await html2canvas(gridRef.current, {
        backgroundColor: null,
        useCORS: true,
      });
      const dataURL = canvas.toDataURL("image/png");
  
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "mi-collage.png";
      link.click();
    } catch (error) {
      console.error("Error capturando imagen", error);
    } finally {
      setIsCapturing(false);
    }
  };


  /**
   * @function handleDropAlbum
   * @description Maneja el evento de soltar un álbum en la cuadrícula.
   *
   * @param droppedAlbum - Álbum que se ha soltado.
   * @param targetIndex - Índice del espacio de destino en la cuadrícula.
   * @param source - Fuente del álbum (puede ser "search" o "editor").
   */

  const handleDropAlbum = ( droppedAlbum: Album, targetIndex: number, source: string ) => {

    // Si no hay un álbum válido, no hacer nada
    if (!droppedAlbum?.id) return;

    /**
     * @constant newList
     * @description Nueva lista de álbumes después de la operación de arrastre y suelta.
     */
    const newList = [...albums]; // Crear una copia de la lista actual de álbumes
    const currentIndex = newList.findIndex((a) => a ?.id === droppedAlbum.id); // Buscar el índice actual del álbum arrastrado

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
    <div className="flex flex-col relative">
      {/* Botón de descarga */}
      <div className="self-end mb-1.5">
        <button
          onClick={handleDownloadImage}
          className="bg-teal-500 hover:bg-teal-700 text-white py-1.5 px-4 rounded"
          disabled={isCapturing}
        >
          {isCapturing ? "Generando..." : "Descargar Collage"}
        </button>
      </div>

      {/* Overlay de carga */}
      {isCapturing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="text-white text-lg animate-pulse">Generando imagen...</div>
        </div>
      )}

      {/* Contenedor del grid */}
      <div ref={gridRef} className="flex relative">
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
          <div className="px-2 overflow-y-auto w-full"  
          style={{ backgroundColor: config.backgroundColor }}
          >
            <ul
              className="space-y-0.5 w-full break-words"
              style={{
                fontSize:
                  (config.rows ?? 0) && ((config.rows ?? 0) > 5 ? config.rows : 0)
                    ? `${Math.max(6, 12 - ((config.rows ?? 0) - 5) * 3)}px`
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
                  <li key={rowIndex} className="mb-3">
                    <ul>
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
    </div>
  );
};

export default EditorGrid;
