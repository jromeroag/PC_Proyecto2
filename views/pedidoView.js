const moneda = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

export class PedidoView {
    constructor() {
        this.panel = document.querySelector('#panelCarrito');
        this.items = document.querySelector('#itemsCarrito');
        this.contador = document.querySelector('#contador');
        this.total = document.querySelector('#totalCarrito');
        this.vaciar = document.querySelector('#vaciarCarrito');
        this.abrirBoton = document.querySelector('#btnCarrito');
        this.cerrarBoton = document.querySelector('#cerrarCarrito');
    }

    alAbrir(callback) { this.abrirBoton.addEventListener('click', callback); }
    alCerrar(callback) {
        this.cerrarBoton.addEventListener('click', callback);
        this.panel.addEventListener('click', (evento) => { if (evento.target === this.panel) callback(); });
        document.addEventListener('keydown', (evento) => { if (evento.key === 'Escape' && !this.panel.hidden) callback(); });
    }
    alVaciar(callback) { this.vaciar.addEventListener('click', callback); }
    alEliminar(callback) {
        this.items.addEventListener('click', (evento) => {
            const boton = evento.target.closest('[data-eliminar]');
            if (boton) callback(Number(boton.dataset.eliminar));
        });
    }
    abrir() {
        this.panel.hidden = false;
        this.abrirBoton.setAttribute('aria-expanded', 'true');
        this.cerrarBoton.focus();
    }
    cerrar() {
        this.panel.hidden = true;
        this.abrirBoton.setAttribute('aria-expanded', 'false');
        this.abrirBoton.focus();
    }

    mostrarCarrito(items, total, cantidad) {
        this.items.replaceChildren();
        this.contador.textContent = String(cantidad);
        this.total.textContent = moneda.format(total);
        this.vaciar.disabled = items.length === 0;
        if (!items.length) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'Tu carrito está vacío. Explora el catálogo para agregar productos.';
            this.items.append(mensaje);
            return;
        }
        items.forEach((item) => {
            const fila = document.createElement('div');
            fila.className = 'item-carrito';
            const detalle = document.createElement('div');
            const nombre = document.createElement('strong');
            nombre.textContent = item.nombre;
            const subtotal = document.createElement('small');
            subtotal.textContent = `${item.cantidad} × ${moneda.format(item.precio)} = ${moneda.format(item.cantidad * item.precio)}`;
            detalle.append(nombre, subtotal);
            const boton = document.createElement('button');
            boton.className = 'eliminar';
            boton.type = 'button';
            boton.dataset.eliminar = item.id;
            boton.setAttribute('aria-label', `Eliminar ${item.nombre} del carrito`);
            boton.textContent = 'Eliminar';
            fila.append(detalle, boton);
            this.items.append(fila);
        });
    }
}
