import { ProductoModel } from '../models/productoModel.js';
import { PedidoModel } from '../models/pedidoModel.js';
import { ProductoView } from '../views/productoView.js';
import { PedidoView } from '../views/pedidoView.js';
import { ProductoController } from '../controllers/productoController.js';
import { PedidoController } from '../controllers/pedidoController.js';

const pedido = new PedidoController(new PedidoModel(), new PedidoView());
const producto = new ProductoController(new ProductoModel(), new ProductoView(), (item) => pedido.agregar(item));

pedido.iniciar();
producto.iniciar();
