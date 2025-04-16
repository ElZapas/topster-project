import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
