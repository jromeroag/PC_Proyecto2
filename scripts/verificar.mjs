import { access, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const archivos = [
    'index.html', 'css/style.css', 'js/main.js', 'assets/img/portada.jpg',
    'models/productoModel.js', 'models/pedidoModel.js',
    'views/productoView.js', 'views/pedidoView.js',
    'controllers/productoController.js', 'controllers/pedidoController.js'
];

for (const archivo of archivos) await access(archivo);
const html = await readFile('index.html', 'utf8');
for (const ruta of ['css/style.css', 'js/main.js']) {
    if (!html.includes(ruta)) throw new Error(`Falta la referencia a ${ruta} en index.html`);
}
for (const archivo of archivos.filter((ruta) => ruta.endsWith('.js'))) {
    execFileSync(process.execPath, ['--check', archivo], { stdio: 'inherit' });
}
console.log('Archivos, referencias y sintaxis JavaScript verificados.');
