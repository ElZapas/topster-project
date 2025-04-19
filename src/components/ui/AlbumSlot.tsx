/**
 * @file AlbumSlot.tsx
 * @description Componente reutilizable que representa un espacio para un álbum en la cuadrícula.
 *
 * Este componente permite arrastrar y soltar álbumes entre diferentes cuadrículas y personalizar su apariencia.
 */

/**
 * @imports
 * - useDrop: Hook de react-dnd para manejar el soltar elementos en un área específica.
 */
import { useDrop } from "react-dnd";

/**
 * @imports
 * - useDrag: Hook de react-dnd para manejar el arrastre de elementos.
 */
import { useDrag } from "react-dnd";

/**
 * @imports
 * - Album: Tipo de datos que representa un álbum.
 */
import { Album } from "../../types/album";

/**
 * @imports
 * - useRef: Hook de React para crear una referencia mutable.
 */
import { useRef, useEffect } from "react";

/**
 * @types
 * Declarando el tipo de las propiedades del componente AlbumSlot.
 */
type AlbumSlotProps = {
  /**
   * @name album
   * @description Álbum que se mostrará en el espacio. Puede ser nulo si no hay álbum.
   */
  album: Album | null;

  /**
   * @name index
   * @description Índice del espacio en la cuadrícula.
   */
  index: number;

  /**
   * @name onDropAlbum
   * @description Función de callback que se ejecuta al soltar un álbum en el espacio.
   */
  onDropAlbum?: (album: Album, index: number, source: string) => void;

  /**
   * @name backgroundColor
   * @description Color de fondo del espacio.
   */
  backgroundColor: string;

  /**
   * @name textcolor
   * @description Color del texto del espacio.
   */
  textcolor: string;

  /**
   * @name source
   * @description Fuente de los álbumes, utilizada para identificar el origen del álbum.
   */
  source: string;
};

/**
 * @component AlbumSlot
 * @description Componente que representa un espacio para un álbum en la cuadrícula.
 *
 * @example
 * <AlbumSlot
 *  prop={value}
 * </AlbumSlot>
 */
export const AlbumSlot = ({
  album,
  index,
  onDropAlbum,
  backgroundColor,
  textcolor,
  source,
}: AlbumSlotProps) => {

  /**
   * @name ref
   * @description Referencia mutable para el espacio del álbum.
   */
  const ref = useRef<HTMLDivElement | null>(null);

  /**
   * @name isDragging
   * @description Estado que indica si el álbum está siendo arrastrado.
   */
  const [{ isDragging }, drag] = useDrag({
    type: "ALBUM",
    item: album ? { album, source, id: album.id } : null,
    canDrag: !!album,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  /**
   * @name isOver
   * @description Estado que indica si el álbum está sobre el espacio.
   */
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ALBUM",
    drop: (item: { album: Album; source: string }) => {
      if (onDropAlbum) {
        onDropAlbum(item.album, index, item.source);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  /**
   * @name useEffect
   * @description Efecto que se ejecuta al montar el componente y al cambiar el estado de arrastre y soltar.
   */
  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
      drop(ref.current);
    }
  }, [drag, drop]);

  return (
    <div
      ref={ref}
      className={`rounded overflow-hidden flex flex-col ${
        isOver && canDrop ? "ring-2 ring-green-400" : ""
      } ${isDragging ? "opacity-50" : ""}`}
      style={{ backgroundColor, color: textcolor }}
    >
      {album && album.imageUrl ? (
        <>
          <div className={"aspect-square w-full"}>
            <img
              src={album.imageUrl}
              alt={album.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-1 text-center">
            <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap">
              {album.artist} - {album.name}
            </p>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-neutral-600">
          Vacío
        </div>
      )}
    </div>
  );
};
