function agregarCarrito(equipo){
    const memoria = JSON.parse(localStorage.getItem("equipos"));
    console.log(memoria);
    let cuenta = 0;
    if(!memoria){
        const newEquipo = getNuevoEquipoMemoria(equipo);
        localStorage.setItem("equipos",JSON.stringify([newEquipo]));
        cuenta = 1;
    } else {
        const indiceEquipo = memoria.findIndex(equip => equip.id === equipo.id);
        console.log(indiceEquipo)
        const nuevaMemoria = memoria;
        if(indiceEquipo === -1){
            nuevaMemoria.push(getNuevoEquipoMemoria(equipo));
            cuenta = 1;
        }else{
            nuevaMemoria[indiceEquipo].cantidad ++ ;
            cuenta = nuevaMemoria[indiceEquipo].cantidad;
        }
        localStorage.setItem("equipos",JSON.stringify(nuevaMemoria));
        
    }
    contadorCircular();  
    return cuenta;
}
function sacarCarrito(equipo){
    const memoria = JSON.parse(localStorage.getItem("equipos"));  // creo la memoria
    const indiceEquipo = memoria.findIndex(equip => equip.id === equipo.id);
    if(memoria[indiceEquipo].cantidad === 1){
        memoria.splice(indiceEquipo,1);
        
    }else{
        memoria[indiceEquipo].cantidad--;
    }
    localStorage.setItem("equipos",JSON.stringify(memoria)); // guardo en memoria
    contadorCircular();
    
}
// agarra un equipo le agrega cantidad =1 y lo regresa
function getNuevoEquipoMemoria(equipo){
    const newEquipo = equipo;
    newEquipo.cantidad = 1;
    return newEquipo;
}
const contadorCarritoElement = document.getElementById("contador-carrito");
function contadorCircular(){
    const memoria = JSON.parse(localStorage.getItem("equipos"));  // creo la memoria
    if(memoria && memoria.length > 0){
        const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0);
        contadorCarritoElement.innerText = cuenta;
    }else{
        contadorCarritoElement.innerText = 0;
    }
    
}
contadorCircular();