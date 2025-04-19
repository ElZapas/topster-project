/**
 * @file AlbumSlot.tsx
 * @description Componente que representa un espacio para un álbum en una cuadrícula.
 *
 * Este componente permite arrastrar y soltar álbumes en un espacio específico de la cuadrícula.
 * También permite eliminar un álbum de la cuadrícula.
 */

/**
 * @imports
 * - GridConfig: Tipo de datos que representa la configuración de la cuadrícula.
 */
import { GridConfig } from "../../../types/GridConfig";

/**
 * @types
 * - SettingsTabProps: Propiedades del componente SettingsTab.
 */
interface SettingsTabProps {
  /**
   * @property gridConfig
   * @description Configuración de la cuadrícula.
   */
  gridConfig: GridConfig;

  /**
   * @property updateGridConfig
   * @description Función para actualizar la configuración de la cuadrícula.
   */
  updateGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
}

/**
 * @function SettingsTab
 * @description Componente que permite ajustar la configuración de la cuadrícula.
 *
 * Este componente incluye campos de entrada para ajustar el número de columnas, filas, espaciado,
 * color de fondo y color de texto de la cuadrícula.
 *
 * @param {SettingsTabProps} props - Propiedades del componente.
 * @returns {JSX.Element} Componente SettingsTab.
 */
export const SettingsTab = ({
  gridConfig,
  updateGridConfig,
}: SettingsTabProps) => {
  return (
    <div className="flex flex-col gap-4 text-white">
      <h2 className="text-lg font-bold">Ajustes de Grid</h2>

      {
      /**
       * @label Columnas:
       * @description Campo de entrada para ajustar el número de columnas de la cuadrícula.
       */
      }
      <label>
        Columnas:
        <input
          type="number"
          min={1}
          max={10}
          value={gridConfig.columns}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            updateGridConfig((prev) => ({
              ...prev,
              columns: isNaN(value) || value < 1 ? 1 : value,
            }));
          }}
          className="ml-2 p-1 rounded bg-neutral-800 text-white"
        />
      </label>

      {
      /**
       * @label Filas:
       * @description Campo de entrada para ajustar el número de filas de la cuadrícula.
       */
      }
      <label>
        Filas:
        <input
          type="number"
          min={1}
          max={10}
          value={gridConfig.rows}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            updateGridConfig((prev) => ({
              ...prev,
              rows: isNaN(value) || value < 1 ? 1 : value,
            }));
          }}
          className="ml-2 p-1 rounded bg-neutral-800 text-white"
        />
      </label>

      {
      /**
       * @label Espaciado:
       * @description Campo de entrada para ajustar el espaciado entre los elementos de la cuadrícula.
       */
      }
      <label>
        Espaciado:
        <input
          type="number"
          min={0}
          max={10}
          value={gridConfig.gap}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            updateGridConfig((prev) => ({
              ...prev,
              gap: isNaN(value) || value < 0 ? 0 : value,
            }));
          }}
          className="ml-2 p-1 rounded bg-neutral-800 text-white"
        />
      </label>

      {
      /**
       * @label Color de Fondo:
       * @description Campo de entrada para ajustar el color de fondo de la cuadrícula.
       */
      }
      <label>
        Color de Fondo:
        <input
          type="color"
          value={gridConfig.backgroundColor}
          onChange={(e) =>
            updateGridConfig((prev) => ({
              ...prev,
              backgroundColor: e.target.value,
            }))
          }
          className="ml-2"
        />
      </label>

      {
      /**
       * @label Color de Texto:
       * @description Campo de entrada para ajustar el color de texto de la cuadrícula.
       */
      }
      <label>
        Color de Texto:
        <input
          type="color"
          value={gridConfig.textcolor}
          onChange={(e) =>
            updateGridConfig((prev) => ({
              ...prev,
              textcolor: e.target.value,
            }))
          }
          className="ml-2"
        />
      </label>

      {
      /**
       * @label Mostrar Títulos:
       * @description Checkbox para mostrar u ocultar los títulos de los álbumes en la cuadrícula.
       */
      }
      <label>
        Mostrar Títulos:
        <input
          type="checkbox"
          checked={gridConfig.showTitles}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateGridConfig((prev) => ({
              ...prev,
              showTitles: e.target.checked,
            }))
          }
          className="ml-2"
        />
      </label>
    </div>
  );
};

export default SettingsTab;
