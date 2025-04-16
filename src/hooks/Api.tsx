const API_KEY = "TU_API_KEY";
const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

interface ArtistResponse {
  albumname: string;
}

export const searchAlbum = async (albumName: ArtistResponse) => {
  const url = `${BASE_URL}?method=album.search&album=${albumName}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.albummatches.album;
  } catch (error) {
    console.error("Error fetching album:", error);
    return [];
  }
};
