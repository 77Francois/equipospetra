const contenedorEquipos = document.getElementById("contenedor-equipos");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const vacioElement = document.getElementById("vacio");
const totalesElement = document.getElementById("totales");
const reiniciaCarritoComprasElement = document.getElementById("boton-com-recete");
const contadorCarritoElement = document.getElementById("contador-carrito");

function crearVentanaCarrito() {
    contenedorEquipos.innerHTML = "";
    const equipos = JSON.parse(localStorage.getItem("equipos"));
    if (equipos && equipos.length > 0) {
        equipos.forEach(equipo => {
            const newEquipo = document.createElement("div");
            newEquipo.classList = "ventana-carrito";
            newEquipo.innerHTML = `
                <img src="../static/img/camaras/${equipo.img}">
                <h3>${equipo.nombre}</h3>
                <span>$${equipo.precio}</span>
                <span>Stock: ${equipo.stock}</span>
                <div>
                    <button>-</button>
                    <span class="cantidad">${equipo.cantidad}</span>
                    <button>+</button>
                </div>
            `;
            contenedorEquipos.appendChild(newEquipo);
            newEquipo
                .getElementsByTagName("button")[1]
                .addEventListener("click", (e) => {
                    if (equipo.cantidad < equipo.stock) {
                        const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                        cuentaElement.innerText = agregarCarrito(equipo);
                        actualizarTotales();
                    } else {
                        alert("No hay stock suficiente disponible");
                    }
                });
            newEquipo
                .getElementsByTagName("button")[0]
                .addEventListener("click", (e) => {
                    sacarCarrito(equipo);
                    crearVentanaCarrito();
                    actualizarTotales();
                });
        });
    }
}

function agregarCarrito(equipo) {
    const memoria = JSON.parse(localStorage.getItem("equipos"));
    let cuenta = equipo.cantidad;
    if (!memoria) {
        const newEquipo = getNuevoEquipoMemoria(equipo);
        localStorage.setItem("equipos", JSON.stringify([newEquipo]));
        cuenta = 1;
    } else {
        const indiceEquipo = memoria.findIndex(equip => equip.id === equipo.id);
        const nuevaMemoria = memoria;
        if (indiceEquipo === -1) {
            nuevaMemoria.push(getNuevoEquipoMemoria(equipo));
            cuenta = 1;
        } else {
            if (nuevaMemoria[indiceEquipo].cantidad < equipo.stock) {
                nuevaMemoria[indiceEquipo].cantidad++;
                cuenta = nuevaMemoria[indiceEquipo].cantidad;
            } else {
                alert("No hay stock suficiente disponible, puede elegir esta cantidad o disminuirla");
                cuenta = equipo.stock;
            }
        }
        localStorage.setItem("equipos", JSON.stringify(nuevaMemoria));
    }
    contadorCircular();
    return cuenta;
}

function sacarCarrito(equipo) {
    const memoria = JSON.parse(localStorage.getItem("equipos"));
    const indiceEquipo = memoria.findIndex(equip => equip.id === equipo.id);
    if (memoria[indiceEquipo].cantidad === 1) {
        memoria.splice(indiceEquipo, 1);
    } else {
        memoria[indiceEquipo].cantidad--;
    }
    localStorage.setItem("equipos", JSON.stringify(memoria));
    contadorCircular();
}

function getNuevoEquipoMemoria(equipo) {
    const newEquipo = equipo;
    newEquipo.cantidad = 1;
    return newEquipo;
}

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
        unidadesElement.parentElement.style.display = "block";
        precioElement.parentElement.style.display = "block";
    } else {
        unidadesElement.innerText = 0;
        precioElement.innerText = 0;
        unidadesElement.parentElement.style.display = "none";
        precioElement.parentElement.style.display = "none";
    }
    comprar();
}

function comprar() {
    const equip = JSON.parse(localStorage.getItem("equipos"));
    vacioElement.classList.toggle("paraOcultar", equip && equip.length > 0);
    totalesElement.classList.toggle("paraOcultar", !(equip && equip.length > 0));
}

reiniciaCarritoComprasElement.addEventListener("click", reiniciarCarritoCompras);
function reiniciarCarritoCompras() {
    localStorage.removeItem("equipos");
    actualizarTotales();
    crearVentanaCarrito();
}

function contadorCircular() {
    const memoria = JSON.parse(localStorage.getItem("equipos"));
    if (memoria && memoria.length > 0) {
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        contadorCarritoElement.innerText = cuenta;
    } else {
        contadorCarritoElement.innerText = 0;
    }
}

// Inicializo las funciones al cargar la página
crearVentanaCarrito();
actualizarTotales();
contadorCircular();
