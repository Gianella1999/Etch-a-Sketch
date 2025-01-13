// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

let jugar = document.getElementsByTagName("button")[0]; // Boton "Jugar" 
jugar.addEventListener("click", validacion); // Llamada al evento "validacion" al hacer click

//----- Comprobaciones 
function validacion(){
    let nameJugador = document.getElementsByName("nombre")[0].value; //Captura el valor del primer input  "nombre"
    let partidas = document.getElementsByName("partidas")[0].value;  //Captura el valor del segundo input  "partidas"
    let input = document.getElementsByTagName("input"); // Captura los campos "imput"
    let numPartidas = Number(partidas);
    //----- Verificacion de los campos que sean validos
    if( nameJugador.length < 4 || !isNaN (nameJugador.charAt(0)) || numPartidas <= 0 ){
        //------ Verifica que nombre sea valido, mas de 3 caracteres y el primero de ellos no comience por numero
        if(nameJugador.length < 4 || !isNaN (nameJugador.charAt(0))){
            input[0].classList.add("fondoRojo"); // si no es valido el campo añadiremos la clase "fondoRojo"
        }else{
            input[0].classList.remove("fondoRojo"); // si es valido el campo quitaremos la clase "fondoRojo"
        }
        //------ Verifica la cantidad de partidas es valida si es mayor que 0
        if(numPartidas <= 0){
            input[1].classList.add("fondoRojo");  // si no es valido el campo añadiremos la clase "fondoRojo"
        }else{
            input[1].classList.remove("fondoRojo"); // si es valido el campo quitaremos la clase "fondoRojo"
        }
    //----- Si todo es valido ya se puede puede empezar a jugar
    }else{ 
        input[0].classList.remove("fondoRojo"); // quitaremos la clase "fondoRojo"
        input[1].classList.remove("fondoRojo"); 
        input[0].disabled = true; // desactivamos los campos con los datos
        input[1].disabled = true;
        const totalPartidas = document.getElementById("total"); 
        totalPartidas.textContent = partidas; // añadimos al total de partidas con el valor introducido
  
        // Se cargan las imagenes de las opciones del jugador
        const piedra = document.getElementsByTagName("img")[0];
        piedra.src ="img/piedraJugador.png";
        piedra.classList.remove('seleccionado');
        piedra.classList.add('noSeleccionado');
        const papel = document.getElementsByTagName("img")[1];
        papel.src ="img/papelJugador.png";
        const tijera = document.getElementsByTagName("img")[2];
        tijera.src ="img/tijeraJugador.png";
    }
}

//----- Elección y tirada

let opcionesJugador = document.querySelectorAll('#jugador img'); // Captura las opciones del jugador dentro de un NodeList
let arrayImg = Array.from(opcionesJugador); // convierte NodeList en un array

//----- Seleccion jugador 
arrayImg.forEach((img => { 
    // Llamada al evento cada ves que una se las opciones es clicada
    img.addEventListener('click', () => {
        // Eliminar la clase 'seleccionado' de todas las imágenes y añade la clase 'noSeleccionado'
        arrayImg.forEach(img => { // recorre para ponerlas todas a 'noSeleccionada'
        img.classList.remove('seleccionado');
        img.classList.add('noSeleccionado');   
      });
        // Elimina la clase 'noSeleccionado' y agregar la clase 'seleccionado' a la imagen clicada
        img.classList.remove('noSeleccionado');
        img.classList.add('seleccionado');
    });
}));

let ya = document.getElementsByTagName("button")[1]; // Boton "Ya" (generar opcion del ordenador y iniciar el juego)
//---- Seleccion Ordenador
ya.addEventListener("click", eleccionOrdenador)   // Llamada al evento "eleccionOrdenador" al hacer click
function eleccionOrdenador(){


    const indiceRandom= Math.floor(Math.random() * posibilidades.length); // Genera una opcion aleatoria a partir del array 
    const opcionRandom = posibilidades[indiceRandom];
    const eleccionOrdenador = document.getElementsByTagName("img")[3];
        if(opcionRandom =="piedra"){
            eleccionOrdenador.src ="img/piedraOrdenador.png";
        }else if(opcionRandom =="papel"){
            eleccionOrdenador.src ="img/papelOrdenador.png";
        }else {    
            eleccionOrdenador.src ="img/tijeraOrdenador.png";
        }

    // Capturo el span "actual" lleva la cuenta de la ronda en la que vas
    const actualPartidas = document.getElementById("actual");
    actualPartidas.innerHTML = Number(actualPartidas.innerHTML) + 1;
		
    calcularResultado(indiceRandom); // Llamada a la funcion calcularResultado

    // Capturar el span "total" (suponiendo que existe un elemento con id "total")
    const totalPartidasElement = document.getElementById("total");
    const totalPartidasValor = Number(totalPartidasElement.innerHTML);
 
     //--- Controla que no se juegen rondas de mas, compara y deshabilitar el botón "Ya"
     if (Number(actualPartidas.innerHTML) === totalPartidasValor) {
        ya.disabled = true;
     }
};

//---- Calculo resultado y historial de partidas
function calcularResultado(mIndex) { 
    
    let nombre = document.getElementsByName("nombre")[0].value; // Capturamos el nombre del jugador 
    // Encuentra el índice de la selección del jugador
    const jIndex = arrayImg.findIndex(img => img.classList.contains('seleccionado'));

    //--- Calcula el ganador mediante los indices de eleccion del jugador y la maquina 
    if(jIndex==0 && mIndex==2 || jIndex==1 && mIndex==0 || jIndex==2 && mIndex== 1 ){
        historial.innerHTML += `<li>Gana ${nombre}</li>`;
    }else if (mIndex==0 && jIndex==2 || mIndex==1 && jIndex== 0 || mIndex==2 && jIndex== 1 ) {
        historial.innerHTML += '<li>Gana la máquina</li>';
    }else {
        historial.innerHTML += '<li>Empate</li>';
    }
} 

//---- Reset del juego
let botonReset = document.getElementsByTagName("button")[2]; //Boton "Reset" (reinicia el juego)
botonReset.addEventListener("click", resetJuego) // Llamada al evento "resetJuego" al hacer click

function resetJuego() {
    let respuesta = confirm("¿Deseas iniciar una nueva partida?"); // Creacion un confirm para confirmar que el usuario quiere un reset
    // Si la respuesta es "true" hara lo del dentro del "if" sino no hara nada
    if(respuesta){

        //--- Añadimos al historial el mensaje "Nueva Partida"
        historial.innerHTML += '<li>Nueva partida </li>\n';  
        // Capturamos los campos "input"
	    let nameJugador= document.getElementsByTagName("input")[0];
	    let partidas = document.getElementsByTagName("input")[1];
        //--- Activamos los campos nuevamente
	    nameJugador.disabled = false; 
	    partidas.disabled = false;
        //--- Reiniciamos a 0, la partida y los contadores "total" y "actual"
	    partidas.value = 0; 
	    total.innerHTML = "0";
	    actual.innerHTML = "0";
        //--- Ponemos la imagen por defecto en la opcion maquina
        const eleccionOrdenador = document.getElementsByTagName("img")[3];
        eleccionOrdenador.src ="img/defecto.png";
        ya.disabled = false;
    }         
}