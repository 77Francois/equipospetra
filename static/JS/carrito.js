const contenedorEquipos = document.getElementById("contenedor-equipos");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const vacioElement = document.getElementById("vacio");
const totalesElement = document.getElementById("totales");
const reiniciaCarritoComprasElement = document.getElementById("boton-com-recete");

function crearVentanaCarrito(){  // recibo un array de prod-equipos prodEquipos
    contenedorEquipos.innerHTML = "";
    const equipos = JSON.parse(localStorage.getItem("equipos"));
    console.log(equipos)
    if(equipos && equipos.length > 0){
         equipos.forEach(equipo => {
            const newEquipo = document.createElement("div");
            newEquipo.classList = "ventana-carrito";
            newEquipo.innerHTML = `
                <img src="../static/img/camaras/${equipo.img}">
                <h3>${equipo.nombre}</h3>
                <span>$${equipo.precio}</span>
                <div>
                    <button>-</button>
                    <span class="cantidad">${equipo.cantidad}</span>
                    <button>+</button>
                </div>
            `;
            contenedorEquipos.appendChild(newEquipo);
            newEquipo
                .getElementsByTagName("button")[1]
                .addEventListener("click",(e)=> {
                    const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                    cuentaElement.innerText = agregarCarrito(equipo);
                    actualizarTotales();
                });
            newEquipo
                .getElementsByTagName("button")[0]
                .addEventListener("click",(e)=> {
                    sacarCarrito(equipo);
                    crearVentanaCarrito();
                    //const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];    
                    actualizarTotales();
                });
                
        });
    }
}

crearVentanaCarrito(); // equipos
actualizarTotales();

// function actualizarTotales(){
//     const equipos = JSON.parse(localStorage.getItem("equipos"));
//     let unidades =0;
//     let precio = 0;
//     if(equipos && equipos.length>0){
//         equipos.forEach(equipo => {
//             unidades += equipo.cantidad;
//             precio += equipo.precio * equipo.cantidad;
//         });
//         unidadesElement.innerText = unidades;
//         precioElement.innerText = precio;
//     }
// }   no me gusto la funcion asi !!!
function actualizarTotales() { 
    const equipos = JSON.parse(localStorage.getItem("equipos")); 
    let unidades = 0; 
    let precio = 0; 
    if (equipos && equipos.length > 0) { 
        equipos.forEach(equipo => { 
            unidades += equipo.cantidad; 
            precio += equipo.precio * equipo.cantidad; 
        }); 
        unidadesElement.innerText = unidades; 
        precioElement.innerText = precio; 
        // Mostrar los elementos totales y precios 
        unidadesElement.parentElement.style.display = "block"; 
        precioElement.parentElement.style.display = "block"; 
    } else { 
        // Ocultar los elementos totales y precios si no hay equipos 
        unidadesElement.innerText = 0; 
        precioElement.innerText = 0; 
        unidadesElement.parentElement.style.display = "none"; 
        precioElement.parentElement.style.display = "none"; 
    } 
    comprar(); 
}

function comprar(){
    const equip = JSON.parse(localStorage.getItem("equipos"));
    console.log(equip, equip == true);
    vacioElement.classList.toggle("paraOcultar",equip && equip.length > 0);
    totalesElement.classList.toggle("paraOcultar",!(equip && equip.length > 0));
}
comprar();

reiniciaCarritoComprasElement.addEventListener("click",reiniciarCarritoCompras);
function reiniciarCarritoCompras(){
    localStorage.removeItem("equipos");
    actualizarTotales();
    crearVentanaCarrito();
}