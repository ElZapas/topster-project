import { Album } from "../../types/album";
import { GridConfig } from "../../types/GridConfig";
import { AlbumGrid } from "../ui/AlbumGrid";

type EditorGridProps = {
  albums: Album[];
  config: GridConfig;
  updateAlbums: (albums: Album[]) => void;
};

export const EditorGrid = ({ albums, config, updateAlbums }: EditorGridProps) => {

  const handleDropAlbum = (droppedAlbum: Album, targetIndex: number) => {
    const newList = albums.filter(a => a !== droppedAlbum); 
    newList.splice(targetIndex, 0, droppedAlbum); 
    updateAlbums(newList);
  };

  return (
    <AlbumGrid
      albums={albums}
      config={config}
      onDropAlbum={handleDropAlbum}
      fixedHeight={true}
    />
  );
};

export default EditorGrid;

