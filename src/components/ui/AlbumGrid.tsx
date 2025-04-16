import { Album } from "../../types/album";
import { GridConfig } from "../../types/GridConfig";
import { AlbumSlot } from "./AlbumSlot";

type AlbumGridProps = {
  albums: Album[];
  config: GridConfig;
  onDropAlbum?: (droppedAlbum: Album, targetIndex: number) => void; 
  fixedHeight?: boolean
};

export const AlbumGrid = ({ albums, config, onDropAlbum, fixedHeight }: AlbumGridProps) => {
  const rows = config.rows ?? Math.ceil(albums.length / config.columns);
  const totalSlots = config.columns * rows;
  const slots = new Array(totalSlots).fill(null);

  const aspectRatio = config.columns / rows;

  return (
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
                width: aspectRatio >= 1 ? '90vh' : `${90 * aspectRatio}vh`,
                height: aspectRatio <= 1 ? '90vh' : `${90 / aspectRatio}vh`,
              }
            : {
                width: '100%',
              }),
        }}
      >
        {slots.map((_, index) => {
          const album = albums[index];
          return (
            <AlbumSlot
              key={index}
              album={album}
              index={index}
              onDropAlbum={onDropAlbum}
              backgroundColor={config.backgroundColor}
              textcolor={config.textcolor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AlbumGrid;


