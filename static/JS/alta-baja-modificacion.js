class Producto {  
    constructor(id, producto, precio, categoria, imagen) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

function muestraProductos() {
    let productossss = JSON.parse(localStorage.getItem('productossss')) || [];
    console.log(JSON.parse(localStorage.getItem('productossss')));
    const tbModificacion = document.querySelector('#tb-modificaciones');
    tbModificacion.innerHTML = '';
    productossss.forEach(prod => {
        const tr = `
            <tr>
                <td>${prod.categoria}</td>
                <td>${prod.producto}</td>
                <td>${prod.precio}</td>
                <td>
                    <img src="${prod.imagen}" alt="${prod.producto}" width="140px" height="129px">
                </td>
                <td>
                    <button class="boton-borrar" onclick="borrarProducto(${prod.id})">BORRAR</button>
                    <button class="boton-modificar" onclick="editarProducto(${prod.id})">MODIFICAR</button>
                </td>
            </tr>
        `;
        tbModificacion.insertAdjacentHTML('beforeend', tr);
    });
}

function guardaProductos(event) {
    event.preventDefault();
    const entradaProducto = document.querySelector('#campo-name');
    const entradaPrecio = document.querySelector('#campo-price');
    const entradaCategoria = document.querySelector('#campo-category');
    const entradaImagen = document.querySelector('#campo-image');
    const idProducto = document.querySelector('#id-product').value;

    let productossss = JSON.parse(localStorage.getItem('productossss')) || [];

    if (idProducto) {
        // Editar producto existente
        productossss = productossss.map(prod => {
            if (prod.id == idProducto) {
                return new Producto(
                    prod.id,
                    entradaProducto.value,
                    entradaPrecio.value,
                    entradaCategoria.value,
                    entradaImagen.value
                );
            }
            return prod;
        });
    } else {
        // Agregar nuevo producto
        const newProducto = new Producto(
            productossss.length + 1,
            entradaProducto.value,
            entradaPrecio.value,
            entradaCategoria.value,
            entradaImagen.value
        );
        productossss.push(newProducto);
    }

    localStorage.setItem('productossss', JSON.stringify(productossss));
    console.log(JSON.parse(localStorage.getItem('productossss')));
    muestraProductos();
    document.querySelector('#form-productos').reset();
    document.querySelector('#id-product').value = '';
}

function borrarProducto(id) {
    let productossss = JSON.parse(localStorage.getItem('productossss')) || [];
    productossss = productossss.filter(prod => prod.id !== id);
    localStorage.setItem('productossss', JSON.stringify(productossss));
    muestraProductos();
}

function editarProducto(id) {
    let productossss = JSON.parse(localStorage.getItem('productossss')) || [];
    const producto = productossss.find(prod => prod.id === id);
    if (producto) {
        document.querySelector('#campo-category').value = producto.categoria;
        document.querySelector('#campo-name').value = producto.producto;
        document.querySelector('#campo-price').value = producto.precio;
        document.querySelector('#campo-image').value = producto.imagen;
        document.querySelector('#id-product').value = producto.id;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    muestraProductos();
    document.querySelector('#form-productos').addEventListener('submit', guardaProductos);
});
