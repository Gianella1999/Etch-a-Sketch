
// Constante Global
const contenedor = document.querySelector(".contenedor");
const sizeContainer = 592;

//Creacion de 16x16 por defecto
createDivs(16);

// Promp cantidad de cuadrador por lado para la nueva cuadricula
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
    let number = parseInt(prompt("Ingresa un valor del 1 al 100"));
    // llama a la funcion de creacion nueva de divs
    if(number != null && number <= 100){
        deleteDivs();
        createDivs(number);
    }
});

// formatear div container
function deleteDivs(){
    while (contenedor.firstChild) {
     contenedor.removeChild(contenedor.firstChild);
    }
}

//Creacion divs
function createDivs(num){
    for(let i=1; i <= (num*num);i++ ){
        let div = document.createElement("div");
        div.setAttribute("id", "divhijo");
        let sizehijo = sizeContainer / num;
        div.style.width =`${sizehijo}px`;
        div.style.height =`${sizehijo}px`;
        contenedor.appendChild(div);  
    }
    colorear();
}
// Evento de pasar por encima para colorear 

function colorear(){

let divhijos = document.querySelectorAll("#divhijo");
divhijos.forEach(divhijo => {
    divhijo.addEventListener("mouseout", () => {      
        divhijo.style.backgroundColor = colorBackground();
    });   
});

}
// funcion color ramdon xd
function colorBackground(){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;

}
