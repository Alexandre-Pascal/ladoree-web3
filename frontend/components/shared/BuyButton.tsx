import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { request } from 'graphql-request';
import { useAccount, useWriteContract } from 'wagmi';
import { ldrTokenAbi, ldrTokenAddress } from "@/utils/abis";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!); // Clé publique Stripe

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

interface Discount {
    discountId: number;
    amount: number;
    from: string;
}

type GraphQLResponse = {
    buyerDiscountBoughts: Discount[];
    discountUseds: { discountId: number; from: string }[];
};
const BuyButton = ({ item, buyer }: { item: Item; buyer: `0x${string}` | undefined }) => {
    const [discount, setDiscount] = useState<Discount | null>(null); // Réduction sélectionnée
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs


    const [discounts, setDiscounts] = useState<Discount[] | null>(null); // Réduction sélectionnée
    const [discounts5, setDiscounts5] = useState<Discount[]>([]); // Réduction sélectionnée
    const [discounts10, setDiscounts10] = useState<Discount[]>([]); // Réduction sélectionnée

    const { address } = useAccount(); // Adresse Ethereum de l'utilisateur

    const filterUnusedDiscounts = (buyerDiscounts: Discount[], usedDiscounts: { discountId: number }[]) => {
        const usedIds = new Set(usedDiscounts.map(discount => discount.discountId)); // Récupère les IDs utilisés
        return buyerDiscounts.filter(discount => !usedIds.has(discount.discountId)); // Filtre les non-utilisés
    };

    const handleApplyDiscount = async (discount: Discount) => {
        setDiscount(discount)
    };

    const handleBuyNow = async () => {
        const stripe = await stripePromise;

        if (!stripe) {
            console.error('Stripe n’a pas été chargé correctement.');
            return;
        }

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: item.name,
                    description: item.description,
                    imageURI: item.imageURI,
                    price: item.price,
                    itemId: item.itemId,
                    buyer: buyer,
                    discount: discount, // Applique la réduction (si sélectionnée)
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                console.error('Erreur de l’API :', error);
                return;
            }

            const { id: sessionId } = await response.json();

            const result = await stripe.redirectToCheckout({ sessionId });

            if (result.error) {
                console.error('Erreur de redirection Stripe :', result.error.message);
            }
        } catch (error) {
            console.error('Erreur lors de la création de la session de paiement :', error);
        }
    };

    useEffect(() => {
        if (!address) return;
        const fetchDiscounts = async () => {
            const data: GraphQLResponse = await request(GRAPHQL_URL, queries.GET_ALL_BUYER_DISCOUNTS, { userAddress: address });
            console.log("data", data);
            const unusedDiscounts = filterUnusedDiscounts(data?.buyerDiscountBoughts || [], data?.discountUseds || []);

            setDiscounts(unusedDiscounts);
            console.log("unusedDiscounts", unusedDiscounts);
        };
        fetchDiscounts();
    }, [address]);


    useEffect(() => {
        if (!discounts) return;
        if (discounts5.length > 0 || discounts10.length > 0) return;
        discounts.forEach(discount => {
            if (discount.amount == 50) {
                setDiscounts5(prev => [...prev, discount]);
            }
            if (discount.amount == 100) {
                setDiscounts10(prev => [...prev, discount]);
            }
        });
    }, [discounts]);

    useEffect(() => {
        if (!discounts5 || !discounts10) return;
        console.log("discounts5List", discounts5);
        console.log("discounts5Length", discounts5.length);
        console.log("discounts10List", discounts10);
        console.log("discounts10Length", discounts10.length);
    }, [discounts5, discounts10]);


    useEffect(() => {
        if (discount) {
            console.log("discount", discount);
        }
    }, [discount]);

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 text-white">Acheter maintenant</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Appliquer une réduction LDR</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        {/* Message d'erreur */}
                        {error && <p className="text-red-500">{error}</p>}
                        {/* Réduction 5% */}
                        {
                            discounts5.length > 0 && (
                                <div>
                                    <h3>
                                        Vous avez {discounts5.length} réduction(s) de 5%, souhaitez-vous en utiliser une ?
                                    </h3>
                                    <Button
                                        onClick={() => handleApplyDiscount(discounts5[0])}
                                        className="bg-blue-500 hover:bg-blue-600"
                                    >
                                        Utiliser réduction 5%
                                    </Button>
                                </div>
                            )
                        }
                        {/* Réduction 10% */}
                        {
                            discounts10.length > 0 && (
                                <div>
                                    <h3>
                                        Vous avez {discounts10.length} réduction(s) de 10%, souhaitez-vous en utiliser une ?
                                    </h3>
                                    <Button
                                        onClick={() => handleApplyDiscount(discounts10[0])}
                                        className="bg-blue-500 hover:bg-blue-600"
                                    >
                                        Utiliser réduction 10%
                                    </Button>
                                </div>
                            )
                        }
                        {
                            discounts5.length == 0 && discounts10.length == 0 && (
                                <div>
                                    <p>
                                        Vous n'avez pas de réductions disponibles, si vous avez assez de tokens, vous pouvez en acheter directement depuis la page de profil.
                                    </p>
                                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => window.location.href = "/profile"}>
                                        Aller au profil
                                    </Button>
                                </div>
                            )
                        }
                        {/* Résumé */}
                        {discount && (
                            <p className="text-green-500">
                                Réduction de {discount.amount == 50 ? '5%' : '10%'} appliquée !
                            </p>
                        )}
                        {/* Bouton final */}
                        <Button onClick={handleBuyNow} className="bg-black text-white">
                            Payer avec Stripe
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BuyButton;
