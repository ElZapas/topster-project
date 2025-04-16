import { useState } from "react";
import { GridConfig } from "../../types/GridConfig";
import SearchTab from "./search/SearchTab";
import SettingsTab from "./SettingsTab";
import ImportLastFmTab from "./ImportLastFmTab";
import AboutTab from "./AboutTab";
import { Album } from "../../types/album";

interface TabsContainerProps {
  updateGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
}

export const TabsContainer = ({
  updateGridConfig,
  setAlbums,
}: TabsContainerProps) => {
  const [active, setActive] = useState(0);
  const tabs = ["Buscar Álbumes", "Ajustes", "Importar", "Acerca de"];

  return (
    <div>
      <div className="flex mb-4 border-b border-neutral-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`px-4 py-2 ${
              active === index
                ? "border-b-2 border-teal-500 text-teal-500"
                : "text-neutral-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 0 && <SearchTab />}
      {active === 1 && (
        <SettingsTab
          updateGridConfig={(newConfig) => updateGridConfig(newConfig)}
        />
      )}
      {active === 2 && <ImportLastFmTab setAlbums={setAlbums} />}
      {active === 3 && <AboutTab />}
    </div>
  );
};

export default TabsContainer;
