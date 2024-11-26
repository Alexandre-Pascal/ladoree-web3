import React from 'react';
import Link from 'next/link';

interface ArtCardProps {
    image: string;
    title: string;
    artistImage: string;
    artist: string;
    price: string;
}

const ArtCard: React.FC<ArtCardProps> = ({ image, title, artistImage, artist, price }) => {
    return (
        <Link
            href={{
                pathname: '/artwork', // Page de destination
                query: {
                    image,
                    title,
                    artistImage,
                    artist,
                    price,
                },
            }}
            className="border p-4 rounded-md transition-colors duration-300 hover:bg-gray-50 flex-none w-[325px] h-[450px] content-center justify-items-center cursor-pointer"
        >
            <div>
                <img
                    src={image}
                    alt="Oeuvre d'art"
                    className="w-[275px] h-[275px] object-cover rounded-md"
                />
                <div className="w-full mt-4 px-6">
                    <h3 className="text-xl text-gray-800 mt-4">{title}</h3>

                    <div className="flex items-center mt-2 gap-2">
                        <img
                            src={artistImage}
                            alt="Artiste"
                            className="w-6 h-6 object-cover rounded-full"
                        />
                        <p className="text-gray-600">{artist}</p>
                    </div>
                    <p className="text-gray-800 mt-2 border border-white border-t-gray-200 pt-1 w">
                        {price} €
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ArtCard;
