import { GridConfig } from "../../types/GridConfig";

interface SettingsTabProps {
  updateGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
}

export const SettingsTab = ({ updateGridConfig }: SettingsTabProps) => {
  return (
    <div className="flex flex-col gap-4 text-white">
      <h2 className="text-lg font-bold">Ajustes de Grid</h2>

      <label>
        Columnas:
        <input
          type="number"
          min={1}
          max={10}
          onChange={(e) =>
            updateGridConfig((prev) => ({
              ...prev,
              columns: parseInt(e.target.value),
            }))
          }
          className="ml-2 p-1 rounded bg-neutral-800 text-white"
        />
      </label>

      <label>
        Filas:
        <input
          type="number"
          min={1}
          max={10}
          onChange={(e) =>
            updateGridConfig((prev) => ({
              ...prev,
              rows: parseInt(e.target.value),
            }))
          }
          className="ml-2 p-1 rounded bg-neutral-800 text-white"
        />
      </label>

      <label>
        Espaciado:
        <input
          type="number"
          min={0}
          max={10}
          onChange={(e) =>
            updateGridConfig((prev) => ({
              ...prev,
              gap: parseInt(e.target.value),
            }))
          }
          className="ml-2 p-1 rounded bg-neutral-800 text-white"
        />
      </label>

      <label>
        Color de Fondo:
        <input
          type="color"
          onChange={(e) =>
            updateGridConfig((prev) => ({
              ...prev,
              backgroundColor: e.target.value,
            }))
          }
          className="ml-2"
        />
      </label>

      <label>
        Color de Texto:
        <input
          type="color"
          onChange={(e) =>
            updateGridConfig((prev) => ({ ...prev, textcolor: e.target.value }))
          }
          className="ml-2"
        />
      </label>
    </div>
  );
};

export default SettingsTab;
