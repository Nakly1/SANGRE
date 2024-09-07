// Cargar los archivos de audio
let audioCorrecto = new Audio('correcto.mp3');
let audioIncorrecto = new Audio('incorrecto.mp3');

let preguntas = [
    {
        pregunta: "La sangre es roja porque tiene oxígeno",
        respuesta: true,
        mensajeIncorrecto: "Así no es tonta, no ves que sin oxígeno la sangre sería azulada",
        imagen: "1.png" 
    },
    {
        pregunta: "La sangre lleva nutrientes a todo el cuerpo",
        respuesta: true,
        mensajeIncorrecto: "Es obvio que la sangre es esencial para llevar nutrientes y oxígeno",
        imagen: "2.png"
    },
    {
        pregunta: "El corazón bombea sangre a los pulmones primero",
        respuesta: true,
        mensajeIncorrecto: "NOOOO, La sangre primero va al cuerpo y luego a los pulmones",
        imagen: "3.png"
    },
    {
        pregunta: "Todas las personas tienen el mismo tipo de sangre",
        respuesta: false,
        mensajeIncorrecto: "No todos tienen el mismo tipo de sangre, hay diferentes tipos duhhhh",
        imagen: "4.png"
    },
    {
        pregunta: "El cuerpo humano tiene unos 5 litros de sangre",
        respuesta: true,
        mensajeIncorrecto: "la pipol tiene minimo 5 litros de sangre",
        imagen: "5.png"
    },
    {
        pregunta: "Las plaquetas son responsables de detener el sangrado",
        respuesta: true,
        mensajeIncorrecto: "Las plaquetas ayudan a coagular la sangre, entonces si",
        imagen: "6.png"
    },
    {
        pregunta: "El plasma es la parte líquida de la sangre",
        respuesta: true,
        mensajeIncorrecto: "MALOOOO, el plasma es la parte líquida de la sangre",
        imagen: "7.png"
    },
    {
        pregunta: "Los glóbulos rojos transportan oxígeno",
        respuesta: true,
        mensajeIncorrecto: "NoOOOOOOOOOO, Los glóbulos rojos llevan oxígeno por todo el cuerpo",
        imagen: "8.png"
    },
    {
        pregunta: "La sangre azulada es la que no tiene oxígeno",
        respuesta: true,
        mensajeIncorrecto: "Q NOOOO, la sangre sin oxígeno es azulada",
        imagen: "9.png"
    },
    {
        pregunta: "Qué tipo de linfocito es el más especializado en destruir células infectadas por virus y células cancerígenas?",
        opciones: [
            "Linfocitos B",
            "Linfocitos T citotóxicos",
            "Linfocitos NK (Natural Killer)",
            "Monocitos"
        ],
        respuestaCorrecta: 1, // Linfocitos T citotóxicos
        mensajeIncorrecto: "LA RESPUESTA ES: los linfocitos T citotóxicos son los más efectivos contra virus y cáncer",
        imagen: "li.jpg",
        esUltimaPregunta: true
    }
];

let indicePregunta = 0;
let contadorCorrectas = 0;
let preguntaRespondida = false; // Variable para verificar si la pregunta ya ha sido respondida

function mostrarPregunta() {
    let preguntaActual = preguntas[indicePregunta];
    let preguntaContainer = document.getElementById('pregunta-container');
    let imagen = document.getElementById('imagen-pregunta');
    let preguntaTexto = document.getElementById('pregunta');
    let opcionesContainer = document.getElementById('opciones');
    let mensaje = document.getElementById('mensaje');
    let botonSiguiente = document.getElementById('boton-siguiente');
    opcionesContainer.innerHTML = '';
    mensaje.innerHTML = '';
    botonSiguiente.style.display = 'none'; // Ocultar el botón "Siguiente" al cargar la pregunta
    preguntaRespondida = false; // Restablecer el estado de la pregunta respondida

    // Cambiar el fondo según la pregunta
    if (preguntaActual.esUltimaPregunta) {
        document.body.classList.remove('fondo-pregunta');
        document.body.classList.add('fondo-linfo');
    } else {
        document.body.classList.remove('fondo-linfo');
        document.body.classList.add('fondo-pregunta');
    }

    imagen.src = preguntaActual.imagen;
    preguntaTexto.innerText = preguntaActual.pregunta;

    if (preguntaActual.esUltimaPregunta) {
        preguntaActual.opciones.forEach((opcion, index) => {
            let boton = document.createElement('button');
            boton.innerText = opcion;
            boton.onclick = () => verificarRespuestaMultiple(index);
            opcionesContainer.appendChild(boton);
        });
    } else {
        let botonVerdadero = document.createElement('button');
        botonVerdadero.innerText = "Verdadero";
        botonVerdadero.onclick = () => verificarRespuesta(true);

        let botonFalso = document.createElement('button');
        botonFalso.innerText = "Falso";
        botonFalso.onclick = () => verificarRespuesta(false);

        opcionesContainer.appendChild(botonVerdadero);
        opcionesContainer.appendChild(botonFalso);
    }
}

function verificarRespuesta(respuestaUsuario) {
    let preguntaActual = preguntas[indicePregunta];
    let botonSiguiente = document.getElementById('boton-siguiente');

    if (!preguntaRespondida) { // Verificar si ya se ha respondido la pregunta
        if (respuestaUsuario === preguntaActual.respuesta) {
            document.getElementById('mensaje').innerText = "ASI SE HACE DOCTORA";
            audioCorrecto.play();  // Reproduce el sonido de respuesta correcta
            contadorCorrectas++; // Incrementar el contador solo si es correcto en el primer intento
            actualizarContadorCorrectas();
        } else {
            document.getElementById('mensaje').innerText = preguntaActual.mensajeIncorrecto;
            audioIncorrecto.play();  // Reproduce el sonido de respuesta incorrecta
        }
        preguntaRespondida = true; // Marcar la pregunta como respondida
        botonSiguiente.style.display = 'block'; // Mostrar el botón "Siguiente"
    }
}

function verificarRespuestaMultiple(index) {
    let preguntaActual = preguntas[indicePregunta];
    let botonSiguiente = document.getElementById('boton-siguiente');

    if (!preguntaRespondida) { // Verificar si ya se ha respondido la pregunta
        if (index === preguntaActual.respuestaCorrecta) {
            document.getElementById('mensaje').innerText = "ASI SE HACE DOCTORA";
            audioCorrecto.play();  // Reproduce el sonido de respuesta correcta
            contadorCorrectas++; // Incrementar el contador solo si es correcto en el primer intento
            actualizarContadorCorrectas();
        } else {
            document.getElementById('mensaje').innerText = preguntaActual.mensajeIncorrecto;
            audioIncorrecto.play();  // Reproduce el sonido de respuesta incorrecta
        }
        preguntaRespondida = true; // Marcar la pregunta como respondida
        botonSiguiente.style.display = 'block'; // Mostrar el botón "Siguiente"
    }
}

function siguientePregunta() {
    indicePregunta++;
    if (indicePregunta < preguntas.length) {
        mostrarPregunta();
    } else {
        document.getElementById('pregunta-container').innerHTML = "<h2>VAMOS MI AMOR</h2><p>tu puntuacion (ojala hayas sacado una buena): " + contadorCorrectas + "</p>";
    }
}

function actualizarContadorCorrectas() {
    document.getElementById('contador-correctas').innerText = "Preguntas correctas: " + contadorCorrectas;
}

mostrarPregunta();
