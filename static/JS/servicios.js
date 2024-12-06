const contenedorEquipos = document.getElementById("contenedor-equipos");

function crearVentanaCarrito(prodEquipos){  // recibo un areray de prod-equipos
    prodEquipos.forEach(equipo => {
        const newEquipo = document.createElement("div");
        newEquipo.classList = "ventana-carrito";
        newEquipo.innerHTML = `
            <img src="../img/camaras/${equipo.id}.jpg">
            <h3>${equipo.nombre}</h3>
            <span>${equipos.precio}</span>
            <button>Agregar al carrito</button>
        `
        
        contenedorEquipos.appendChild(newEquipo);
    });
}

crearVentanaCarrito(equipos);