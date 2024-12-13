'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useWriteContract } from 'wagmi';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { Pencil, Save } from 'lucide-react';
import { userManagerAbi, userManagerAddress } from '@/utils/abis';
import { toast } from 'react-hot-toast';
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { User } from 'lucide-react';
import Image from 'next/image';


export default function UserProfile() {
    const { address } = useAccount(); // Récupère l'adresse utilisateur connectée

    type UserProfileData = {
        userRegistereds: {
            userName: string;
            email: string;
            bio: string;
            isCreator: boolean;
            profileImage: string;
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
    const { writeContract: updateIsCreator, isSuccess: updateIsCreatorIsSuccess, isError: updateIsCreatorIsError, isPending: updateIsCreatorIsPending } = useWriteContract();
    const { writeContract: updateProfileImage, isSuccess: updateProfileImageIsSuccess, isError: updateProfileImageIsError, isPending: updateProfileImageIsPending, error: updateProfileImageError } = useWriteContract();

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


    const setIsCreator = (_isCreator: boolean) => {
        updateIsCreator({
            address: userManagerAddress,
            abi: userManagerAbi,
            functionName: 'setUserIsCreator',
            args: [address, _isCreator],
        });
    };

    useEffect(() => {
        let toastId: string = '';
        if (updateIsCreatorIsPending) {
            toastId = toast.loading('Mise à jour du statut de créateur...');
        }

        if (updateIsCreatorIsSuccess && isSuccessQuery) {
            setTimeout(() => toast.success('Statut de créateur mis à jour avec succès !', { id: toastId }), 5000)
            setTimeout(() => window.location.reload(), 7000);
        }

        if (updateIsCreatorIsError) {
            toast.error('Erreur lors de la mise à jour du statut de créateur.', { id: toastId });
        }
    }, [updateIsCreatorIsPending, updateIsCreatorIsSuccess, updateIsCreatorIsError, isSuccessQuery]);

    let toastId: string = '';

    const setImageProfile = async () => {
        toastId = toast.loading('Mise à jour de la photo de profil...');

        const url = await uploadFileAndReturnIpfsURL();
        updateProfileImage({
            address: userManagerAddress,
            abi: userManagerAbi,
            functionName: 'setUserProfileImage',
            args: [address, url],
        });
    };

    useEffect(() => {
        if (updateProfileImageIsSuccess && isSuccessQuery) {
            setTimeout(() => toast.success('Photo de profil mise à jour avec succès !', { id: toastId }), 5000)
            setTimeout(() => window.location.reload(), 7000);
        }

        if (updateProfileImageIsError) {
            toast.error('Erreur lors de la mise à jour de la photo de profil.', { id: toastId });
            console.log("updateProfileImageIsError", updateProfileImageError);
        }
    }, [updateProfileImageIsPending, updateProfileImageIsSuccess, updateProfileImageIsError, isSuccessQuery]);


    const [file, setFile] = useState<File>();



    const uploadFileAndReturnIpfsURL = async () => {
        try {
            if (!file) {
                alert("No file selected");
                return;
            }
            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const ipfsUrl = await uploadRequest.json();
            return ipfsUrl;

        } catch (e) {
            console.log(e);
            alert("Trouble uploading file");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e);
        setFile(e.target?.files?.[0]);
    };
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Prévisualisation

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;

        if (selectedFile) {
            const preview = URL.createObjectURL(selectedFile);
            setPreviewUrl(preview);
        } else {
            setPreviewUrl(null);
        }
    };


    // États locaux pour gérer l'édition
    const [isEditing, setIsEditing] = useState<{ userName: boolean; email: boolean; bio: boolean, profileImage: boolean }>({
        userName: false,
        email: false,
        bio: false,
        profileImage: false
    });

    const [formData, setFormData] = useState<{ userName: string; email: string; bio: string, profileImage: string }>({
        userName: '',
        email: '',
        bio: '',
        profileImage: ''
    });

    if (!address) return <p>Veuillez connecter votre portefeuille pour accéder à votre profil.</p>;
    if (isLoading) return <p>Chargement des données utilisateur...</p>;
    if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

    // Extraction des données utilisateur
    const { email, userName, bio } = data?.userRegistereds?.[0] || {};

    const handleEdit = (field: 'userName' | 'email' | 'bio' | 'profileImage') => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
        setFormData({ userName: userName || '', email: email || '', bio: bio || '', profileImage: '' });
    };

    const handleSave = (field: string) => {
        if (field === 'userName') {
            setUserName(formData.userName);
        } else if (field === 'email') {
            setEmail(formData.email);
        } else if (field === 'bio') {
            setBio(formData.bio);
        }
        else if (field === 'profileImage') {
            setImageProfile();
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
                    <div className="p-6 flex flex-row space-y-6">
                        <div className="flex flex-col gap-6">
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
                            {/* Créateur */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Êtes-vous un créateur ?</label>
                                <p className="mt-1 text-gray-900">
                                    Si vous êtes un créateur, vous pouvez apparaître dans la liste des créateurs.
                                </p>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={data?.userRegistereds?.[0]?.isCreator || false} // Synchronisation avec l'état
                                        onCheckedChange={(checked) => {
                                            setIsCreator(checked); // Appelle updateIsCreator
                                        }}
                                    />
                                    <span className="text-gray-700">
                                        {data?.userRegistereds?.[0]?.isCreator ? "Vous êtes un créateur" : "Vous n'êtes pas un créateur"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg font-bold text-gray-800">Photo de profil</h2>
                                <div className="space-x-4 flex flex-row items-center">
                                    <div className="w-100 h-100 m-r-4">
                                        {isEditing.profileImage ? (
                                            <div className="space-x-4 flex flex-row items-center">
                                                {previewUrl ?
                                                    <Image src={previewUrl} alt="Prévisualisation" className="object-cover rounded-full" width="100" height="100" />
                                                    : data?.userRegistereds?.[0]?.profileImage ? (
                                                        <Image src={data?.userRegistereds?.[0]?.profileImage} alt="Photo de profil" className="object-cover rounded-full" width="100" height="100" />
                                                    ) : (
                                                        <User className="object-cover" width="100" height="100" />
                                                    )
                                                }
                                                <Input type="file" accept="image/*" onChange={handleChange} className='mt-0' />
                                            </div>
                                        ) : (
                                            <div>
                                                {data?.userRegistereds?.[0]?.profileImage ? (
                                                    <Image src={data?.userRegistereds?.[0]?.profileImage} alt="Photo de profil" className="object-cover rounded-full" width="100" height="100" />
                                                ) : (
                                                    <User className="object-cover" width="100" height="100" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => (isEditing.profileImage ? handleSave('profileImage') : handleEdit('profileImage'))}>
                                        {isEditing.profileImage ? <Save className="w-5 h-5 text-green-500" /> : <Pencil className="w-5 h-5 text-gray-500" />}
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
