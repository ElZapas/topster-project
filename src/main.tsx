/**
 * @file Este archivo es el punto de entrada principal de la aplicación React.
 * @description Renderiza el componente raíz de la aplicación dentro del elemento HTML con el id 'root'.
 * 
 * @imports
 * - StrictMode: Proporciona herramientas para detectar problemas potenciales en la aplicación.
 * - createRoot: Método de ReactDOM para inicializar la raíz de la aplicación.
 * - App: Componente principal de la aplicación.
 * - global.css: Archivo de estilos globales para la aplicación.
 * 
 * @usage Este archivo debe mantenerse como el punto de entrada principal y no debe contener lógica adicional.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
