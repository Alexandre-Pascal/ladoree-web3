import React, { useState, useEffect } from "react";
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';


interface Creation {
    id: string;
    creator: string;
    nftTokenId: string;
    price: string;
    isSold: boolean;
}

const Marketplace: React.FC = () => {
    const [creations, setCreations] = useState<Creation[]>([]);

    const { data, isLoading, error, isSuccess: isSuccessQuery } = useQuery<Creation[], Error>({
        queryKey: ['userProfile'], // Clé unique pour l'utilisateur
        queryFn: () => {
            return request(GRAPHQL_URL, queries.GET_ARTWORKS);
        },
    });

    useEffect(() => {
        if (isSuccessQuery && data) {
            setCreations(data);
        }
    }, [isSuccessQuery]);

    const handleBuy = async (nftTokenId: string, price: string) => {
        // Implement purchase logic here
        alert(`Buying NFT ${nftTokenId} for ${price} ETH`);
    };

    return (
        <div>
            <h1>Marketplace</h1>
            {creations.length > 0 ? (
                creations.map((creation) => (
                    <div key={creation.id}>
                        <h2>Token ID: {creation.nftTokenId}</h2>
                        <p>Creator: {creation.creator}</p>
                        <p>Price: {creation.price} ETH</p>
                        <p>Status: {creation.isSold ? "Sold" : "Available"}</p>
                        {!creation.isSold && (
                            <button onClick={() => handleBuy(creation.nftTokenId, creation.price)}>
                                Buy
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>No creations listed yet.</p>
            )}
        </div>
    );
};

export default Marketplace;
