'use client';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import UserProfile from '@/components/shared/UserProfile';

export default async function HomePage() {
    const queryClient = new QueryClient();

    // Préfetch des données utilisateur (remplace par une adresse réelle si nécessaire)
    const userAddress = '0x268AeBdAEf1ad7cd367f710BFBb347b46760e7E1';
    await queryClient.prefetchQuery({
        queryKey: ['userProfile', userAddress],
        queryFn: async () => {
            const result = await request(GRAPHQL_URL, queries.GET_USER_PROFILE, { user: userAddress });
            return result;
        },
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UserProfile />
        </HydrationBoundary>
    );
}
