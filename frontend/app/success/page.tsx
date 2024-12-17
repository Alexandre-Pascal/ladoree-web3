'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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

const SuccessPageContent = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [order, setOrder] = useState<OrderDetails | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!sessionId) return;

            try {
                const response = await fetch('/api/get-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId }),
                });

                if (!response.ok) throw new Error('Commande introuvable');
                const data: OrderDetails = await response.json();
                setOrder(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la commande :", error);
            }
        };

        fetchOrder();
    }, [sessionId]);

    if (!order) {
        return <p className="text-lg text-gray-500">Chargement des détails de la commande...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 Paiement Confirmé !</h1>
                    <p className="text-gray-600">
                        Merci pour votre achat, <span className="font-semibold">{order.customer_name}</span> !
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2">
                        <img
                            src={`https://${order.item.imageURI}`}
                            alt={order.item.name}
                            className="w-full rounded-lg shadow-md object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{order.item.name}</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">{order.item.description}</p>
                        <div className="flex justify-between items-center border-t pt-4">
                            <span className="text-lg font-medium text-gray-700">Montant payé :</span>
                            <span className="text-2xl font-bold text-green-600">
                                {order.amount_total.toFixed(2)} {order.currency.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Un email de confirmation a été envoyé à : <br />
                    <span className="text-gray-800 font-medium">{order.customer_email}</span>
                </p>
            </div>
            <div className="mt-8">
                <a
                    href="/"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition duration-300"
                >
                    Retour à l'accueil
                </a>
            </div>
        </div>
    );
};

const SuccessPage = () => {
    return (
        <Suspense fallback={<p className="text-lg text-gray-500">Chargement...</p>}>
            <SuccessPageContent />
        </Suspense>
    );
};

export default SuccessPage;
