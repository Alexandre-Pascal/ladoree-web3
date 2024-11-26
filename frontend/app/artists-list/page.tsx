'use client';
import React from 'react';
import Image from 'next/image';

// Exemple de données d'artistes
const artistsData = [
    {
        name: 'Léonard de Vinci',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/800px-Francesco_Melzi_-_Portrait_of_Leonardo.png',
        artworksSold: 5,
        artworksForSale: 2,
        totalValue: 78000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg',
    },
    {
        name: 'Vincent van Gogh',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg',
        artworksSold: 8,
        artworksForSale: 3,
        totalValue: 172000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Korenveld_met_kraaien_-_s0149V1962_-_Van_Gogh_Museum.jpg/1920px-Korenveld_met_kraaien_-_s0149V1962_-_Van_Gogh_Museum.jpg',
    },
    {
        name: 'Salvador Dalí',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/800px-Salvador_Dal%C3%AD_1939.jpg',
        artworksSold: 3,
        artworksForSale: 1,
        totalValue: 60000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    },
    {
        name: 'Edvard Munch',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Edvard_Munch_1933-2.jpg',
        artworksSold: 4,
        artworksForSale: 1,
        totalValue: 120000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg',
    },
    {
        name: 'Sandro Botticelli',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sandro_Botticelli_Self-portrait_ca_1475.jpg/800px-Sandro_Botticelli_Self-portrait_ca_1475.jpg',
        artworksSold: 6,
        artworksForSale: 2,
        totalValue: 140000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1920px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    },
    {
        name: 'Claude Monet',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg',
        artworksSold: 7,
        artworksForSale: 3,
        totalValue: 110000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1280px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg',
    },
    {
        name: 'Grant Wood',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Grant_Wood.jpg',
        artworksSold: 2,
        artworksForSale: 1,
        totalValue: 85000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/800px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg',
    },
];

// Composant pour afficher chaque artiste
interface Artist {
    name: string;
    image: string;
    artworksSold: number;
    artworksForSale: number;
    totalValue: number;
    profileImage: string;
}

const ArtistCard = ({ artist }: { artist: Artist }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48">
            <Image
                src={artist.profileImage}
                alt={artist.name}
                fill={true} // Utilisation de `fill` pour la gestion de l'image
                style={{ objectFit: 'cover' }} // Remplacement de `objectFit="cover"`
                className="w-full h-full"
            />
        </div>
        <div className="p-6">
            <div className="flex items-center">
                <Image
                    src={artist.image}
                    alt={artist.name}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-gray-200"
                />
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{artist.name}</h3>
                    <p className="text-gray-500">Œuvres vendues : {artist.artworksSold}</p>
                    <p className="text-gray-500">Œuvres en vente : {artist.artworksForSale}</p>
                    <p className="text-gray-500">Valeur totale : ${artist.totalValue.toLocaleString()}</p>
                </div>
            </div>
        </div>
    </div>
);

// Composant principal pour la liste des artistes
const ArtistsPage = () => {
    return (
        <div className="max-w-screen-xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-16">Nos Artistes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {artistsData.map((artist, index) => (
                    <ArtistCard key={index} artist={artist} />
                ))}
            </div>
        </div>
    );
};

export default ArtistsPage;
