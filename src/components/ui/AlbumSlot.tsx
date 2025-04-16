import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import { Album } from "../../types/album";
import { useRef, useEffect } from "react";

type AlbumSlotProps = {
  album: Album | null;
  index: number;
  onDropAlbum?: (album: Album, index: number) => void;
  backgroundColor: string;
  textcolor: string;
};

export const AlbumSlot = ({
  album,
  index,
  onDropAlbum,
  backgroundColor,
  textcolor,
}: AlbumSlotProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ALBUM",
    item: album ? { album } : null,
    canDrag: !!album, // solo se puede arrastrar si hay un album
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ALBUM",
    drop: (item: { album: Album }) => {
      if (onDropAlbum) {
        onDropAlbum(item.album, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
      drop(ref.current);
    }
  }, [drag, drop]);

  return (
    <div
      ref={ref}
      className={`rounded overflow-hidden flex flex-col transition ${
        isOver && canDrop ? "ring-2 ring-green-400" : ""
      } ${isDragging ? "opacity-50" : ""}`}
      style={{ backgroundColor, color: textcolor }}
    >
      {album ? (
        <>
          <div className="aspect-square w-full">
            <img
              src={album.imageUrl}
              alt={album.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-center p-1">
            {album.artist} — {album.name}
          </p>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-neutral-600">
          Vacío
        </div>
      )}
    </div>
  );
};
