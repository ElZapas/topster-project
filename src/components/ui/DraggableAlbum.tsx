/**
 * @file AlbumSlot.tsx
 * @description Componente reutilizable que representa un espacio para un álbum en una cuadrícula.
 * Este componente permite arrastrar y soltar álbumes en un espacio específico de la cuadrícula.
 */

/**
 * @imports
 * - useDrop: Hook de react-dnd para manejar el soltar elementos en un área específica.
 */
import { useDrag } from "react-dnd";

/**
 * @imports
 * - useDrag: Hook de react-dnd para manejar el arrastre de elementos.
 */
import { Album } from "../../types/album";

/**
 * @imports
 * - useRef: Hook de React para crear una referencia mutable.
 * - useEffect: Hook de React para manejar efectos secundarios en componentes funcionales.
 */
import { useRef, useEffect } from "react";

/**
 * @types
 * Declarando el tipo de las propiedades del componente DraggableAlbum.
 */
type DraggableAlbumProps = {

  /**
   * @name album
   * @description Álbum que se mostrará en el espacio.
   */
  album: Album;
};

/**
 * @function DraggableAlbum
 * @description Componente que representa un álbum arrastrable en la cuadrícula.
 * 
 * Este componente permite arrastrar un álbum y soltarlo en diferentes espacios de la cuadrícula.
 */
export const DraggableAlbum = ({ album }: DraggableAlbumProps) => {

  /**
   * @name ref
   * @description Referencia mutable para el elemento del álbum.
   */
  const ref = useRef<HTMLDivElement>(null);

  /**
   * @name isDragging
   * @description Estado que indica si el álbum está siendo arrastrado.
   */
  const [{ isDragging }, drag] = useDrag({
    type: "ALBUM",
    item: { album },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  /**
   * @name useEffect
   * @description Efecto secundario que se ejecuta cuando el componente se monta.
   * 
   * Este efecto aplica el comportamiento de arrastre al elemento del álbum.
   */
  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [ref, drag]);

  /**
   * @name return
   * @description Renderiza el componente DraggableAlbum.
   * s
   */
  return (
    <div
      ref={ref}
      className={`p-2 rounded bg-neutral-800 ${
        isDragging ? "opacity-30" : "opacity-100"
      }`}
    >
      <img src={album.imageUrl} alt={album.name} className="rounded" />
      <p className="text-xs text-white text-center mt-1">
        {album.artist} — {album.name}
      </p>
    </div>
  );
};

