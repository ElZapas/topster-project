/**
 * @component
 * @name EditorPage
 * @description Componente principal de la página del editor de álbumes. 
 * Proporciona una interfaz para configurar la cuadrícula y gestionar los álbumes.
 * 
 * @returns {JSX.Element} La estructura de la página del editor con un panel lateral y un área principal.
 * 
 * @example
 * <EditorPage />
 * 
 * @remarks
 * Este componente utiliza `useState` para manejar el estado de los álbumes y la configuración de la cuadrícula.
 */


import { useState } from "react";

/**
 * @imports
 * - TabsContainer: Componente que contiene las pestañas de configuración y gestión de álbumes.
 */
import { TabsContainer } from "../components/controlPanel/TabsContainer";

/**
 * @imports
 * - EditorGrid: Componente que representa la cuadrícula de álbumes.
 */
import { EditorGrid } from "../components/editor/EditorGrid";

/**
 * @imports
 * - Album: Tipo que representa la estructura de un álbum.
 */
import { Album } from "../types/album";

/**
 * @imports
 * - GridConfig: Tipo que representa la configuración de la cuadrícula.
 */
import { GridConfig } from "../types/GridConfig";


export const EditorPage = () => {
  
  /**
   * @state albums - Estado que almacena la lista de álbumes.
   */
  const [albums, setAlbums] = useState<Album[]>([]);

  /**
   * @state gridConfig - Estado que almacena la configuración de la cuadrícula.
   * La configuracion es predeterminada y se puede modificar a través de la interfaz.
   */
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    columns: 5,
    rows: 5,
    gap: 1,
    backgroundColor: "#1a1a1a",
    textcolor: "#ffffff",
    showTitles: true
  });
  return (
    /**
     * Estructura de la página del editor de álbumes.
     */
    <div className="flex h-screen bg-neutral-900 text-white">

    {
    /**
     * Panel lateral que contiene las pestañas de configuración y gestión de álbumes.
     */
     }
      <aside className="w-94 p-4 border-r border-neutral-700 overflow-y-auto">
        <TabsContainer
          gridConfig={gridConfig} // Configuración de la cuadrícula
          updateGridConfig={setGridConfig} // Función para actualizar la configuración de la cuadrícula
          setAlbums={setAlbums} // Función para actualizar la lista de álbumes
        />
      </aside>

      {
      /**
       * Área principal que muestra la cuadrícula de álbumes.
       * La cuadrícula se adapta al tamaño y configuración especificada.
       */
      }
      <main
        className="flex-1 p-2 overflow-y-auto"
        style={{ backgroundColor: gridConfig.backgroundColor }}
      >
        <EditorGrid
          albums={albums} // Lista de álbumes a mostrar en la cuadrícula
          config={gridConfig} // Recibe la configuración de la cuadrícula
          updateAlbums={setAlbums} // Función para actualizar la lista de álbumes
        />
      </main>
    </div>
  );
};

export default EditorPage;
