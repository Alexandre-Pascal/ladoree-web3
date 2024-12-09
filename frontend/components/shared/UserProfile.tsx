'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';

export default function UserProfile() {
  const { address } = useAccount(); // Récupère l'adresse utilisateur connectée

  type UserProfileData = {
    userRegistereds: {
      email: string;
      firstName: string;
      lastName: string;
    }[];
  };

  const { data, isLoading, error } = useQuery<UserProfileData>({
    queryKey: ['userProfile', address], // Clé unique pour l'utilisateur
    queryFn: async () => {
      return await request(GRAPHQL_URL, queries.GET_USER_PROFILE, { user: address });
    },
    enabled: !!address, // Exécute la requête uniquement si une adresse est disponible
  });

  if (!address) return <p>Veuillez connecter votre portefeuille pour accéder à votre profil.</p>;
  if (isLoading) return <p>Chargement des données utilisateur...</p>;
  if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

  // Extraction des données utilisateur
  const { email, firstName, lastName } = data?.userRegistereds?.[0] || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Profil Utilisateur</h1>
            <p className="text-gray-500">Gérez vos informations personnelles</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <p className="mt-1 text-gray-900">{firstName || 'Non renseigné'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <p className="mt-1 text-gray-900">{lastName || 'Non renseigné'}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{email || 'Non renseigné'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
