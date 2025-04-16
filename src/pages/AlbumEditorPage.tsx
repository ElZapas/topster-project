import { useState } from "react";
import { TabsContainer } from "../components/controlPanel/TabsContainer";
import { EditorGrid } from "../components/editor/EditorGrid";
import { Album } from "../types/album";
import { GridConfig } from "../types/GridConfig";

export const EditorPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    columns: 5,
    rows: 5,
    gap: 1,
    backgroundColor: "#1a1a1a",
    textcolor: "#ffffff",
  });

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <aside className="w-94 p-4 border-r border-neutral-700 overflow-y-auto">
        <TabsContainer updateGridConfig={setGridConfig} setAlbums={setAlbums} />
      </aside>

      <main
        className="flex-1 p-4 overflow-y-auto"
        style={{ backgroundColor: gridConfig.backgroundColor }}
      >
        <EditorGrid
          albums={albums}
          config={gridConfig}
          updateAlbums={setAlbums}
        />
      </main>
    </div>
  );
};

export default EditorPage;
