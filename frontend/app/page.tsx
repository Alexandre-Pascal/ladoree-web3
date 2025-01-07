'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ArtCard from '@/components/shared/ArtCard';
import { artworksData, artistsData } from '../data/artistsData';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { request } from 'graphql-request';


// Exemple de données d'artistes et d'acheteurs
const topArtists = artistsData.slice(0, 3);

const topBuyers = [
  {
    name: 'John Doe',
    spent: '95 000 000',
    image: 'https://placehold.co/100', // Remplace par une vraie URL d'image
  },
  {
    name: 'Jane Smith',
    spent: '80 000 000',
    image: 'https://placehold.co/100', // Remplace par une vraie URL d'image
  },
  {
    name: 'Emily Johnson',
    spent: '70 000 000',
    image: 'https://placehold.co/100', // Remplace par une vraie URL d'image
  },
];

interface GraphQLResponseLastArtwork {
  itemListeds: {
    name: string;
    creator: number;
    imageURI: string;
  }[];
}

interface GraphQLResponseCreatorNameLastArtwork {
  userRegistereds: {
    userName: string;
  }[];
}





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

const HomePage = () => {
  const [lastItems, setLastItems] = useState<Item | null>(null);
  const [creatorName, setCreatorName] = useState<string | null>(null);



  // Liste des items en vente, si aucun item n'est passé en paramètre, on récupère tous les items en vente

  const [itemList, setItemList] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemListeds = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let listedData: GraphQLResponseItemListed = { itemListeds: [] };


        // Récupération des items en vente
        listedData = await request(GRAPHQL_URL, queries.GET_ARTWORKS);


        // Récupération des items vendus
        const soldData: GraphQLResponseItemSold = await request(GRAPHQL_URL, queries.GET_ITEMS_SOLD);

        // Transforme les items vendus en un Set pour une recherche rapide
        const soldItemIds = new Set(soldData.itemSolds.map((sold) => sold.itemId));

        // Filtre les items en vente qui ne sont pas dans la liste des items vendus
        const unsoldItems = listedData.itemListeds.filter((item) => !soldItemIds.has(item.itemId));

        // Ne pas afficher les items qui ont une imageURI qui commence par un truc différent de "indigo"
        const itemFiltered = unsoldItems.filter((item) => item.imageURI.startsWith("indigo")); // À supprimer au prochain déploiement

        setLastItems(itemFiltered[0]);
      } catch (err: any) {
        console.error("Error fetching metadata:", err);
        setError(err.message || "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchItemListeds();
  }, []);

  useEffect(() => {
    if (!lastItems) return;
    const fetchCreatorName = async () => {
      const creatorData: GraphQLResponseCreatorNameLastArtwork = await request(GRAPHQL_URL, queries.GET_CREATOR_NAME_BY_ADDRESS, { address: lastItems?.creator });
      setCreatorName(creatorData.userRegistereds[0].userName);
    };
    fetchCreatorName();
  }, [lastItems]);

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-6">
      {/* Section de mise en valeur d'une œuvre */}
      <section className="relative mb-16">
        <div className="relative h-[650px] overflow-hidden rounded-lg shadow-md">
          <img
            src={'https://' + lastItems?.imageURI}
            alt={lastItems?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white">
            <h2 className="text-5xl font-bold"> {lastItems?.name} </h2>
            <p className="mt-2 text-lg">Par <span className="font-semibold">{creatorName}</span></p>
            <Link
              href={`/artworks-list/${encodeURIComponent(lastItems?.name || '')}`}
              className="mt-6 px-6 py-3 bg-indigo-500 rounded-md hover:bg-indigo-600 transition"
            >
              Découvrez cette œuvre
            </Link>
          </div>
        </div>
      </section>

      {/* Section Créateurs et Acheteurs les plus influents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Top Créateurs */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 underline">Meilleurs vendeurs</h3>
          <div className="divide-y divide-gray-200">
            {topArtists.map((artist, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={artist.profileImage}
                  alt={artist.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <Link href={`/creators-list/${encodeURIComponent(artist.name)}`}>
                    <h4
                      className="text-lg font-medium text-gray-800 cursor-pointer">
                      {artist.name}
                    </h4>
                  </Link>
                  <p className="text-gray-600">Total des ventes : <span className="font-medium">{artist.totalValue} €</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Acheteurs */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 underline">Meilleurs acheteurs</h3>
          <div className="divide-y divide-gray-200">
            {topBuyers.map((buyer, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={buyer.image}
                  alt={buyer.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{buyer.name}</h4>
                  <p className="text-gray-600">Total dépensé : <span className="font-medium">{buyer.spent} €</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Section de recommandation ou autres éléments supplémentaires */}
      {/* <section className="mb-16">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Recommandations pour vous</h3>
        <div className="flex flex-wrap gap-8">
           Affichage d'œuvres d'art sous forme de cartes 
           <ArtCard artwork={artworksData[0]} />
          <ArtCard artwork={artworksData[1]} />
          <ArtCard artwork={artworksData[2]} /> 
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
