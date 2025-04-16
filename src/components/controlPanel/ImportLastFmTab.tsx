import { useState } from "react";
import { useLastFmUserAlbums } from "../../hooks/useLastFmSearch";
import { Album } from "../../types/album";

interface ImportLastFmTabProps {
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
}

export const ImportLastFmTab = ({ setAlbums }: ImportLastFmTabProps) => {
  const [username, setUsername] = useState("");
  const { loading, error, fetchUserAlbums } = useLastFmUserAlbums();

  const handleImport = async () => {
    if (username.trim() === "") return;
    const albums = await fetchUserAlbums(username);
    setAlbums(albums);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white">Importar álbumes desde LastFM</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ingresa tu usuario de LastFM"
        className="p-2 rounded bg-neutral-800 text-white outline-none"
      />
      <button
        onClick={handleImport}
        className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Importando..." : "Importar álbumes"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImportLastFmTab;
