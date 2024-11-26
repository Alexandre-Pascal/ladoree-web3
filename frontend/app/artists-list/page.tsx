'use client';
import React from 'react';
import Image from 'next/image';
import { artistsData } from '../../data/artistsData'; // Import des données depuis le fichier centralisé

// Composant pour afficher chaque artiste
interface Artist {
    name: string;
    image: string;
    artworksSold: number;
    artworksForSale: number;
    totalValue: number;
    profileImage: string;
    biography: string;
    notableWorks: string[];
    era: string;
}

const ArtistCard = ({ artist }: { artist: Artist }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onClick={() => window.location.href = `/artists-list/${encodeURIComponent(artist.name)}`}
    >
        <div className="relative h-48">
            <Image
                src={artist.profileImage}
                alt={artist.name}
                fill={true}
                style={{ objectFit: 'cover' }}
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
