'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
    name: string;
    description: string;
    imageURI: string;
}

interface OrderDetails {
    id: string;
    amount_total: number;
    currency: string;
    customer_name: string;
    customer_email: string;
    item: OrderItem;
}

const SuccessPage = () => {
    const [order, setOrder] = useState<OrderDetails | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch('/api/get-order');
                if (!response.ok) throw new Error('Commande introuvable');
                const data: OrderDetails = await response.json();
                setOrder(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrder();
    }, []);

    if (!order) return <p>Chargement des détails de la commande...</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-green-600">Paiement Réussi 🎉</h1>
            <p className="mt-4">Merci pour votre commande, <strong>{order.customer_name}</strong> !</p>
            <div className="mt-6 flex flex-col items-center">
                <img src={`https://` + order.item.imageURI} alt={order.item.name} className="w-64 h-64 object-cover mb-4" />
                <p className="text-lg font-bold">{order.item.name}</p>
                <p className="text-gray-600">{order.item.description}</p>
                <p className="mt-2 text-lg">
                    <strong>Montant payé :</strong> {order.amount_total.toFixed(2)} {order.currency.toUpperCase()}
                </p>
                <p className="mt-2">
                    Un email de confirmation a été envoyé à : <strong>{order.customer_email}</strong>
                </p>
            </div>
            <a href="/" className="mt-6 text-blue-600 underline">Retour à la page d'accueil</a>
        </div>
    );
};

export default SuccessPage;
