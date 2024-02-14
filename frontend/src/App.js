import { BrowserRouter, Routes, Route} from "react-router-dom";
import Libros from "./pages/Libros";
import RegistrarLibro from "./pages/RegistrarLibro";
import ActualizarLibro from "./pages/ActualizarLibro";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Libros/>}/>
            <Route path="/registrar" element={<RegistrarLibro/>}/>
            <Route path="/actualizar/:id" element={<ActualizarLibro/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
