/**
 * Representa la respuesta de la API de Last.fm para la búsqueda de álbumes.
 */
export interface LastFmSearchResponse {
  /**
   * Representa el resultado de la búsqueda de álbumes.
   */
  results: {
    /**
     * Contiene los álbumes encontrados en la búsqueda.
     */
    albummatches: {
      /**
       * Lista de álbumes encontrados.
       */
      album: {
        /**
         * Nombre del álbum.
         */
        name: string;
        /**
         * Nombre del artista del álbum.
         */
        artist: string;
        /**
         * URL de la imagen asociada al álbum.
         */
        image: { size: string; ['#text']: string }[];
      }[];
    };
  };
}

/**
 * Representa la respuesta de la API de Last.fm para los álbumes más escuchados de un usuario.
 */
export interface LastFmUserAlbumsResponse {
  /**
   * Contiene los álbumes más escuchados por el usuario.
   */
  topalbums: {
    /**
     * Lista de álbumes más escuchados.
     */
    album: {
      /**
       * Identificador único del álbum.
       */
      name: string;
      /**
       * Nombre del artista del álbum.
       */
      artist: { name: string };
      /**
       * URL de la imagen asociada al álbum.
       */
      image: { size: string; ['#text']: string }[]
    }[];
  };
}
  