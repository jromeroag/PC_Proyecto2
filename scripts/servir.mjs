import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const raiz = process.cwd();
const tipos = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg' };

createServer(async (request, response) => {
    const ruta = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const archivo = resolve(raiz, `.${ruta === '/' ? '/index.html' : ruta}`);
    if (!archivo.startsWith(`${raiz}${sep}`)) {
        response.writeHead(403).end();
        return;
    }
    try {
        const contenido = await readFile(archivo);
        response.writeHead(200, { 'Content-Type': `${tipos[extname(archivo)] || 'application/octet-stream'}; charset=utf-8` }).end(contenido);
    } catch {
        response.writeHead(404).end('No encontrado');
    }
}).listen(8765, '127.0.0.1', () => console.log('Frontend disponible en http://127.0.0.1:8765'));
