'use client';
import React from 'react';
import Image from 'next/image';

import moi from '../../icons/moi-le-boss.png';
import jeremy from '../../icons/jeremy.png';
import ahmadou from '../../icons/ahmadou.png';
import rihab from '../../icons/rihab.png';

const About = () => {
    return (
        <div className="max-w-screen-xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
            {/* Titre Principal */}
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-16 tracking-tight leading-tight">
                À propos de Ladoree
            </h1>

            {/* Section Introduction */}
            <section className="bg-white p-12 rounded-lg shadow-lg mb-16">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">Art et Blockchain Réunis</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Bienvenue sur le site de Ladoree ! Ici, nous vous présentons un projet novateur qui fusionne l'artisanat traditionnel avec les possibilités infinies de la blockchain.
                </p>
            </section>

            {/* Introduction Ladoree */}
            <section className="bg-gray-50 p-12 rounded-lg shadow-md mb-16">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">Introduction</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Ladoree est un concept store physique situé à Saint-Sulpice-la-Pointe, dédié à l'art et aux créations artisanales. Nous avons pour ambition de créer une plateforme numérique qui permet aux créateurs d'atteindre une audience mondiale tout en offrant aux acheteurs une expérience unique et sécurisée grâce à la technologie blockchain. Notre vision : transformer l'achat d'œuvres d'art en un processus transparent et traçable pour les créateurs et les collectionneurs du monde entier.
                </p>
            </section>

            {/* Problématique */}
            <section className="bg-white p-12 rounded-lg shadow-lg mb-16">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">Problématique</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-medium text-gray-800 mb-4">Pour les créateurs :</h3>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed text-lg space-y-2">
                            <li>Manque de visibilité et dépendance au marché local.</li>
                            <li>Absence de monétisation sur les reventes (pas de royalties).</li>
                            <li>Difficulté à prouver l'authenticité des œuvres.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-medium text-gray-800 mb-4">Pour les acheteurs :</h3>
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed text-lg space-y-2">
                            <li>Manque de transparence et de confiance sur l'origine des œuvres.</li>
                            <li>Absence de traçabilité sur la revente et la valorisation des objets.</li>
                            <li>Frais élevés liés aux intermédiaires.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Valeur de Proposition */}
            <section className="bg-gray-50 p-12 rounded-lg shadow-md mb-16">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">Valeur de Proposition</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Chez Ladoree, nous proposons une solution unique qui repense le marché de l'art physique en utilisant la blockchain :
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed text-lg space-y-4">
                    <li>
                        <span className="font-medium">Authenticité et traçabilité :</span> Chaque œuvre est associée à un NFT unique garantissant son authenticité et son historique de transactions.
                    </li>
                    <li>
                        <span className="font-medium">Royalties récurrentes pour les créateurs :</span> Chaque revente d'une œuvre génère un revenu pour l'artiste grâce à des smart contracts.
                    </li>
                    <li>
                        <span className="font-medium">DAO et gouvernance participative :</span> Les utilisateurs peuvent influencer la direction de la plateforme grâce au staking de tokens Ladoree (LDR).
                    </li>
                    <li>
                        <span className="font-medium">Marketplace éthique :</span> Une plateforme qui valorise la qualité, l'authenticité et le soutien aux artistes.
                    </li>
                </ul>
            </section>

            {/* Équipe */}
            <section className="bg-white p-12 rounded-lg shadow-lg mb-16">
                <h2 className="text-4xl font-semibold text-gray-900 mb-8 text-center">Rencontrez l'équipe</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {/* Membre 1 - Boss */}
                    <div className="text-center">
                        <Image
                            src={moi}
                            alt="Alexandre Pascal"
                            className="w-36 h-36 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Alexandre Pascal</h3>
                        <h4 className="text-base text-gray-500 italic mb-2">Dit "L'humble"</h4>
                        <p className="text-gray-700">Développeur Blockchain</p>
                    </div>

                    {/* Membre 2 - Blockchain Consultant */}
                    <div className="text-center">
                        <Image
                            src={jeremy}
                            alt="Jérémy Pradelles"
                            className="w-36 h-36 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Jérémy Pradelles</h3>
                        <p className="text-gray-700">Consultant Blockchain</p>
                    </div>

                    {/* Membre 3 - Blockchain Consultant */}
                    <div className="text-center">
                        <Image
                            src={ahmadou}
                            alt="Ahmadou Niaré"
                            className="w-36 h-36 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Ahmadou Niaré</h3>
                        <p className="text-gray-700">Consultant Blockchain</p>
                    </div>

                    {/* Membre 4 - Blockchain Consultant */}
                    <div className="text-center">
                        <Image
                            src={rihab}
                            alt="Rihab el Ouaardi"
                            className="w-36 h-36 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Rihab el Ouaardi</h3>
                        <p className="text-gray-700">Consultant Blockchain</p>
                    </div>
                </div>
            </section>

            {/* Valeurs */}
            <section className="bg-gray-50 p-12 rounded-lg shadow-md mb-16">
                <h2 className="text-4xl font-semibold text-gray-900 mb-6">Nos valeurs</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Nous sommes guidés par l'intégrité, la transparence et la passion pour l'art. Nous cherchons à créer une communauté inclusive et respectueuse, où chaque artiste peut prospérer et où chaque acheteur peut vivre une expérience enrichissante. Nous croyons fermement que l'art doit être partagé, apprécié et soutenu, quelle que soit sa forme.
                </p>
            </section>
        </div>
    );
};

export default About;
