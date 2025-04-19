/**
 * Representa las configuraciones de la cuadrícula de álbumes.
 */

export interface GridConfig {
  /**
   * Cantidad de columnas en la cuadrícula.
   */
  columns: number;
  /**
   * Cantidad de filas en la cuadrícula (opcional).
   */
  rows?: number;
  /**
   * Espacio entre los elementos de la cuadrícula.
   */
  gap: number;
  /**
   * Color de fondo de la cuadrícula.
   */
  backgroundColor: string;
  /**
   * Color de los textos de los elementos de la cuadrícula.
   */
  textcolor: string;
  /**
   * Titulos de los elementos de la cuadrícula (opcional).
   */
  showTitles?: boolean;
}
