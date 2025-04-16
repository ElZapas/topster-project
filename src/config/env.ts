// src/config/env.ts
const API_URL = import.meta.env.VITE_LASTFM_API_URL;
const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

if (!API_URL || !API_KEY) {
  throw new Error('⚠️ LAST.FM API URL o KEY no definida en .env');
}

export { API_URL, API_KEY };
