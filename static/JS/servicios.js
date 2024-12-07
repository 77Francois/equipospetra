const contenedorEquipos = document.getElementById("contenedor-equipos");

function crearVentanaCarrito(){  // recibo un areray de prod-equipos prodEquipos
    equipos.forEach(equipo => {
        const newEquipo = document.createElement("div");
        newEquipo.classList = "ventana-carrito";
        newEquipo.innerHTML = `
            <h2>${equipo.nombre}</h2>
            <img src="../img/camaras/${equipo.img}">
            <span>${equipo.precio}</span>
            <br>
            <button>Agregar</button>
        ` 
        contenedorEquipos.appendChild(newEquipo);
    });
}

crearVentanaCarrito(); // equipos