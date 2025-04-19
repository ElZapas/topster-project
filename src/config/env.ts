/**
 * @file useAlbumSearch.tsx
 * @description Hook para importar variables de entorno de Vite.
 */

/**
 * @constant {string} API_URL - URL de la API de Last.fm.
 */
const API_URL = import.meta.env.VITE_LASTFM_API_URL;

/**
 * @constant {string} API_KEY - Clave de la API de Last.fm.
 */
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

/**
 * @condition {boolean} - Verifica si las variables de entorno están definidas.
 */
if (!API_URL || !API_KEY) {
  throw new Error('⚠️ LAST.FM API URL o KEY no definida en .env');
}

export { API_URL, API_KEY };
