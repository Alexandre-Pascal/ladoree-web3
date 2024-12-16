'use client';
import Link from 'next/link';

const CancelPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold text-red-600">Paiement Annulé 😢</h1>
            <p className="text-gray-700 mt-4">Votre transaction a été annulée.</p>
            <Link href="/" className="mt-6 text-blue-600 underline">
                Retour à la page d'accueil
            </Link>
        </div>
    );
};

export default CancelPage;
