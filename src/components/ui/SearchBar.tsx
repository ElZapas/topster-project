type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <div className="flex gap-2">
      <input
        className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
        placeholder="Buscar álbum..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
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