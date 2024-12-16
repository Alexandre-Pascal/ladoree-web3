import fs from 'fs';
import path from 'path';

export async function GET(): Promise<Response> {
    try {
        const filePath = path.resolve(process.cwd(), 'order.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        return new Response(data, { status: 200 });
    } catch (err) {
        console.error("Erreur lors de la récupération de la commande :", err);
        return new Response('Commande introuvable', { status: 404 });
    }
}
