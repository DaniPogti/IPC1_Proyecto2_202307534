const fs = require('fs'); //libreria para leer archivos
const express = require('express');
const servidor = express();
const bodyParser = require('body-parser');
servidor.use(bodyParser.json({ limit: '15mb' }));
const cors = require('cors');


const puerto = 5000;
const NomArchivo = 'Usuarios.json'; //variable para almacenar datos en archivo .json
const NomArchivo2 = 'Publicacion.json';

servidor.use(bodyParser.json());
servidor.use(cors());

//Base de datos ejemplo tipo array
let dataUsuarios = [];
let dataPublicaciones= [];

//si el archivo json no existe, lo crea y añade la matriz
if (!fs.existsSync(NomArchivo)) {
    fs.writeFileSync(NomArchivo, JSON.stringify(dataUsuarios));
} else {
    // si existe el archivo mete los datos al archivo, sobreescribe contenido del archivo, actualiza conforme ejecucion
    const datosArchivo = fs.readFileSync(NomArchivo, 'utf-8');
    dataUsuarios = JSON.parse(datosArchivo);
}

//si el archivo json no existe, lo crea y añade la matriz
if (!fs.existsSync(NomArchivo2)) {
    fs.writeFileSync(NomArchivo2, JSON.stringify(dataPublicaciones));
} else {
    // si existe el archivo mete los datos al archivo, sobreescribe contenido del archivo, actualiza conforme ejecucion
    const datosArchivo = fs.readFileSync(NomArchivo2, 'utf-8');
    dataPublicaciones = JSON.parse(datosArchivo);
}

//creando un endpoint sencillo
servidor.get("/", (req, res) => {
    let saludo = {
        Saludo: "Hola"
    };
    res.json(saludo);
});

servidor.get("/usuarios", (req, res) => { // obtiene la matriz
    res.json(dataUsuarios)
});

servidor.get("/getPublicaciones", (req, res) => { // obtiene la matriz
    res.json(dataPublicaciones)
});
//--------------FILATRAR POR CARNETS----------------------
servidor.get("/usuarios/:carnet", (req, res) => { // filtrar datos por  carnet
    const carnet = parseInt(req.params.carnet);
    console.log("Carnet buscado:", carnet);
    const usuario = dataUsuarios.find(usuarios => usuarios.carnet === carnet);
    console.log("Usuario encontrado:", usuario);
    if (!usuario) {
        res.status(404).send({ response: 'NO SE ENCONTRO!!! filtrado' })
    } else {
        res.json(usuario)
    }
    //res.json(dataEstudiantes);
});

//--------------AÑADIR USUARIO NUEVO----------------------
servidor.post("/usuarios", (req, res) => { // añadir elementos a matriz req para obtener info
    const nuevoUsuario = req.body;
    const guardarUsuario ={
        carnet: nuevoUsuario.carnet,// añade al arreglo en su posicion 0 + 1
        nombre: nuevoUsuario.nombre, //del objeto json que venga del frontend se guarda en descripcion
        apellido: nuevoUsuario.apellido,
        genero: nuevoUsuario.genero,
        correo: nuevoUsuario.correo,
        facutad: nuevoUsuario.facutad,
        carrera: nuevoUsuario.carrera,
        contraseña: nuevoUsuario.contraseña,
        rol: 1
    };
    dataUsuarios.push(guardarUsuario); //push agrega elementos en javascrip
    actualizarDatosArchivo(); //llamar metodo para actualizar
    res.status(201).send({ response: "USUARIO AÑADIDO CORRECTAMENTE" })

});

//--------------CARGA MASIVA USUARIO----------------------
servidor.post("/cargauser", (req, res) => {
    const cargauser = req.body;
    const usercarga = [];
    // Recorremos los nuevos usuarios y los agregamos al array dataUsuarios
    cargauser.forEach((carga) => {
        // Si el usuario se repite
        const userRepetido = dataUsuarios.find((user) => user.carnet === carga.carnet);
        if (userRepetido) {
            // si existe se salta el user
            console.log(`${carga.carnet}Este usuario ya existia, :(`);
        } else {
            dataUsuarios.push(carga);
            usercarga.push(carga);// se añade el user
            console.log(`Se añadio: ${JSON.stringify(carga)}`);
        }
    });
    actualizarDatosArchivo(); 
    res.status(201).json({ usuariosAñadidos }); // se envia el usuario almacenado
});

//--------------CARGA MASIVA POST----------------------
servidor.post("/cargapost", (req, res) => {
    const cargapost = req.body;
    const postcarga = [];
    // Recorremos los nuevos usuarios y los agregamos al array dataUsuarios
    cargapost.forEach((carga) => {
        // Si el usuario se repite
        const Repetido = dataPublicaciones.find((post) => post.id === carga.id);
        if (Repetido) {
            // si existe se salta el post
            console.log(`${carga.id}Este usuario ya existia, :(`);
        } else {
            dataPublicaciones.push(carga);
            postcarga.push(carga);// se añade el post
            console.log(`Se añadio: ${JSON.stringify(carga)}`);
        }
    });
    actualizarDatosArchivo2(); 
    res.status(201).json({ postAñadidos }); // se envia el usuario almacenado
});

//--------------AÑADIR PUBLICACION NUEVO----------------------
servidor.post("/crearPublicacion", (req, res) => { // añadir elementos a matriz req para obtener info
    const nuevoPost = req.body;
    const guardarPost ={
        id: (dataPublicaciones.length + 1),// añade al arreglo en su posicion 0 + 1
        descripcion: nuevoPost.descripcion, //del objeto json que venga del frontend se guarda en descripcion
        imagen: nuevoPost.imagen,
        nombre: nuevoPost.nombre,
        carfacu: nuevoPost.carfacu,
        categoria: nuevoPost.categoria,
        like: nuevoPost.like,
        fecha: nuevoPost.fecha
    };
    dataPublicaciones.push(guardarPost); //push a java
    actualizarDatosArchivo2(); //actualizar
    res.status(201).send({ response: "PUBLICACION AÑADIDO CORRECTAMENTE" })

});

//recibir y validar datos del usuario a loggear, validando contraseña 
servidor.post('/login', (req, res) => {
    const datos = req.body;
    console.log(datos)//imprimir en terminal
    const usuario = dataUsuarios.find(usuario => {
        console.log(usuario.carnet)
        console.log(usuario.contraseña)
        if (usuario.carnet === datos.carnet && usuario.contraseña === datos.contraseña) {
            return usuario
        }
    });
    if (!usuario) {
        const retornar = {
            encontrado: false,
            user: null
        }
        res.status(404).send(retornar);
    } else {
        const retornar = {
            encontrado: true,
            user: usuario
        }
        res.json(retornar);
    }
});


//--------------ACTUALIZAR USUARIO----------------------
servidor.put("/usuarios/:carnet", (req, res) => { // edidat elementos a matriz req para obtener info
    const carnet = parseInt(req.params.carnet);
    const actualizarUsuario = req.body;
    const indice = dataUsuarios.findIndex(usuarios => usuarios.carnet === carnet)//encontrar el indice donde se encuentra el user 
    if (indice === -1) {
        res.status(404).send({ response: 'NO SE ENCONTRO!!!' })
    } else {
        dataUsuarios[indice].nombre = actualizarUsuario.nombre;
        dataUsuarios[indice].apellido = actualizarUsuario.apellido;
        dataUsuarios[indice].genero = actualizarUsuario.genero;
        dataUsuarios[indice].correo = actualizarUsuario.correo;
        dataUsuarios[indice].facutad = actualizarUsuario.facutad;
        dataUsuarios[indice].carrera = actualizarUsuario.carrera;
        dataUsuarios[indice].contraseña = actualizarUsuario.contraseña;
        actualizarDatosArchivo();
        res.status(201).send({ response: "ACTUALIZADO CORRECTAMENTE" });
    }
});

//--------------ACTUALIZAR PUBLICACION----------------------
servidor.put("/getPublicaciones/:id", (req, res) => { 
    const id = parseInt(req.params.id);
    const actualizarLike = req.body;
    const indice = dataPublicaciones.findIndex(publicacion => publicacion.id === id)
    if (indice === -1) {
        res.status(404).send({ response: 'NO SE ENCONTRO!!!' })
    } else {
        dataPublicaciones[indice].like = actualizarLike.like;
        actualizarDatosArchivo2();
        res.status(201).send({ response: "LIKE ACTUALIZADO CORRECTAMENTE" });
    }
});

//--------------ELIMINAR USUARIO----------------------
servidor.delete("/usuarios/:carnet", (req, res) => { // eliminar elementos a matriz
    const carnet = parseInt(req.params.carnet);
    // const actualizarEstudiante = req.body;
    console.log(carnet)
    const indice = dataUsuarios.findIndex(usuario => {//encontrar el indice donde se encuentra 
        console.log(usuario.carnet)
        if(usuario.carnet === carnet){
            console.log("Elemento encontrado")
            return usuario
        }
    });

    if (indice === -1) {
        res.status(404).send({ response: 'NO SE ENCONTRO!!!' })
    } else {
        dataUsuarios.splice(indice, 1);
        actualizarDatosArchivo();
        res.status(201).send({ response: "Eliminado CORRECTAMENTE" });
    }


});

//--------------ELIMINAR PUBLICACION----------------------
servidor.delete("/getPublicaciones/:id", (req, res) => { // eliminar elementos a matriz 
    const id = parseInt(req.params.id);
    // const actualizarEstudiante = req.body;
    console.log(id)
    const indice = dataPublicaciones.findIndex(post => {//encontrar el indice 
        console.log(post.id)
        if(post.id === id){
            console.log("Elemento encontrado")
            return post
        }
    });

    if (indice === -1) {
        res.status(404).send({ response: 'NO SE ENCONTRO!!!' })
    } else {
        dataPublicaciones.splice(indice, 1);
        actualizarDatosArchivo2();
        res.status(201).send({ response: "Post Eliminado CORRECTAMENTE" });
    }


});

//iniciar el servidor en el puerto espesificado
servidor.listen(puerto, () => {
    console.log(`Servidor en el puerto ${puerto}`);

});

//--------------REFRESCAR MATRIZ----------------------
//actualiza el archivo json con el arreglo
function actualizarDatosArchivo() {
    fs.writeFileSync(NomArchivo, JSON.stringify(dataUsuarios));
}

//actualiza el archivo json con el arreglo
function actualizarDatosArchivo2() {
    fs.writeFileSync(NomArchivo2, JSON.stringify(dataPublicaciones));
}

function validarContraseña(contra){
    const caracteres=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (contra.value.match(caracteres)) {
        alert(`Contraseña Valida!!`)
        console.log(`Contraseña validaaaa`);
    } else {
        alert(`Tu contraseña debe contener al menos una Mayuscula, una Minuscula y un Caracter Especial`)
        console.log(`Tu contraseña debe contener al menos una Mayuscula, una Minuscula y un Caracter Especial`);
    }
}