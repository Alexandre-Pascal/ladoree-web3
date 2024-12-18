import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_SECRET || '');
interface Discount {
    discountId: number;
    amount: number;
}
export async function POST(req: Request): Promise<Response> {
    try {
        const { name, description, imageURI, price, itemId, buyer, discount }: { name: string; description: string; imageURI: string; price: number; itemId: string; buyer: string; discount?: Discount } = await req.json();

        console.log('Creating Stripe session:', { name, description, imageURI, price, itemId, buyer, discount });
        // Si un discount est fourni, crée un coupon Stripe
        let coupon;
        if (discount) {
            coupon = await stripe.coupons.create({
                percent_off: discount.amount / 10, // Par exemple, 5 ou 10%
                duration: 'once',
            });
            console.log('Coupon created:', coupon);
        }

        // Crée la session Stripe
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
            discounts: coupon ? [{ coupon: coupon.id }] : undefined,
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
            metadata: { name, description, imageURI, itemId, buyer, discount: discount ? discount.discountId : null },
        });

        return new Response(JSON.stringify({ id: session.id }), { status: 200 });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        return new Response(JSON.stringify({ error: 'Unable to create session' }), { status: 500 });
    }
}
