// components/ArtCard.tsx

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { request } from 'graphql-request';

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

interface User {
    email: string;
    userName: string;
    bio: string;
    profileImage: string;
}

interface GraphQLResponse {
    userRegistereds: {
        email: string;
        userName: string;
        bio: string;
        profileImage: string;
    }[];
}

const ArtCard = ({ item }: { item: Item }) => {
    const [artist, setArtist] = React.useState<User>();
    const [seller, setSeller] = React.useState<User>();


    //Récuperer les profil des artistes
    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const artistData: GraphQLResponse = await request(GRAPHQL_URL, queries.GET_USER_BY_ADDRESS, { user: item.creator });
                setArtist(artistData.userRegistereds[0]);
            } catch (err: any) {
                console.error("Error fetching artist:", err);
            }
        };
        fetchArtist();
    }, [item.creator]);

    //Récuperer les profil des vendeurs
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const sellerData: GraphQLResponse = await request(GRAPHQL_URL, queries.GET_USER_BY_ADDRESS, { user: item.seller });
                setSeller(sellerData.userRegistereds[0]);
            } catch (err: any) {
                console.error("Error fetching seller:", err);
            }
        };
        fetchSeller();
    }, [item.seller]);


    return (
        <Link href={`/artworks-list/${encodeURIComponent(item.name)}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex-none w-[350px] content-center">
                <div className="relative h-80">
                    <Image src={`https://` + item.imageURI} alt={item.name} sizes="100%" fill className="w-full h-full object-cover" />
                </div>
                <div className="py-8 px-4">
                    <div className="flex items-center">
                        <div className="w-12 h-16 relative rounded-full overflow-hidden">
                            {artist &&
                                <Image src={artist.profileImage} alt={artist.userName} sizes='100%' fill className="rounded-full border-2 border-gray-200 w-full h-full object-cover" />
                            }
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-gray-500">Artiste : {artist?.userName || ""}</p>
                            <p className="text-gray-500">Prix : {item.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArtCard;
