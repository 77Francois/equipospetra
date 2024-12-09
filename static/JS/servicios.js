const contenedorEquipos = document.getElementById("contenedor-equipos");

function crearVentanaCarrito(){  // recibo un areray de prod-equipos prodEquipos
    equipos.forEach(equipo => {
        const newEquipo = document.createElement("div");
        newEquipo.classList = "ventana-carrito";
        newEquipo.innerHTML = `
            <h2>${equipo.nombre}</h2>
            <img src="../static/img/camaras/${equipo.img}">
            <br>
            <br>
            <span>$${equipo.precio}</span>
            <br>
            <br>
            <button id="boton-agregar">Agregar</button>
        ` 
        contenedorEquipos.appendChild(newEquipo);
        newEquipo.getElementsByTagName("button")[0].addEventListener("click",()=> agregarCarrito(equipo))
    });
}

crearVentanaCarrito(); // equipos