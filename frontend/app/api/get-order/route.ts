import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_SECRET!);

export async function POST(req: Request): Promise<Response> {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return new Response("Session ID manquant", { status: 400 });
        }

        // Récupère la session Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'customer_details'],
        });

        const orderDetails = {
            id: session.id,
            amount_total: session.amount_total! / 100,
            currency: session.currency,
            customer_name: session.customer_details?.name || 'Client',
            customer_email: session.customer_details?.email || 'unknown@example.com',
            item: {
                name: session.metadata?.name || 'Article inconnu',
                description: session.metadata?.description || 'Pas de description',
                imageURI: session.metadata?.imageURI || '',
            },
        };

        return new Response(JSON.stringify(orderDetails), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération de la commande :", error);
        return new Response("Erreur serveur", { status: 500 });
    }
}
