/**
 * @file useAlbumSearch.tsx
 * @description Componente reutilizable de barra de búsqueda.
 */

/**
 * @types SearchBarProps
 * @description Propiedades del componente SearchBar.
 */
type SearchBarProps = {
  
  /**
   * @property value
   * @description Valor actual de la barra de búsqueda.
   */
  value: string;

  /**
   * @property onChange
   * @description Función que se llama cuando el valor de la barra de búsqueda cambia.
   */
  onChange: (value: string) => void;

  /**
   * @property onSearch
   * @description Función que se llama cuando se hace clic en el botón de búsqueda.
   */
  onSearch: () => void;
};

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <div className="flex gap-2">
      <input
        className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
        placeholder="Buscar álbum..."
        value={value}
        onChange={(e) => onChange(e.target.value)} // actualiza el valor de la barra de búsqueda
      />
      <button
        onClick={onSearch}
        className="bg-teal-500 hover:bg-teal-400 text-white px-4 rounded"
      >
        Buscar
      </button>
    </div>
  );
};