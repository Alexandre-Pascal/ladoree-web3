// app/artists-list/[artistName]/page.tsx
import React from 'react';
import { artistsData } from '../../../data/artistsData'; // ou le bon chemin d'accès à vos données

interface ArtistDetailPageProps {
    params: {
        artistName: string;
    };
}


const ArtistDetailPage: React.FC<ArtistDetailPageProps> = ({ params }) => {
    const { artistName } = params;

    // Décoder le nom de l'artiste dans l'URL
    const decodedArtistName = decodeURIComponent(artistName);

    // Trouver l'artiste en utilisant une comparaison insensible à la casse
    const artist = artistsData.find(a => a.name.toLowerCase() === decodedArtistName.toLowerCase());

    if (!artist) {
        return <p>Artiste non trouvé.</p>;
    }

    return (
        <div className="max-w-screen-xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
            <h1 className="text-5xl font-bold text-center text-gray-800">{artist.name}</h1>
            <div className="flex items-center mt-8">
                <img
                    src={artist.profileImage}
                    alt={artist.name}
                    className="w-48 h-48 object-cover rounded-full border-2 border-gray-200"
                />
                <div className="ml-8">
                    <p className="text-xl text-gray-600">{artist.biography}</p>
                    <h2 className="text-lg font-semibold text-gray-800 mt-4">Œuvres notables</h2>
                    <ul className="list-disc pl-6 mt-2">
                        {artist.notableWorks.map((work, index) => (
                            <li key={index} className="text-gray-600">{work}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ArtistDetailPage;
