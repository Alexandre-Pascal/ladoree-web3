'use client';
import React from 'react';
import ArtCard from '@/components/shared/ArtCard';
import Link from 'next/link';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { useEffect } from 'react';
import { Label } from '@/components/ui';
import dayjs from "dayjs";
import ListItems from '@/components/shared/ListItems';
import BuyButton from '@/components/shared/BuyButton';


interface ItemDetailPageProps {
    params: {
        artworkName: string;
    };
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

interface GraphQLResponseItem {
    itemListeds: {
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
    }[];
}

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


const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ params }) => {

    const { artworkName } = params;

    const decodeItemTitle = decodeURIComponent(artworkName);



    const [artist, setArtist] = React.useState<User>();
    const [seller, setSeller] = React.useState<User>();

    const [item, setItem] = React.useState<Item>();
    const [sellerItems, setSellerItems] = React.useState<Item[]>();


    //Récuperer les informations de l'oeuvre par son nom
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const itemData: GraphQLResponseItem = await request(GRAPHQL_URL, queries.GET_ARTWORK_BY_NAME, { name: decodeItemTitle });
                setItem(itemData.itemListeds[0]);
            }
            catch (err: any) {
                console.error("Error fetching item:", err);
            }
        }
        fetchItem();
    }, [decodeItemTitle]);



    useEffect(() => {
        if (!item) {
            return;
        }
        if (item.kind === "painting") {
            item.kind = "Peinture";
        }
        else if (item.kind === "sculpture") {
            item.kind = "Sculpture";
        }
        else if (item.kind === "photography") {
            item.kind = "Photographie";
        }
        else if (item.kind === "drawing") {
            item.kind = "Dessin";
        }
    }, [item, item?.kind]);

    useEffect(() => {
        if (!item || item.creationDate.includes("-")) { // Si la date est déjà formatée, on ne fait rien
            return;
        }

        const formattedDate = dayjs.unix(Number(item.creationDate)).format("YYYY-MM-DD");
        item.creationDate = formattedDate;

    }, [item, item?.creationDate]);

    //Récuperer les profil des artistes
    useEffect(() => {
        if (!item) {
            return;
        }
        const fetchArtist = async () => {
            try {
                const artistData: GraphQLResponse = await request(GRAPHQL_URL, queries.GET_USER_BY_ADDRESS, { user: item.creator });
                setArtist(artistData.userRegistereds[0]);
            } catch (err: any) {
                console.error("Error fetching artist:", err);
            }
        };
        fetchArtist();
    }, [item, item?.creator]);

    //Récuperer les profil des vendeurs
    useEffect(() => {
        if (!item) {
            return;
        }
        const fetchSeller = async () => {
            try {
                const sellerData: GraphQLResponse = await request(GRAPHQL_URL, queries.GET_USER_BY_ADDRESS, { user: item.seller });
                setSeller(sellerData.userRegistereds[0]);
            } catch (err: any) {
                console.error("Error fetching seller:", err);
            }
        };
        fetchSeller();
    }, [item, item?.seller]);

    //Récupérer les autres oeuvres en vente par le vendeur
    useEffect(() => {
        if (!item) {
            return;
        }
        const fetchSellerItems = async () => {
            try {
                const sellerItemsData: GraphQLResponseItem = await request(GRAPHQL_URL, queries.GET_OTHERS_ARTWORK_BY_SELLER, { seller: item.seller, name: item.name });
                setSellerItems(sellerItemsData.itemListeds);

            } catch (err: any) {
                console.error("Error fetching seller items:", err);
            }
        };
        fetchSellerItems();
    }, [seller]);

    useEffect(() => {
        console.log("sellerItems", sellerItems);
    }
        , [sellerItems]);

    if (!item) {
        return <p>Oeuvre d'art non trouvée.</p>;
    }

    return (
        <div>
            <div className="max-w-screen-xl-2xl mx-auto py-12 flex h-screen-header">
                <div className="w-4/6 flex justify-center items-center  bg-gray-50 px-8">
                    {item.imageURI && (
                        <img
                            src={`https://` + item.imageURI}
                            alt={item.name || 'item'}
                            className=" object-cover rounded-md max-h-full-header"
                        />
                    )}
                </div>
                <div className="w-2/6 flex flex-col justify-start pl-16 space-y-6">
                    {/* Nom de l'item */}
                    <h1 className="text-4xl font-bold text-gray-900">{item.name}</h1>

                    {/* Informations sur l'artiste */}
                    <div className="border-t border-gray-300 pt-4">
                        <Label className="text-lg font-semibold text-gray-700">Artiste</Label>
                        <div className="flex items-center mt-2 gap-3">
                            {artist?.profileImage && (
                                <img
                                    src={artist.profileImage}
                                    alt={artist.userName || 'Artist'}
                                    className="w-12 h-12 object-cover rounded-full border border-gray-200 shadow-sm"
                                />
                            )}
                            {artist && (
                                <Link href={`/creators-list/${encodeURIComponent(artist?.userName)}`}>
                                    <p className="text-gray-700 text-lg font-medium hover:underline">
                                        {artist.userName}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                        <p className="text-gray-600 mt-2 text-justify leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    {/* Prix de l'item */}
                    <p className="text-2xl text-gray-800 mt-4 font-semibold border-b border-gray-300 pb-2">
                        {item.price} €
                    </p>
                    <div className="mt-6 flex flex-col gap-4">
                        <BuyButton item={item} />
                        <button className="bg-white text-black px-4 py-2 rounded-sm border border-black">FAIRE UNE OFFRE (Bientôt possible)</button>
                    </div>

                    {/* Détails */}
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800">Détails</h2>
                        <ul className="text-gray-600 mt-2 space-y-2">
                            <li>
                                <span className="font-medium text-gray-700">Type :</span> {item.kind}
                            </li>
                            <li>
                                <span className="font-medium text-gray-700">Date de création :</span>{' '}
                                {item.creationDate}
                            </li>
                            <li>
                                <span className="font-medium text-gray-700">Identifiant de l'oeuvre : </span>n°{item.itemId}
                            </li>
                            <li>
                                <span className="font-medium text-gray-700">Identifiant du NFT : </span>
                                <Link className='hover:underline' href={`https://amoy.polygonscan.com/nft/0x59f32e75069200f292d952e99605c6a17ef636ca/` + item.tokenId}>n°{item.tokenId}</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Informations sur le vendeur */}
                    <div className="border-t border-gray-300 pt-4">
                        <Label className="text-lg font-semibold text-gray-700">Vendeur</Label>
                        <div className="flex items-center mt-2 gap-3">
                            {seller?.profileImage && (
                                <img
                                    src={seller.profileImage}
                                    alt={seller.userName || 'Seller'}
                                    className="w-12 h-12 object-cover rounded-full border border-gray-200 shadow-sm"
                                />
                            )}
                            {seller && (
                                <p className="text-gray-700 text-lg font-medium">
                                    {seller.userName}
                                </p>
                            )}
                        </div>
                    </div>

                </div>

            </div>
            <div className="max-w-screen-xl-2xl mx-auto pb-12">
                <h1 className="text-2xl font-normal text-center mt-12 mb-6">Autres oeuvres misent en vente par {artist?.userName}</h1>
                <div className="flex flex-wrap justify-center gap-8 mt-6">
                    {sellerItems?.length === 0 && (
                        <p className="text-gray-500">Aucune oeuvre en vente pour le moment.</p>
                    )}
                    {sellerItems && (
                        <ListItems items={sellerItems} />
                    )}


                </div>
            </div>
        </div>
    );
};

// Envelopper le composant avec Suspense pour gérer l'asynchronisme de useSearchParams()
export default ItemDetailPage;