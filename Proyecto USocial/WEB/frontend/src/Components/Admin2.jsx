import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
                setUsuario(res);
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
}