/**
 * @file AlbumSlot.tsx
 * @description Componente que representa un espacio para un álbum en una cuadrícula.
 * 
 * Este componente permite arrastrar y soltar álbumes en un espacio específico de la cuadrícula.
 * También maneja la lógica para mostrar un álbum en el espacio y permite eliminarlo si es necesario.
 */

/**
 * @imports
 * - useState: Hook de React para manejar el estado local del componente.
 * - gridConfig: Tipo de datos que representa la configuración de la cuadrícula.
 * - SearchTab: Componente que permite buscar álbumes.
 * - SettingsTab: Componente que permite ajustar la configuración de la cuadrícula.
 * - ImportLastFmTab: Componente que permite importar álbumes desde LastFM.
 * - AboutTab: Componente que muestra información sobre la aplicación.
 * - Album: Tipo de datos que representa un álbum.
 */
import { useState } from "react";
import { GridConfig } from "../../types/GridConfig";
import SearchTab from "./search/SearchTab";
import SettingsTab from "./settings/SettingsTab";
import ImportLastFmTab from "./lastfm/ImportLastFmTab";
import AboutTab from "./about/AboutTab";
import { Album } from "../../types/album";

/**
 * @interface TabsContainerProps
 * @description Propiedades del componente TabsContainer.
 */
interface TabsContainerProps {
  /**
   * @property gridConfig - Configuración de la cuadrícula.
   * @property updateGridConfig - Función para actualizar la configuración de la cuadrícula.
   * @property setAlbums - Función para actualizar el estado de los álbumes.
   */
  gridConfig: GridConfig;
  updateGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
}

/**
 * @function TabsContainer
 * @description Componente que representa un contenedor de pestañas para la aplicación.
 * 
 * Este componente permite navegar entre diferentes pestañas: Buscar Álbumes, Ajustes, Importar y Acerca de.
 * Cada pestaña muestra un componente diferente según la selección del usuario.
 * 
 * @param {TabsContainerProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente TabsContainer.
 */
export const TabsContainer = ({
  updateGridConfig,
  setAlbums, gridConfig
}: TabsContainerProps) => {
  
  /**
   * @constant {number} active - Índice de la pestaña activa.
   */
  const [active, setActive] = useState(0);

  /**
   * @constant {string[]} tabs - Lista de nombres de las pestañas.
   */
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
        gridConfig={gridConfig}
        updateGridConfig={(newConfig) => updateGridConfig(newConfig)} // 
        />
      )}
      {active === 2 && <ImportLastFmTab setAlbums={setAlbums} />}
      {active === 3 && <AboutTab />}
    </div>
  );
};

export default TabsContainer;
