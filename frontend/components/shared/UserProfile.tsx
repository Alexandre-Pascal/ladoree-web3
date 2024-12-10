'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';

export default function UserProfile() {
  const { address } = useAccount(); // Récupère l'adresse utilisateur connectée

  type UserProfileData = {
    userRegistereds: {
      userName: string;
      email: string;
      bio: string;
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
  const { email, userName, bio } = data?.userRegistereds?.[0] || {};

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
                <label className="block text-sm font-medium text-gray-700">Nom Complet / Pseudonyme (Obligatoire)</label>
                <p className="mt-1 text-gray-900">{userName || 'Non renseigné'}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{email || 'Non renseigné'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea className="mt-1 text-gray-900">{bio || 'Non renseigné'}</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
