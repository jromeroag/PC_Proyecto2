export class ProductoController {
    constructor(modelo, vista, alAgregar) {
        this.modelo = modelo;
        this.vista = vista;
        this.alAgregar = alAgregar;
    }

    iniciar() {
        this.vista.mostrarCategorias(this.modelo.obtenerCategorias());
        this.vista.alCambiarFiltros(() => this.actualizar());
        this.vista.alAgregarProducto((id) => {
            const producto = this.modelo.obtenerPorId(id);
            if (producto) this.alAgregar(producto);
        });
        this.actualizar();
    }

    actualizar() {
        const filtros = this.vista.obtenerFiltros();
        this.vista.mostrarProductos(this.modelo.consultar(filtros));
    }
}
