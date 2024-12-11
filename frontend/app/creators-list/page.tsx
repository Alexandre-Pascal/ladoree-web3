'use client';
import React, { useEffect, useState } from 'react';
import CreatorCard from '@/components/shared/CreatorCard';
import { useQuery } from '@tanstack/react-query';
import { Creator, CreatorData } from '@/utils/types';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';

const CreatorsPage = () => {
    // Utilisation d'un state pour stocker les créateurs uniques
    const [uniqueCreators, setUniqueCreators] = useState<Creator[]>([]);

    // Requête GraphQL pour récupérer les créateurs
    const { data, isLoading, error, isSuccess: isSuccessQuery } = useQuery<CreatorData>({
        queryKey: ['creators'],
        queryFn: () => {
            return request(GRAPHQL_URL, queries.GET_CREATORS);
        },
    });

    // Fonction pour supprimer les doublons d'emails et conserver les plus récents
    const removeDuplicateEmails = (data: CreatorData) => {
        const seenEmails = new Set();
        const filteredCreators: Creator[] = [];

        for (const creator of data.userRegistereds) {
            if (!seenEmails.has(creator.email)) {
                filteredCreators.push(creator);
                seenEmails.add(creator.email);
            }
        }
        return filteredCreators;
    };

    // Met à jour le state lorsque la requête réussit
    useEffect(() => {
        if (isSuccessQuery && data) {
            const unique = removeDuplicateEmails(data);
            setUniqueCreators(unique); // Mise à jour du state
        }
    }, [isSuccessQuery, data]);

    return (
        <div className="max-w-screen-xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-16">Nos Créateurs</h1>
            {isLoading && <p className="text-center text-gray-500">Chargement...</p>}
            {error && <p className="text-center text-red-500">Une erreur est survenue.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {uniqueCreators.length > 0 ? (
                    uniqueCreators.map((creator, index) => (
                        <CreatorCard key={index} creator={creator} />
                    ))
                ) : (
                    <div className="text-center">Aucun créateur pour le moment</div>
                )}
            </div>
        </div>
    );
};

export default CreatorsPage;
