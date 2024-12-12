// components/ArtCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Metadata {
    image: string;
    name: string;
    description: string;
    price: string;
}

const ArtCard = ({ metadata }: { metadata: Metadata }) => {
    return (
        //Je sais pas quel est le meilleur choix entre les deux, peut être un mix des deux genre le style du premier structuré comme le deuxième

        <Link href={`/artworks-list/${encodeURIComponent(metadata.name)}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex-none w-[350px] content-center">
                <div className="relative h-80">
                    <Image src={metadata.image} alt={metadata.name} sizes="100%" fill className="w-full h-full object-cover" />
                </div>
                <div className="py-8 px-4">
                    <div className="flex items-center">
                        <div className="w-12 h-16 relative rounded-full overflow-hidden">
                            {/* <Image src={metadata.artistImage} alt={metadata.artist} sizes='100%' fill className="rounded-full border-2 border-gray-200 w-full h-full object-cover" /> */}
                        </div>
                        {/* <Image src={metadata.artistImage} alt={metadata.artist} layout="fill" objectFit="cover" className="rounded-full border-2 border-gray-200 w-full h-full object-cover" /> */}
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">{metadata.name}</h3>
                            {/* <p className="text-gray-500">Artiste : {metadata.artist}</p> */}
                            <p className="text-gray-500">Prix : {metadata.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

        // <Link
        //     href={{
        //         pathname: `/artworks-list/${encodeURIComponent(metadata.title)}`,

        //     }}
        //     className="border p-4 rounded-md transition-colors duration-300 hover:bg-gray-50 flex-none w-[325px] h-[450px] content-center justify-items-center cursor-pointer"
        // >
        //     <div>
        //         <img
        //             src={metadata.image}
        //             alt="Oeuvre d'art"
        //             className="w-[275px] h-[275px] object-cover rounded-md"
        //         />
        //         <div className="w-full mt-4 px-6">
        //             <h3 className="text-xl text-gray-800 mt-4">{metadata.title}</h3>

        //             <div className="flex items-center mt-2 gap-2">
        //                 <img
        //                     src={metadata.artistImage}
        //                     alt="Artiste"
        //                     className="w-6 h-6 object-cover rounded-full"
        //                 />
        //                 <p className="text-gray-600">{metadata.artist}</p>
        //             </div>
        //             <p className="text-gray-800 mt-2 border border-white border-t-gray-200 pt-1 w">
        //                 {metadata.price} €
        //             </p>
        //         </div>
        //     </div>
        // </Link>

    );
};

export default ArtCard;
