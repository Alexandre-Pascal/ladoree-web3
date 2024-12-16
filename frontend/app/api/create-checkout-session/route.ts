import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_SECRET || '');

export async function POST(req: Request): Promise<Response> {
    const { name, description, imageURI, price, itemId, buyer } = await req.json();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name,
                        description,
                        images: [`https://` + imageURI],
                    },
                    unit_amount: price * 100, // Converti en centimes
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/success`,
        cancel_url: `${req.headers.get('origin')}/cancel`,
        metadata: { name, description, imageURI, itemId, buyer },
    });

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
}
