import './App.css';
import Layout from './componentes/layout/Layout'
import TarjetaProducto from './componentes/producto/TarjetaProducto'
import { ProductoContainer } from './componentes/producto/ProductoContainer'
import { ContactoContainer } from './componentes/ContactoFormulario/ContactoContainer';
import { Routes, Route } from "react-router-dom";
import ProductoDetalle from './componentes/producto/ProductoDetalle'
import Inicio from './componentes/layout/Inicio';
import Cart from './componentes/Cart/Cart';


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ProductoContainer Mensaje={"Productos"} />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/contactanos" element={<ContactoContainer/>} />
        <Route path="/carrito" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;

