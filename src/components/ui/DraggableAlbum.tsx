import { useDrag } from "react-dnd";
import { Album } from "../../types/album";
import { useRef, useEffect } from "react";

type DraggableAlbumProps = {
  album: Album;
};

export const DraggableAlbum = ({ album }: DraggableAlbumProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ALBUM",
    item: { album },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [ref, drag]);

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

