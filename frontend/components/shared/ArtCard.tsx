// components/ArtCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Artwork {
    image: string;
    title: string;
    artistImage: string;
    artist: string;
    price: string;
}

const ArtCard = ({ artwork }: { artwork: Artwork }) => {
    return (
        //Je sais pas quel est le meilleur choix entre les deux, peut être un mix des deux genre le style du premier structuré comme le deuxième

        // <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
        //     onClick={() => window.location.href = `/artworks-list/${encodeURIComponent(artwork.title)}`}
        // >
        //     <div className="relative h-48">
        //         <Image src={artwork.image} alt={artwork.title} layout="fill" objectFit="cover" className="w-full h-full object-cover" />
        //     </div>
        //     <div className="p-6">
        //         <div className="flex items-center">
        //             <Image src={artwork.artistImage} alt={artwork.artist} width={60} height={60} className="rounded-full border-2 border-gray-200" />
        //             <div className="ml-4">
        //                 <h3 className="text-lg font-semibold text-gray-800">{artwork.title}</h3>
        //                 <p className="text-gray-500">Artiste : {artwork.artist}</p>
        //                 <p className="text-gray-500">Prix : {artwork.price}</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <Link
            href={{
                pathname: `/artworks-list/${encodeURIComponent(artwork.title)}`,

            }}
            className="border p-4 rounded-md transition-colors duration-300 hover:bg-gray-50 flex-none w-[325px] h-[450px] content-center justify-items-center cursor-pointer"
        >
            <div>
                <img
                    src={artwork.image}
                    alt="Oeuvre d'art"
                    className="w-[275px] h-[275px] object-cover rounded-md"
                />
                <div className="w-full mt-4 px-6">
                    <h3 className="text-xl text-gray-800 mt-4">{artwork.title}</h3>

                    <div className="flex items-center mt-2 gap-2">
                        <img
                            src={artwork.artistImage}
                            alt="Artiste"
                            className="w-6 h-6 object-cover rounded-full"
                        />
                        <p className="text-gray-600">{artwork.artist}</p>
                    </div>
                    <p className="text-gray-800 mt-2 border border-white border-t-gray-200 pt-1 w">
                        {artwork.price} €
                    </p>
                </div>
            </div>
        </Link>

    );
};

export default ArtCard;
