import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!); // Utilise ta clé publique Stripe

interface Item {
    name: string;
    description: string;
    imageURI: string;
    price: string;
    kind: string;
    creationDate: string;
    seller: string;
    creator: string;
    tokenId: string;
    itemId: string;
}
'`0x${string}` | undefined'
const BuyButton = ({ item, buyer }: { item: Item; buyer: `0x${string}` | undefined }) => {
    const handleBuyNow = async () => {
        const stripe = await stripePromise;

        console.log('Achat de :', item);

        // Vérifie que Stripe est chargé
        if (!stripe) {
            console.error('Stripe n’a pas été chargé correctement.');
            return;
        }

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: item.name, // Nom de l'article
                    description: item.description, // Description de l'article
                    imageURI: item.imageURI, // Image de l'article
                    price: item.price, // Prix de l'article
                    itemId: item.itemId, // ID de l'article
                    buyer: buyer, // Adresse Ethereum de l'acheteur
                }),
            });
            // Vérifie que la réponse est correcte
            if (!response.ok) {
                const error = await response.text();
                console.error('Erreur de l’API :', error);
                return;
            }

            const { id: sessionId } = await response.json();

            // Redirige vers la page de paiement Stripe
            const result = await stripe.redirectToCheckout({ sessionId });

            if (result.error) {
                console.error('Erreur de redirection Stripe :', result.error.message);
            }
        } catch (error) {
            console.error('Erreur lors de la création de la session de paiement :', error);
        }
    };

    return (
        <button onClick={handleBuyNow} className="bg-black text-white px-4 py-2 rounded-sm">
            ACHETER MAINTENANT
        </button>
    );
};

export default BuyButton;
