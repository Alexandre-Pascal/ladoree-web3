'use client';

import React, { Suspense } from 'react';  // Import de Suspense
import ArtCard from '@/components/shared/ArtCard';
import { useSearchParams } from 'next/navigation';

const ArtworkPage = () => {
    const searchParams = useSearchParams();
    const image = searchParams.get('image');
    const title = searchParams.get('title');
    const artistImage = searchParams.get('artistImage');
    const artist = searchParams.get('artist');
    const price = searchParams.get('price');

    return (
        <div>
            <div className="max-w-screen-xl-2xl mx-auto py-12 flex h-screen-header">
                <div className="w-4/6 flex justify-center items-center  bg-gray-50 px-8">
                    {image && (
                        <img
                            src={image}
                            alt={title || 'Artwork'}
                            className=" object-cover rounded-md max-h-full-header"
                        />
                    )}
                </div>
                <div className="w-2/6 flex flex-col justify-center pl-16">
                    <h1 className="text-3xl font-normal">{title}</h1>
                    <div className="flex items-center mt-2 gap-2">
                        {artistImage && (
                            <img
                                src={artistImage}
                                alt={artist || 'Artist'}
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        )}
                        <p className="text-gray-600">{artist}</p>
                    </div>
                    <p className="text-xl text-gray-800 mt-4  border-b border-gray-300 pb-2">{price} €</p>
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
                    {/* Carte d'oeuvre d'art */}
                    <ArtCard
                        image={image || ''}
                        title={title || ''}
                        artistImage={artistImage || ''}
                        artist={artist || ''}
                        price={price || ''}
                    />
                    <ArtCard
                        image={image || ''}
                        title={title || ''}
                        artistImage={artistImage || ''}
                        artist={artist || ''}
                        price={price || ''}
                    />
                    <ArtCard
                        image={image || ''}
                        title={title || ''}
                        artistImage={artistImage || ''}
                        artist={artist || ''}
                        price={price || ''}
                    />
                    <ArtCard
                        image={image || ''}
                        title={title || ''}
                        artistImage={artistImage || ''}
                        artist={artist || ''}
                        price={price || ''}
                    />
                </div>
            </div>
        </div>
    );
};

// Envelopper le composant avec Suspense pour gérer l'asynchronisme de useSearchParams()
export default function Page() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ArtworkPage />
        </Suspense>
    );
}
