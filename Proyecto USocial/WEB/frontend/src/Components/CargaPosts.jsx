import React, { useState, useEffect, Fragment } from 'react';
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CargarPosts() {

    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const [usuariojson, setusuariojson] = useState([]);
    const fechaactual = new Date();
    const año = fechaactual.getFullYear();
    const mes = String(fechaactual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaactual.getDate()).padStart(2, '0');
    const hora = String(fechaactual.getHours()).padStart(2, '0');
    const minuto = String(fechaactual.getMinutes()).padStart(2, '0');

    const fecha = `Fecha: ${año}/${mes}/${dia} Hora: ${hora}:${minuto}`;



    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')
    };

    const handleCargaJSON = (event) => {
        // Evita que se recargue la página
        event.preventDefault();
        // Agarramos el primer archivo
        const archivo = event.target.files[0];
        const leer = new FileReader();
        if (archivo) {

            leer.onload = (ea) => {
                const datos = ea.target.result;
                const dat = JSON.parse(datos);

                console.log("datos del json" + dat);
                setusuariojson(dat);


                const data = dat.map((item) => {
                    return {
                       
                        
                    };
                });

                console.log('prueba del data' + data);
                fetch(`http://localhost:5000/cargapost`, {
                    // Se especifica el tipo de método
                    method: "POST",
                    // Se parsea a json el cuerpo que se mandará
                    body: JSON.stringify(dat),
                    // Se agregan los encabezados
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                    // Se obtiene la respuesta y se pasa a json
                    .then((retornar) => retornar.json())
                    // Una vez se tiene la respuesta en json se realizará lo siguiente
                    .then((res) => {
                        // Imprimimos en consola la respuesta
                        console.log(res)
                        // Validamos si las credenciales son correctas
                        if (!res.encontrado) {
                            // De la respuesta que mandó el backend guardamos únicamente el valor del atributo user            
                        } else {
                            // Si las credenciales están mal se muestra el siguiente mensaje.
                            alert(`Usuario existente`);
                            return;
                        }

                    })
                    .catch((error) => console.error(error));
            };
            leer.readAsText(archivo);
        }
    };


    return (
        <Fragment>
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#212529" }}>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, paddingLeft: "5%" }}>
                    <ul style={{ listStyleType: "none", display: "flex", padding: 0, height: "100%", alignItems: "center", margin: "0px" }}>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            {/* El link nos ayuda a navegar entre componentes, parecido al navigate */}
                            <Link style={{ color: "white", textDecoration: "none" }} to="/admin">
                                Usuarios
                            </Link>
                        </li>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/admin2">
                                Publicaciones
                            </Link>
                        </li>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/cargarUsuario">
                                Carga Usuarios
                            </Link>
                        </li>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/cargarPost">
                                Carga Publicaciones
                            </Link>
                        </li>
                    </ul>
                </div>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, flexDirection: "row-reverse", paddingRight: "5%" }}>
                    <button className="btn btn-outline-info" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", height: "100vh", width: "100%" }}>
                <div className="table-container">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">CARGAR USUARIOS</label>
                        <input onChange={handleCargaJSON} class="form-control" type="file" id="formFile" accept=".json" style={{ display: "block" }} />
                    </div>

                    <table className="table table-bordered text-center">
                        <thead className="table-active">
                            <tr>
                                <th>ID</th>
                                <th>DESCRIPCION</th>
                                <th>CATEGORIA</th>
                                <th>USUARIO</th>
                                <th>FECHA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(usuariojson) && usuariojson.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.descripcion}</td>
                                    <td>{user.categoria}</td>
                                    <td>{user.anonimo}</td>
                                    <td>{fecha}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}


export default CargarPosts;