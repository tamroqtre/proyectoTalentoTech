import './App.css';
import Layout from './componentes/layout/Layout'
import TarjetaProducto from './componentes/producto/TarjetaProducto'
import { ProductoContainer } from './componentes/producto/ProductoContainer'
import { ContactoContainer } from './componentes/ContactoFormulario/ContactoContainer';
import { Routes, Route } from "react-router-dom";
import ProductoDetalle from './componentes/producto/ProductoDetalle'
import Inicio from './componentes/layout/Inicio';
import Cart from './componentes/Cart/Cart';
import { AltaProductosContainer } from './componentes/FormularioProductos/AltaProductosContainer'
import Gestion from './componentes/Gestion/Gestion'
import Registro from './componentes/Registro/Registro'
import Login from './componentes/Login/Login'
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ProductoContainer Mensaje={"Productos"} />} />
        <Route path="/productos/:categoria" element={<ProductoContainer Mensaje={"Productos"} />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/contactanos" element={<ContactoContainer />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/gestion" element={
          <ProtectedRoute rolesPermitidos={['admin']}>
            <Gestion />
          </ProtectedRoute>
        } />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;

