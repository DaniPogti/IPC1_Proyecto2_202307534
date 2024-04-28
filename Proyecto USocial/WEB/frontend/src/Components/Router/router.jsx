import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import Admin from '../Admin';
import Usuario from '../Usuario';
import CreatePost from '../CrearPost';
import Registro from '../Registro';
import Editar from '../Editar';
import Admin2 from '../Admin2';
import CargarUsuarios from '../CargarUsuarios';
import CargarPosts from '../CargaPosts';

//import Editar from '../Editar';


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Crear las rutas que que tienen urls y se llaman */}
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/admin' element={<Admin/>} />
                <Route path='/admin2' element={<Admin2/>} />
                <Route path='/usuario' element={<Usuario/>} />
                <Route path='/crearPost' element={<CreatePost/>} />
                <Route path='/registro' element={<Registro/>} />
                <Route path='/editar' element={<Editar/>} />
                <Route path='/cargarUsuario' element={<CargarUsuarios/>} />
                <Route path='/cargarPost' element={<CargarPosts/>} />         
            </Routes>
        </BrowserRouter>
    );
}

export default Router;