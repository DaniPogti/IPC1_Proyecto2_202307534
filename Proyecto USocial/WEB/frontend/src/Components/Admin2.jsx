import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

function Admin2() {
    const [publicaciones, setpublicaciones] = useState([]);
    const [postSelec, setpostSelec] = useState(null);
    const [verificaEliminar, setverificaEliminar] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();

    // Este método se encarga de ejecutarse cuando la página se termine de renderizar o cargar en otras palabras
    // También se ejecuta cuando el estado validarEliminacion tiene algún cambio, es por eso que de último entre los 
    // corchetes se pone ese estado, para que monitoree si ese estado tiene un cambio de valor
    useEffect(() => {
        // Nos comunicamos con el backend en el endpoint especificado
        fetch(`http://localhost:5000/getPublicaciones`, {
            method: "GET",
        })
            .then((encontrado) => encontrado.json())
            .then((res) => {
                // Imprimimos la respuesta
                console.log(res)
                // Guardamos en un estado la respuesta que en este caso es un array de objetos json
                setpublicaciones(res);
            })
            .catch((error) => console.error(error));
    }, [verificaEliminar]);

    // Este método se encarga de eliminar un usuario en específico
    const eliminaPost = (id) => {
        // Nos comunicamos con el backend en el endpoint especificado para eliminar un usario en específico
        fetch(`http://localhost:5000/getPublicaciones/${id}`, {
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

    const verPost = (post) => {
        setpostSelec(post);
    };

    const handleClose = () => {
        setpostSelec(null);
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
                    <div>
                        <CSVLink data={publicaciones.map(post => ({
                            ID: post.id,
                            DESCRIPCION: post.descripcion,
                            CATEGORIA: post.categoria,
                            USUARIO: `${post.nombre} ${post.apellido}`,
                            INFORMACION_USAC: post.carfacu,
                            FECHA: post.fecha
                        }))}
                            filename='PUBLICACIONES'>
                            <button className='btn btn-success'>Exportar CSV</button>
                        </CSVLink>
                    </div>
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Descripcion</th>
                                <th>Categoria</th>
                                <th>Usuario</th>
                                <th>Informacion USAC</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publicaciones.map(post => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.descripcion}</td>
                                    <td>{post.categoria}</td>
                                    <td>{post.nombre}{post.apellido}</td>
                                    <td>{post.carfacu}</td>
                                    <td>{post.fecha}</td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={() => eliminaPost(post.id)} style={{ marginRight: "5%" }}>
                                            Eliminar
                                        </button>
                                        <button className="btn btn-outline-warning" onClick={() => verPost(post)}>Ver</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {postSelec && (
                        <Modal show={true} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Detalles del Usuario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p><strong>Id:</strong> {postSelec.id}</p>
                                <p><strong>Descripcion:</strong> {postSelec.descripcion}</p>
                                <p><strong>Categoria:</strong> {postSelec.categoria}</p>
                                <p><strong>Usuario:</strong> {postSelec.nombre}{postSelec.apellido}</p>
                                <p><strong>Informacion USAC:</strong> {postSelec.carfacu}</p>
                                <p><strong>Fecha:</strong> {postSelec.fecha}</p>
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



export default Admin2;