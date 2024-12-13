import React, { useEffect, useState } from "react";
import ArtCard from "./ArtCard";
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { request } from 'graphql-request';
import { useAccount, useWriteContract } from 'wagmi';

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

interface GraphQLResponse {
    itemListeds: Item[];
}


const Marketplace: React.FC = () => {
    const [itemList, setItemList] = useState<Item[]>([]);
    const [itemListNotSold, setItemListNotSold] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Fetching items...");
        const fetchItemListeds = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data: GraphQLResponse = await request(GRAPHQL_URL, queries.GET_ARTWORKS);
                console.log("Fetched items:", data);


                setItemList(data.itemListeds);
            } catch (err: any) {
                console.error("Error fetching metadata:", err);
                setError(err.message || "Unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        };
        fetchItemListeds();
    }, []);

    const { writeContract: checkIsSold } = useWriteContract();



    if (isLoading) return <p>Loading metadata...</p>;
    if (error) return <p>Error: {error}</p>;

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
                <p>No metadata available</p>
            )}
        </>
    );
};

export default Marketplace;
