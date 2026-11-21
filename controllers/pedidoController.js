export class PedidoController {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }

    iniciar() {
        this.vista.alEliminar((id) => {
            this.modelo.eliminarProducto(id);
            this.actualizar();
        });
        this.vista.alVaciar(() => {
            this.modelo.vaciarCarrito();
            this.actualizar();
        });
        this.vista.alAbrir(() => this.vista.abrir());
        this.vista.alCerrar(() => this.vista.cerrar());
        this.actualizar();
    }

    agregar(producto) {
        this.modelo.agregarProducto(producto);
        this.actualizar();
        this.vista.abrir();
    }

    actualizar() {
        this.vista.mostrarCarrito(this.modelo.obtenerItems(), this.modelo.calcularTotal(), this.modelo.obtenerCantidad());
    }
}
