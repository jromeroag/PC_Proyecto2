const moneda = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

export class ProductoView {
    constructor() {
        this.lista = document.querySelector('#listaProductos');
        this.busqueda = document.querySelector('#buscar');
        this.categoria = document.querySelector('#categoria');
        this.resultado = document.querySelector('#resultado');
    }

    mostrarCategorias(categorias) {
        this.categoria.replaceChildren(new Option('Todas las categorías', 'todos'));
        categorias.forEach((categoria) => this.categoria.add(new Option(categoria, categoria)));
    }

    obtenerFiltros() {
        return { busqueda: this.busqueda.value, categoria: this.categoria.value };
    }

    alCambiarFiltros(callback) {
        this.busqueda.addEventListener('input', callback);
        this.categoria.addEventListener('change', callback);
    }

    alAgregarProducto(callback) {
        this.lista.addEventListener('click', (evento) => {
            const boton = evento.target.closest('[data-agregar]');
            if (boton) callback(Number(boton.dataset.agregar));
        });
    }

    mostrarProductos(productos) {
        this.lista.replaceChildren();
        this.resultado.textContent = `${productos.length} ${productos.length === 1 ? 'producto encontrado' : 'productos encontrados'}`;
        if (!productos.length) {
            const mensaje = document.createElement('p');
            mensaje.className = 'sin-resultados';
            mensaje.textContent = 'No encontramos productos con esos filtros. Prueba otra búsqueda.';
            this.lista.append(mensaje);
            return;
        }
        productos.forEach((producto) => {
            const tarjeta = document.createElement('article');
            tarjeta.className = 'producto';
            const icono = document.createElement('div');
            icono.className = 'producto-icono';
            icono.setAttribute('aria-hidden', 'true');
            icono.textContent = producto.icono;
            const cuerpo = document.createElement('div');
            cuerpo.className = 'producto-cuerpo';
            const categoria = document.createElement('p');
            categoria.className = 'producto-categoria';
            categoria.textContent = producto.categoria;
            const nombre = document.createElement('h3');
            nombre.textContent = producto.nombre;
            const descripcion = document.createElement('p');
            descripcion.className = 'producto-descripcion';
            descripcion.textContent = producto.descripcion;
            const pie = document.createElement('div');
            pie.className = 'producto-pie';
            const precio = document.createElement('span');
            precio.className = 'precio';
            precio.textContent = moneda.format(producto.precio);
            const boton = document.createElement('button');
            boton.className = 'btn';
            boton.type = 'button';
            boton.dataset.agregar = producto.id;
            boton.setAttribute('aria-label', `Agregar ${producto.nombre} al carrito`);
            boton.textContent = 'Agregar';
            pie.append(precio, boton);
            cuerpo.append(categoria, nombre, descripcion, pie);
            tarjeta.append(icono, cuerpo);
            this.lista.append(tarjeta);
        });
    }
}
