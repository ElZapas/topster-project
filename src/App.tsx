/**
 * @file Componente principal de la aplicación.
 * 
 * @description Este archivo define el componente `App`, que configura el proveedor de arrastrar y soltar (DndProvider),
 * el enrutador de la aplicación (BrowserRouter) y las rutas principales. Actualmente, incluye una ruta para la página
 * del editor de álbumes (`EditorPage`).
 * 
 * @returns {JSX.Element} El componente principal de la aplicación.
 */

/**
 * @imports
 * - DndProvider: Proveedor para la funcionalidad de arrastrar y soltar.
 */
import { DndProvider } from 'react-dnd'; 
import { HTML5Backend } from 'react-dnd-html5-backend';

/**
 * @imports 
 * - BrowserRouter: Componente de enrutamiento para aplicaciones React.
 * - Routes: Componente para definir rutas en la aplicación.
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditorPage } from "./pages/AlbumEditorPage";


export const App = () => (
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  </DndProvider>
);

export default App;
