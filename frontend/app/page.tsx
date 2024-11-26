'use client';
import React from 'react';
import Link from 'next/link';
import ArtCard from '@/components/shared/ArtCard';
import { artworksData } from '../data/artistsData';

// Exemple de données d'artistes et d'acheteurs
const topArtists = [
  {
    name: 'Vincent van Gogh',
    sales: '210 000 000',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg',
  },
  {
    name: 'Leonardo da Vinci',
    sales: '180 000 000',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/800px-Francesco_Melzi_-_Portrait_of_Leonardo.png',
  },
  {
    name: 'Salvador Dalí',
    sales: '120 000 000',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/800px-Salvador_Dal%C3%AD_1939.jpg',
  },
];

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

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-12 px-6">
      {/* Section de mise en valeur d'une œuvre */}
      <section className="relative mb-16">
        <div className="relative h-[500px] overflow-hidden rounded-lg shadow-md">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
            alt="La Nuit étoilée"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white">
            <h2 className="text-5xl font-bold">La Nuit étoilée</h2>
            <p className="mt-2 text-lg">Par Vincent van Gogh</p>
            <Link
              href="/artworks-list/La%20Nuit%20étoilée"
              className="mt-6 px-6 py-3 bg-indigo-500 rounded-md hover:bg-indigo-600 transition"
            >
              Découvrez cette œuvre
            </Link>
          </div>
        </div>
      </section>

      {/* Section Artistes et Acheteurs les plus influents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Top Artistes */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 underline">Artistes les plus vendus</h3>
          <div className="divide-y divide-gray-200">
            {topArtists.map((artist, index) => (
              <div
                key={index}
                className="flex items-center gap-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{artist.name}</h4>
                  <p className="text-gray-600">Total des ventes : <span className="font-medium">{artist.sales} €</span></p>
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
      <section className="mb-16">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Recommandations pour vous</h3>
        <div className="flex flex-wrap gap-8">
          {/* Affichage d'œuvres d'art sous forme de cartes */}
          <ArtCard artwork={artworksData[0]} />
          <ArtCard artwork={artworksData[1]} />
          <ArtCard artwork={artworksData[2]} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
