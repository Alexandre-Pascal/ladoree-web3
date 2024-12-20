import React from 'react';
import Image from 'next/image';
import user from "@/icons/user.png";
import { Creator } from '@/utils/types';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface GraphQLResponseItemSold {
    itemSolds: {
        itemId: string;
    }[];
}

interface GraphQLResponseItemForSaleByUser {
    itemListeds: {
        itemId: string;
        name: string;
        price: string;
    }[];
}

export default function CreatorCard({ creator }: { creator: Creator }) {
    const { userName, profileImage } = creator;

    const { address } = useAccount();

    const [itemsForSale, setItemsForSale] = useState<GraphQLResponseItemForSaleByUser | null>(null);
    const [itemsSold, setItemsSold] = useState<GraphQLResponseItemSold | null>(null);

    const [totalValue, setTotalValue] = useState<number>(0);
    const [totalSold, setTotalSold] = useState<number>(0);
    const [totalOnSale, setTotalOnSale] = useState<number>(0);



    useEffect(() => {
        if (!creator.user) return;
        const fetchItemsToSale = async () => {
            // Récupération des items vendus
            const ItemsForSale: GraphQLResponseItemForSaleByUser = await request(GRAPHQL_URL, queries.GET_ITEMS_FOR_SALE_BY_USER, { seller: creator.user });
            const ItemsSoldRequest: GraphQLResponseItemSold = await request(GRAPHQL_URL, queries.GET_ITEMS_SOLD);

            setItemsForSale(ItemsForSale);
            setItemsSold(ItemsSoldRequest);

        }
        fetchItemsToSale();
    }, [creator.user]);

    useEffect(() => {
        if (!itemsForSale || !itemsSold) return;

        console.log("creator", creator.userName)
        console.log("itemsForSale", itemsForSale)
        console.log("itemsSold", itemsSold)

        // Transforme les items vendus en un Set pour une recherche rapide
        const soldItemIds = new Set(itemsSold.itemSolds.map((sold) => sold.itemId));

        // Filtre les items en vente qui ne sont pas dans la liste des items vendus
        const unsoldItems = itemsForSale.itemListeds.filter((item) => !soldItemIds.has(item.itemId));

        const soldItems = itemsForSale.itemListeds.filter((item) => soldItemIds.has(item.itemId));

        const totalValue = soldItems.reduce((acc, item) => acc + parseFloat(item.price), 0);


        setTotalValue(totalValue);
        setTotalSold(soldItems.length);
        setTotalOnSale(unsoldItems.length);
    }, [itemsForSale, itemsSold]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => window.location.href = `/creators-list/${encodeURIComponent(userName)}`}
        >
            <div className="relative h-48">
                <Image
                    src={profileImage}
                    alt={userName}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                />
            </div>
            <div className="p-6">
                <div className="flex items-center">
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{userName}</h3>
                        <p className="text-gray-500">Œuvres vendues : {totalSold}</p>
                        <p className="text-gray-500">Œuvres en vente : {totalOnSale}</p>
                        <p className="text-gray-500">Valeur totale : {totalValue} Euros</p>
                    </div>
                </div>
            </div>
        </div>
    )
}