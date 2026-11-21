// Carrito en memoria para esta demostración; no procesa pagos ni pedidos reales.
export class PedidoModel {
    constructor() {
        this.items = [];
    }

    obtenerItems() {
        return this.items.map((item) => ({ ...item }));
    }

    agregarProducto(producto) {
        if (!producto || !Number.isFinite(producto.precio) || producto.precio < 0) {
            throw new TypeError('El producto debe tener un precio válido.');
        }
        const item = this.items.find((actual) => actual.id === producto.id);
        if (item) {
            item.cantidad += 1;
        } else {
            this.items.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }
        return this.obtenerItems();
    }

    eliminarProducto(id) {
        this.items = this.items.filter((item) => item.id !== Number(id));
        return this.obtenerItems();
    }

    vaciarCarrito() {
        this.items = [];
    }

    obtenerCantidad() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }
}
