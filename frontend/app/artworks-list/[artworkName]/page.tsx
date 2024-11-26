'use client';
import React from 'react';
import ArtCard from '@/components/shared/ArtCard';
import { artworksData } from '../../../data/artistsData';
import Link from 'next/link';

interface ArtworkDetailPageProps {
    params: {
        artworkName: string;
    };
}

const ArtworkDetailPage: React.FC<ArtworkDetailPageProps> = ({ params }) => {

    const { artworkName } = params;

    const decodeArtworkTitle = decodeURIComponent(artworkName);

    const artwork = artworksData.find(a => a.title.toLowerCase() === decodeArtworkTitle.toLowerCase());

    if (!artwork) {
        return <p>Oeuvre d'art non trouvée.</p>;
    }

    return (
        <div>
            <div className="max-w-screen-xl-2xl mx-auto py-12 flex h-screen-header">
                <div className="w-4/6 flex justify-center items-center  bg-gray-50 px-8">
                    {artwork.image && (
                        <img
                            src={artwork.image}
                            alt={artwork.title || 'artwork'}
                            className=" object-cover rounded-md max-h-full-header"
                        />
                    )}
                </div>
                <div className="w-2/6 flex flex-col justify-center pl-16">
                    <h1 className="text-3xl font-normal">{artwork.title}</h1>
                    <div className="flex items-center mt-2 gap-2">
                        {artwork.artistImage && (
                            <img
                                src={artwork.artistImage}
                                alt={artwork.artist || 'Artist'}
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        )}
                        <Link href={`/artists-list/${encodeURIComponent(artwork.artist)}`}>
                            <p className="text-gray-600 hover:underline">{artwork.artist}</p>
                        </Link>
                    </div>
                    <p className="text-xl text-gray-800 mt-4  border-b border-gray-300 pb-2">{artwork.price} €</p>
                    <div className="mt-6 flex flex-col gap-4">
                        <button className="bg-black text-white px-4 py-2 rounded-sm">ACHETER MAINTENANT</button>
                        <button className="bg-white text-black px-4 py-2 rounded-sm border border-black">FAIRE UNE OFFRE</button>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-normal">Description</h2>
                        <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc sit amet urna
                            efficitur tincidunt. Nullam nec nunc eget libero lacinia lacinia. Nullam nec nunc eget
                            libero lacinia lacinia.
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl-2xl mx-auto pb-12">
                <h1 className="text-2xl font-normal text-center mt-12">Autres oeuvres de l'artiste</h1>
                <div className="flex flex-wrap justify-center gap-8 mt-6">
                    {artworksData
                        .filter(a => a.artist === artwork.artist)
                        .map((artwork, index) => (
                            <ArtCard key={index} artwork={artwork} />
                        ))}

                </div>
            </div>
        </div>
    );
};

// Envelopper le composant avec Suspense pour gérer l'asynchronisme de useSearchParams()
export default ArtworkDetailPage;