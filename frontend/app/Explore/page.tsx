'use client';
import React, { useState } from 'react';
import { Filter } from 'lucide-react'; // Import de l'icône de filtre
import ArtCard from '@/components/shared/ArtCard';

const page = () => {
    // État pour contrôler l'affichage des filtres
    const [filtersVisible, setFiltersVisible] = useState(false);

    // Fonction pour basculer l'état d'affichage des filtres
    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    return (
        <div>
            <div className="py-12 text-center border-b border-gray-300">
                <h1 className='text-3xl tracking-wide text-gray-800'>Explore</h1>
                <p className='text-gray-500 mt-1'>100 résultats</p>
            </div>

            <div className="flex max-w-screen-xl-2xl mx-auto py-12 relative ">
                {/* Colonne de filtres à gauche */}
                <div className={`w-1/4 pr-8 ${filtersVisible ? 'block' : 'hidden'} mt-6`}>
                    {/* Section de filtres */}
                    <aside className="space-y-8">
                        <div className="text-center border-b border-gray-300 pb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Filtres</h2>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Catégorie</label>
                            <select className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Prix</label>
                            <input type="range" className="w-full bg-gray-200 rounded-md" />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Note</label>
                            <select className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>1 étoile</option>
                                <option>2 étoiles</option>
                                <option>3 étoiles</option>
                                <option>4 étoiles</option>
                                <option>5 étoiles</option>
                            </select>
                        </div>
                    </aside>
                </div>

                {/* Colonne de résultats à droite */}
                <div className={`w-full ${filtersVisible ? 'w-3/4' : 'w-full'} flex flex-wrap gap-8 mt-6 max-md:justify-center`}>
                    {/* Bouton icône de filtre placé en haut à gauche des oeuvres */}
                    <div className="absolute top-0 left-0 mt-4 ml-6">
                        <button
                            onClick={toggleFilters}
                            className="flex items-center text-black px-4 py-2 rounded-md shadow-sm"
                        >
                            <Filter className="mr-2" strokeWidth={1} /> {/* Icône de filtre */}
                            <span>{filtersVisible ? 'Masquer les filtres' : 'Afficher les filtres'}</span>
                        </button>
                    </div>

                    <ArtCard
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg"
                        title="La Joconde"
                        artistImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/800px-Francesco_Melzi_-_Portrait_of_Leonardo.png"
                        artist="Léonard de Vinci"
                        price={"78 000 000"}
                    />
                    <ArtCard
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Korenveld_met_kraaien_-_s0149V1962_-_Van_Gogh_Museum.jpg/1920px-Korenveld_met_kraaien_-_s0149V1962_-_Van_Gogh_Museum.jpg"
                        title="Champ de blé aux corbeaux"
                        artistImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg"
                        artist="Vincent van Gogh"
                        price={"90 000 000"}
                    />
                    <ArtCard
                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
                        title="La Nuit étoilée"
                        artistImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg"
                        artist="Vincent van Gogh"
                        price={"82 000 000"}
                    />
                    <ArtCard
                        image="https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg"
                        title="La Persistance de la mémoire"
                        artistImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/800px-Salvador_Dal%C3%AD_1939.jpg"
                        artist="Salvador Dalí"
                        price={"60 000 000"}
                    />
                    <ArtCard
                        image="https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg"
                        title="Le Cri"
                        artistImage="https://upload.wikimedia.org/wikipedia/commons/4/4a/Edvard_Munch_1933-2.jpg"
                        artist="Edvard Munch"
                        price={"120 000 000"}
                    />

                </div>
            </div>
        </div >
    );
};

export default page;
