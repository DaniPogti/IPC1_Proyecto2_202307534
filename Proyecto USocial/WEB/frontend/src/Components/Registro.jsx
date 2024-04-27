import React, { useState } from 'react';
import './Styles/Registro.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Registro() {
    // Creación de los estados de la pantalla
    const [carnet, setCarnet] = useState('');
    const [password, setPassword] = useState('');
    const [confiromar, setconfiromar] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [genero, setgenero] = useState('');
    const [correo, setcorreo] = useState('');
    const [facultad, setfacultad] = useState('');
    const [carrera, setcarrera] = useState('');
    // Creación de la cookie que se usará
    const [cookies, setCookie] = useCookies(['usuario']);
    // Creación del encargado de navegar entre las distintas rutas que tiene nuestro Router
    const navigate = useNavigate();

    // Este método se encarga de comunicarse con nuestro backend para validar si las credenciales son correctas.

    const handleSubmit = (event) => {
        // Evita la recarga de nuestro sitio web

        event.preventDefault();

        if (password !== confiromar) {
            alert("Contraseña no valida");
            console.log(`Tu contraseña debe ser igual para confirmar`);
            return;
        }

        const caracteres = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (password.match(caracteres)) {
            alert(`Contraseña Valida!!`)
            console.log(`Contraseña validaaaa`);
        } else {
            alert(`Tu contraseña debe contener al menos una Mayuscula, una Minuscula, un nuemero y un Caracter Especial`)
            console.log(`Tu contraseña debe contener al menos una Mayuscula, una Minuscula y un Caracter Especial`);
            return; 
        }

        const datos = {
            carnet: parseInt(carnet, 10),
            nombre: nombre,
            apellido: apellido,
            genero: genero,
            correo: correo,
            facutad: facultad,
            carrera: carrera,
            contraseña: password,
            rol: 1
        }

        // Este método se encarga de comunicarse con el backend con un endpoint específico, en este caso /login
        fetch(`http://localhost:5000/usuarios`, {
            // Se especifica el tipo de método
            method: "POST",
            // Se parsea a json el cuerpo que se mandará
            body: JSON.stringify(datos),
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
                    const dataUser = res.user;
                    // Guardamos en las cookies lo que mandó el backend
                    setCookie('usuario', dataUser);
                    // Navegamos a la siguiente ruta que está en nuestro router
                    navigate('/login');
                    alert(`Su registro se ha completado, inicie sesion`);   
                } else {
                    // Si las credenciales están mal se muestra el siguiente mensaje.
                    alert(`Usuario existente`);
                    return;
                }
                // Se limpian los estados
                setCarnet("")
                setPassword("")
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="login-background">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className='Titulo'>
                        <h2 className='Titiloh2'>USOCIAL - PAGINA DE INICIO</h2>
                        <div className="col-md-6 mx-auto">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title text-center mb-4">Registro</h2>
                                    <form onSubmit={handleSubmit} className='form-signin w-100 m-auto'>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder="202400000"
                                                onChange={(e) => setCarnet(e.target.value)}
                                                value={carnet}
                                            />
                                            <label htmlFor="floatingInput">Numero de Carnet/Codigo USAC</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingCarnet"
                                                placeholder="Carnet"
                                                onChange={(e) => setNombre(e.target.value)}
                                               value={nombre}
                                            />
                                            <label htmlFor="floatingPassword">Nombres</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingNombre"
                                                placeholder="Nombre"
                                                onChange={(e) => setapellido(e.target.value)}
                                                value={apellido}
                                            />
                                            <label htmlFor="floatingPassword">Apellidos</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingGenero"
                                                placeholder="Genero"
                                                onChange={(e) => setgenero(e.target.value)}
                                                value={genero}
                                            />
                                            <label htmlFor="floatingPassword">Genero</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingEmail"
                                                placeholder="Email"
                                                onChange={(e) => setcorreo(e.target.value)}
                                                value={correo}
                                            />
                                            <label htmlFor="floatingPassword">Correo electronico</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingFacu"
                                                placeholder="Facu"
                                                onChange={(e) => setfacultad(e.target.value)}
                                                value={facultad}
                                            />
                                            <label htmlFor="floatingPassword">Facultad</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingCarrera"
                                                placeholder="Carrera"
                                                onChange={(e) => setcarrera(e.target.value)}
                                                value={carrera}
                                            />
                                            <label htmlFor="floatingPassword">Carrera</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="floatingPassword"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                            />
                                            <label htmlFor="floatingPassword">Contraseña</label>
                                        </div>
                                        <div className="form-floating" style={{ width: "100%" }}>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="floatingPassword2"
                                                placeholder="Password2"
                                                onChange={(e) => setconfiromar(e.target.value)}
                                                value={confiromar}
                                            />
                                            <label htmlFor="floatingPassword">Confirmar Contraseña</label>
                                        </div>
                                        <div className="Cuenta" style={{ width: "100%" }}>
                                            <label htmlFor="label1">Ya Tienes Cuenta?</label>
                                        </div>
                                        <div className="Cuenta" style={{ width: "100%" }}>
                                            <Link style={{ color: "blue" }} to="/login">
                                                INICIA SECION
                                            </Link>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-outline-primary btn-lg">Registrarse</button>
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

export default Registro;