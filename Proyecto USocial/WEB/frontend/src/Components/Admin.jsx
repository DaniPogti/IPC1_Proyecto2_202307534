import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Admin() {
    // Se declaran los estados iniciales
    const [usuarios, setUsuario] = useState([]);
    const [usuarioSelec, setusuarioSelec] = useState(null);
    const [verificaEliminar, setverificaEliminar] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();

    // Este método se encarga de ejecutarse cuando la página se termine de renderizar o cargar en otras palabras
    // También se ejecuta cuando el estado validarEliminacion tiene algún cambio, es por eso que de último entre los 
    // corchetes se pone ese estado, para que monitoree si ese estado tiene un cambio de valor
    useEffect(() => {
        // Nos comunicamos con el backend en el endpoint especificado
        fetch(`http://localhost:5000/usuarios`, {
            method: "GET",
        })
            .then((encontrado) => encontrado.json())
            .then((res) => {
                // Imprimimos la respuesta
                console.log(res)
                // Guardamos en un estado la respuesta que en este caso es un array de objetos json
                setUsuario(res);
            })
            .catch((error) => console.error(error));
    }, [verificaEliminar]);

    // Este método se encarga de eliminar un usuario en específico
    const deleteUser = (carnet) => {
        // Nos comunicamos con el backend en el endpoint especificado para eliminar un usario en específico
        fetch(`http://localhost:5000/usuarios/${carnet}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(encontrado => encontrado.json())
            .then(res => {
                // Mostramos el mensaje que manda el backend
                alert(res.mensaje)
                // Cambiamos el estado de validarEliminacion para que el useEffect se ejecute de nuevo
                setverificaEliminar(() => !verificaEliminar)
            })
            .catch(error => console.error("Error al eliminar el usuario:", error));
    };


    const verUsuario = (user) => {
        setusuarioSelec(user);
    };

    const handleClose = () => {
        setusuarioSelec(null);
    };

    // Este método se encarga de hacer logout
    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')
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
                            <Link style={{ color: "white", textDecoration: "none" }} to="/admin2">
                                  Carga Usuarios
                            </Link>
                        </li>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/admin2">
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
                <table className="table table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Carnet</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Genero</th>
                            <th>Correo</th>
                            <th>Facutad</th>
                            <th>Carrera</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(user => (
                            <tr key={user.carnet}>
                                <td>{user.carnet}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.genero}</td>
                                <td>{user.correo}</td>
                                <td>{user.facutad}</td>
                                <td>{user.carrera}</td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteUser(user.carnet)} style={{marginRight:"5%"}}>
                                        Eliminar
                                    </button>
                                    <button className="btn btn-outline-warning" onClick={() => verUsuario(user)}>Ver</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {usuarioSelec && (
                    <Modal show={true} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles del Usuario</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Carnet:</strong> {usuarioSelec.carnet}</p>
                            <p><strong>Nombre:</strong> {usuarioSelec.nombre}</p>
                            <p><strong>Apellido:</strong> {usuarioSelec.apellido}</p>
                            <p><strong>Genero:</strong> {usuarioSelec.genero}</p>
                            <p><strong>Correo:</strong> {usuarioSelec.correo}</p>
                            <p><strong>Facultad:</strong> {usuarioSelec.facutad}</p>
                            <p><strong>Carrera:</strong> {usuarioSelec.carrera}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
        </Fragment>
    );
}

export default Admin;