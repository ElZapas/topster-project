// types/api.ts
export interface LastFmSearchResponse {
  results: {
    albummatches: {
      album: {
        name: string;
        artist: string;
        image: { size: string; ['#text']: string }[];
      }[];
    };
  };
}

export interface LastFmUserAlbumsResponse {
  topalbums: {
    album: {
      name: string;
      artist: { name: string };
      image: { size: string; ['#text']: string }[];
    }[];
  };
}
  