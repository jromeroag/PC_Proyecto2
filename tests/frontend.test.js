import test from 'node:test';
import assert from 'node:assert/strict';
import { ProductoModel } from '../models/productoModel.js';
import { PedidoModel } from '../models/pedidoModel.js';

test('obtiene los productos de ejemplo sin exponer los datos internos', () => {
    const modelo = new ProductoModel();
    const productos = modelo.obtenerProductos();
    assert.equal(productos.length, 6);
    productos[0].nombre = 'Modificado';
    assert.notEqual(modelo.obtenerProductos()[0].nombre, 'Modificado');
});

test('busca productos por nombre sin distinguir mayúsculas', () => {
    const modelo = new ProductoModel();
    assert.equal(modelo.buscarProductos('POLO').length, 2);
    assert.equal(modelo.buscarProductos('inexistente').length, 0);
});

test('filtra categorías y combina el filtro con la búsqueda', () => {
    const modelo = new ProductoModel();
    assert.deepEqual(modelo.obtenerCategorias(), ['Polos', 'Pantalones', 'Casacas']);
    assert.equal(modelo.filtrarPorCategoria('Casacas').length, 2);
    assert.equal(modelo.consultar({ busqueda: 'denim', categoria: 'Casacas' }).length, 1);
    assert.equal(modelo.consultar({ busqueda: 'denim', categoria: 'Polos' }).length, 0);
});

test('agrega productos y acumula cantidades', () => {
    const producto = new ProductoModel().obtenerPorId(1);
    const carrito = new PedidoModel();
    carrito.agregarProducto(producto);
    carrito.agregarProducto(producto);
    assert.equal(carrito.obtenerCantidad(), 2);
    assert.equal(carrito.obtenerItems()[0].cantidad, 2);
});

test('calcula el total y permite eliminar o vaciar el carrito', () => {
    const productos = new ProductoModel();
    const carrito = new PedidoModel();
    carrito.agregarProducto(productos.obtenerPorId(1));
    carrito.agregarProducto(productos.obtenerPorId(1));
    carrito.agregarProducto(productos.obtenerPorId(3));
    assert.equal(carrito.calcularTotal(), 155);
    carrito.eliminarProducto(1);
    assert.equal(carrito.calcularTotal(), 85);
    carrito.vaciarCarrito();
    assert.equal(carrito.calcularTotal(), 0);
    assert.equal(carrito.obtenerCantidad(), 0);
});
