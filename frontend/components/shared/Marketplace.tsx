import React, { useEffect, useState } from "react";
import ArtCard from "./ArtCard";
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { request } from 'graphql-request';
import { useAccount, useWriteContract } from 'wagmi';
import { marketplaceAbi, marketplaceAddress } from '@/utils/abis';

interface Item {
    name: string;
    description: string;
    imageURI: string;
    price: string;
    kind: string;
    seller: string;
    creator: string;
    tokenId: string;
    itemId: string;
}

interface GraphQLResponseItemListed {
    itemListeds: Item[];
}

interface GraphQLResponseItemSold {
    itemSolds: {
        itemId: string;
    }[];
}


const Marketplace: React.FC = () => {
    const [itemList, setItemList] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        console.log("Fetching items...");
        const fetchItemListeds = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Récupération des items en vente
                const listedData: GraphQLResponseItemListed = await request(GRAPHQL_URL, queries.GET_ARTWORKS);
                console.log("Fetched items:", listedData);

                // Récupération des items vendus
                const soldData: GraphQLResponseItemSold = await request(GRAPHQL_URL, queries.GET_ITEMS_SOLD);
                console.log("Fetched sold items:", soldData);

                // Transforme les items vendus en un Set pour une recherche rapide
                const soldItemIds = new Set(soldData.itemSolds.map((sold) => sold.itemId));

                // Filtre les items en vente qui ne sont pas dans la liste des items vendus
                const unsoldItems = listedData.itemListeds.filter((item) => !soldItemIds.has(item.itemId));

                // Ne pas afficher les items qui ont une imageURI qui commence par un truc différent de "indigo"
                const itemFiltered = unsoldItems.filter((item) => item.imageURI.startsWith("indigo")); // À supprimer au prochain déploiement

                console.log("Filtered items:", itemFiltered);
                setItemList(itemFiltered);
            } catch (err: any) {
                console.error("Error fetching metadata:", err);
                setError(err.message || "Unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        };
        fetchItemListeds();
    }, []);




    if (isLoading) return <p>Chargement des oeuvres...</p>;
    if (error) return <p>Erreur lors du chargement des oeuvres: {error}</p>;

    return (
        <>
            {itemList.length > 0 ? (
                itemList.map((item, index) => (
                    <ArtCard
                        key={index}
                        item={item}
                    />
                ))
            ) : (
                <p>Pas d'oeuvre en vente pour le moment</p>
            )}
        </>
    );
};

export default Marketplace;
