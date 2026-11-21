// Datos de demostración. La fuente puede sustituirse por una API Flask más adelante.
const productosIniciales = [
    { id: 1, nombre: 'Polo básico de algodón', categoria: 'Polos', descripcion: 'Polo suave y versátil para uso diario.', precio: 35, icono: '👕' },
    { id: 2, nombre: 'Polo estampado urbano', categoria: 'Polos', descripcion: 'Diseño cómodo con un toque de color.', precio: 42, icono: '👕' },
    { id: 3, nombre: 'Jean clásico', categoria: 'Pantalones', descripcion: 'Denim resistente de corte recto.', precio: 85, icono: '👖' },
    { id: 4, nombre: 'Pantalón jogger', categoria: 'Pantalones', descripcion: 'Ideal para un estilo casual y cómodo.', precio: 68, icono: '👖' },
    { id: 5, nombre: 'Casaca denim', categoria: 'Casacas', descripcion: 'Una prenda ligera para toda temporada.', precio: 125, icono: '🧥' },
    { id: 6, nombre: 'Casaca cortaviento', categoria: 'Casacas', descripcion: 'Protección ligera con estilo moderno.', precio: 110, icono: '🧥' }
];

export class ProductoModel {
    constructor(productos = productosIniciales) {
        this.productos = productos.map((producto) => ({ ...producto }));
    }

    obtenerProductos() {
        return this.productos.map((producto) => ({ ...producto }));
    }

    obtenerPorId(id) {
        const producto = this.productos.find((item) => item.id === Number(id));
        return producto ? { ...producto } : null;
    }

    obtenerCategorias() {
        return [...new Set(this.productos.map((producto) => producto.categoria))];
    }

    buscarProductos(consulta = '') {
        const termino = String(consulta).trim().toLocaleLowerCase('es');
        return this.obtenerProductos().filter((producto) => producto.nombre.toLocaleLowerCase('es').includes(termino));
    }

    filtrarPorCategoria(categoria = 'todos') {
        return this.obtenerProductos().filter((producto) => categoria === 'todos' || producto.categoria === categoria);
    }

    consultar({ busqueda = '', categoria = 'todos' } = {}) {
        const termino = String(busqueda).trim().toLocaleLowerCase('es');
        return this.filtrarPorCategoria(categoria).filter((producto) => producto.nombre.toLocaleLowerCase('es').includes(termino));
    }
}
