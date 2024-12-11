'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useWriteContract } from 'wagmi';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { Pencil, Save } from 'lucide-react';
import { userManagerAbi, userManagerAddress } from '@/utils/abis';
import { toast } from 'react-hot-toast';

export default function UserProfile() {
  const { address } = useAccount(); // Récupère l'adresse utilisateur connectée

  type UserProfileData = {
    userRegistereds: {
      userName: string;
      email: string;
      bio: string;
    }[];
  };

  const { data, isLoading, error, isSuccess: isSuccessQuery } = useQuery<UserProfileData>({
    queryKey: ['userProfile', address], // Clé unique pour l'utilisateur
    queryFn: () => {
      return request(GRAPHQL_URL, queries.GET_USER_PROFILE, { user: address });
    },
    enabled: !!address, // Exécute la requête uniquement si une adresse est disponible
  });

  const { writeContract: updateUserName, isSuccess: updateUserNameIsSuccess, isError: updateUserNameIsError, isPending: updateUserNameIsPending } = useWriteContract();
  const { writeContract: updateEmail, isSuccess: updateEmailIsSuccess, isError: updateEmailIsError, isPending: updateEmailIsPending } = useWriteContract();
  const { writeContract: updateBio, isSuccess: updateBioIsSuccess, isError: updateBioIsError, isPending: updateBioIsPending } = useWriteContract();

  // Mise à jour du userName
  const setUserName = (_userName: string) => {
    updateUserName({
      address: userManagerAddress,
      abi: userManagerAbi,
      functionName: 'setUserName',
      args: [address, _userName],
    });
  };

  useEffect(() => {
    let toastId: string = '';
    if (updateUserNameIsPending) {
      toastId = toast.loading('Mise à jour du nom...');
    }

    if (updateUserNameIsSuccess && isSuccessQuery) {
      setTimeout(() => toast.success('Nom mis à jour avec succès !', { id: toastId }), 5000)
      setTimeout(() => window.location.reload(), 7000);
    }

    if (updateUserNameIsError) {
      toast.error('Erreur lors de la mise à jour du nom.', { id: toastId });

    }
  }, [updateUserNameIsPending, updateUserNameIsSuccess, updateUserNameIsError, isSuccessQuery]);

  // Mise à jour de l'email
  const setEmail = (_email: string) => {
    updateEmail({
      address: userManagerAddress,
      abi: userManagerAbi,
      functionName: 'setUserEmail',
      args: [address, _email],
    });
  };


  useEffect(() => {
    let toastId: string = '';
    if (updateEmailIsPending) {
      toastId = toast.loading('Mise à jour de l\'email...');
    }

    if (updateEmailIsSuccess && isSuccessQuery) {
      setTimeout(() => toast.success('Email mis à jour avec succès !', { id: toastId }), 5000)
      setTimeout(() => window.location.reload(), 7000);
    }

    if (updateEmailIsError) {
      toast.error('Erreur lors de la mise à jour de l\'email.', { id: toastId });
    }
  }, [updateEmailIsPending, updateEmailIsSuccess, updateEmailIsError, isSuccessQuery]);

  // Mise à jour de la bio
  const setBio = (_bio: string) => {
    updateBio({
      address: userManagerAddress,
      abi: userManagerAbi,
      functionName: 'setUserBio',
      args: [address, _bio],
    });
  };

  useEffect(() => {
    let toastId: string = '';
    if (updateBioIsPending) {
      toastId = toast.loading('Mise à jour de la bio...');
    }

    if (updateBioIsSuccess && isSuccessQuery) {
      setTimeout(() => toast.success('Bio mise à jour avec succès !', { id: toastId }), 5000)
      setTimeout(() => window.location.reload(), 7000);
    }

    if (updateBioIsError) {
      toast.error('Erreur lors de la mise à jour de la bio.', { id: toastId });
    }
  }, [updateBioIsPending, updateBioIsSuccess, updateBioIsError, isSuccessQuery]);

  // États locaux pour gérer l'édition
  const [isEditing, setIsEditing] = useState<{ userName: boolean; email: boolean; bio: boolean }>({
    userName: false,
    email: false,
    bio: false,
  });

  const [formData, setFormData] = useState<{ userName: string; email: string; bio: string }>({
    userName: '',
    email: '',
    bio: '',
  });

  if (!address) return <p>Veuillez connecter votre portefeuille pour accéder à votre profil.</p>;
  if (isLoading) return <p>Chargement des données utilisateur...</p>;
  if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

  // Extraction des données utilisateur
  const { email, userName, bio } = data?.userRegistereds?.[0] || {};

  const handleEdit = (field: 'userName' | 'email' | 'bio') => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    setFormData({ userName: userName || '', email: email || '', bio: bio || '' }); // Préremplit les champs avec les valeurs actuelles
  };

  const handleSave = (field: string) => {
    if (field === 'userName') {
      setUserName(formData.userName);
    } else if (field === 'email') {
      setEmail(formData.email);
    } else if (field === 'bio') {
      setBio(formData.bio);
    }

    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

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
              {/* Nom Complet / Pseudonyme */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom Complet / Pseudonyme (Obligatoire)</label>
                <div className="flex items-center space-x-2">
                  {isEditing.userName ? (
                    <input
                      type="text"
                      value={formData.userName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
                      className="mt-1 text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{userName || 'Non renseigné'}</p>
                  )}
                  <button onClick={() => (isEditing.userName ? handleSave('userName') : handleEdit('userName'))}>
                    {isEditing.userName ? <Save className="w-5 h-5 text-green-500" /> : <Pencil className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="flex items-center space-x-2">
                  {isEditing.email ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="mt-1 text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{email || 'Non renseigné'}</p>
                  )}
                  <button onClick={() => (isEditing.email ? handleSave('email') : handleEdit('email'))}>
                    {isEditing.email ? <Save className="w-5 h-5 text-green-500" /> : <Pencil className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <div className="flex items-center space-x-2">
                  {isEditing.bio ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                      className="mt-1 text-gray-900 w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{bio || 'Non renseigné'}</p>
                  )}
                  <button onClick={() => (isEditing.bio ? handleSave('bio') : handleEdit('bio'))}>
                    {isEditing.bio ? <Save className="w-5 h-5 text-green-500" /> : <Pencil className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
