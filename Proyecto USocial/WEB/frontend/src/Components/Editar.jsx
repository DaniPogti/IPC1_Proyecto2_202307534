import React, { useState, useEffect, Fragment } from 'react';
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Editar() {
    const [carnet, setCarnet] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [genero, setgenero] = useState('');
    const [correo, setcorreo] = useState('');
    const [facultad, setfacultad] = useState('');
    const [carrera, setcarrera] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();

    const handleEditar = (event) => {
        // Evita la recarga de nuestro sitio web
        event.preventDefault();
        if (nombre === "" || apellido === "" || genero === "" || correo === "" || facultad === "" || carrera === "" || contraseña === "") {
            alert("Llene todos los campos");
            console.log(`Llene todos los campos`);
            return;
        }

        const caracteres = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (contraseña.match(caracteres)) {
            alert(`Contraseña Valida!!`)
            console.log(`Contraseña validaaaa`);
        } else {
            alert(`Tu contraseña debe contener al menos una Mayuscula, una Minuscula, un nuemero y un Caracter Especial`)
            console.log(`Tu contraseña debe contener al menos una Mayuscula, una Minuscula y un Caracter Especial`);
            return;
        }

        const user = cookies.usuario;
        const datos = {
            nombre: nombre,
            apellido: apellido,
            genero: genero,
            correo: correo,
            facutad: facultad,
            carrera: carrera,
            contraseña: contraseña,
            rol: 1
        }

        fetch(`http://localhost:5000/usuarios/${user.carnet}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((retornar) => retornar.json())
            .then((res) => {
                console.log(res)
            })
        alert(`Datos editados correctamente`);
    };
    return (
        <div className="login-background">
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#212529" }}>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, paddingLeft: "5%" }}>
                    <ul style={{ listStyleType: "none", display: "flex", padding: 0, height: "100%", alignItems: "center", margin: "0px" }}>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            {/* El link nos ayuda a navegar entre componentes, parecido al navigate */}
                            <Link style={{ color: "white", textDecoration: "none" }} to="/usuario">
                                Home
                            </Link>
                        </li>
                        <li style={{ color: "white" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/crearPost">
                                /-Crear Post-/
                            </Link>
                        </li>
                        <li style={{ color: "white" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/editar">
                                -Editar Perfil-/
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className='Titulo'>
                        <div className="col-md-8 mx-auto">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title text-center mb-4">Edita Tus Datos</h2>
                                    <form onSubmit={handleEditar} className='form-signin w-100 m-auto'>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-floating d-flex justify-content-center" style={{ width: "100%" }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="floatingInput"
                                                        onChange={(e) => setNombre(e.target.value)}
                                                        value={nombre}

                                                    //value={carnet}
                                                    />
                                                    <label htmlFor="floatingInput" className="text-center">Nombre</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating d-flex justify-content-center" style={{ width: "100%" }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="floatingInput1"
                                                        onChange={(e) => setapellido(e.target.value)}
                                                        value={apellido}

                                                    //value={carnet}
                                                    />
                                                    <label htmlFor="floatingInput" className="text-center">Apellido</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <div className="form-floating d-flex justify-content-center" style={{ width: "100%" }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="floatingInput2"
                                                        onChange={(e) => setgenero(e.target.value)}
                                                        value={genero}

                                                    //value={carnet}
                                                    />
                                                    <label htmlFor="floatingInput" className="text-center">Genero</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating d-flex justify-content-center" style={{ width: "100%" }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="floatingInput3"
                                                        onChange={(e) => setcorreo(e.target.value)}
                                                        value={correo}

                                                    //value={carnet}
                                                    />
                                                    <label htmlFor="floatingInput" className="text-center">Correo</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <div className="form-floating d-flex justify-content-center" style={{ width: "100%" }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="floatingInput4"
                                                        onChange={(e) => setfacultad(e.target.value)}
                                                        value={facultad}

                                                    //value={carnet}
                                                    />
                                                    <label htmlFor="floatingInput" className="text-center">Facultad</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-floating d-flex justify-content-center" style={{ width: "100%" }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="floatingInput5"
                                                        onChange={(e) => setcarrera(e.target.value)}
                                                        value={carrera}

                                                    //value={carnet}
                                                    />
                                                    <label htmlFor="floatingInput" className="text-center">Carrera</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-floating" style={{ width: "50%" }}>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingPassword"
                                                    placeholder="Password"
                                                    onChange={(e) => setContraseña(e.target.value)}
                                                    value={contraseña}
                                                //value={contraseña}
                                                />
                                                <label htmlFor="floatingPassword">Contraseña</label>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-outline-primary btn-lg">Editar Datos</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Editar;