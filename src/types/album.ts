/**
 * Representa un álbum musical.
 */
export interface Album {
  /**
   * Identificador único del álbum (opcional).
   */
  id?: string;

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
  imageUrl: string;
}
