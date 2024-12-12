'use client';

// app/creators-list/[creatorName]/page.tsx
import React from 'react';
import { CreatorData } from '@/utils/types';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { useQuery } from '@tanstack/react-query';
import user from "@/icons/user.png";
import Image from 'next/image';

interface ArtistDetailPageProps {
    params: {
        creatorName: string;
    };
}

const ArtistDetailPage: React.FC<ArtistDetailPageProps> = ({ params }) => {
    const { creatorName } = params;

    const decodedcreatorName = decodeURIComponent(creatorName);

    const { data } = useQuery<CreatorData>({
        queryKey: ['creator', decodedcreatorName],
        queryFn: () => {
            return request(GRAPHQL_URL, queries.GET_CREATOR, {
                userName: decodedcreatorName,
            });
        },
    });

    const { userName, email, bio, profileImage } = data?.userRegistereds[0] || {};

    if (!data) {
        return <p>Artiste non trouvé.</p>;
    }

    return (
        <div className="max-w-screen-xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
            <h1 className="text-5xl font-bold text-center text-gray-800">{userName}</h1>
            <div className="flex items-center mt-8">
                <Image
                    src={profileImage || user}
                    alt={userName ? userName : "user"}
                    width={192}
                    height={192}
                    className="w-48 h-48 object-cover rounded-full border-2 border-gray-200"
                />
                <div className="ml-8">
                    <p className="text-xl text-gray-600">{bio}</p>
                    <p className="text-gray-600 mt-2">Email : {email}</p>
                    <h2 className="text-lg font-semibold text-gray-800 mt-4">Œuvres notables</h2>
                    <ul className="list-disc pl-6 mt-2">
                        {/* {artist.notableWorks.map((work, index) => (
                            <li key={index} className="text-gray-600">{work}</li>
                        ))} /*/}
                    </ul>
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8">Œuvres de {userName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {/* {artworksData
                    .filter(artwork => artwork.artist === userName)
                    .map(artwork => (
                        <ArtCard key={artwork.title} artwork={artwork} />
                    ))} */}
            </div>
        </div>
    );
};

export default ArtistDetailPage;