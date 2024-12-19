'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { Pencil, Save } from 'lucide-react';
import { userManagerAbi, userManagerAddress, ldrTokenAbi, ldrTokenAddress } from '@/utils/abis';
import { toast } from 'react-hot-toast';
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { User } from 'lucide-react';
import Image from 'next/image';
import BuyDiscountModal from '@/components/shared/BuyDiscountModal';
import filterUnusedBuyerDiscounts from '@/utils/FilterUnusedDiscounts';
import fetchNFTMetadata from '@/utils/fetchNFTMetadata';
import translateArtType from '@/utils/translateArtType';
import { Button } from '@/components/ui';
import getAllNFTFromOwner from '@/utils/getAllNFTFromOwner';
import ClipLoader from 'react-spinners/ClipLoader';

interface Item {
    name: string;
    description: string;
    imageURI: string;
    price: string;
    kind: string;
    creationDate: string;
    seller: string;
    creator: string;
    tokenId: string;
    itemId: string;
}

interface NFTRequest {
    nftminteds: {
        tokenId: string;
        tokenURI: string;
    }[];
}

interface NFT {
    tokenId: string;
    tokenURI: string;
}

interface NFTMetadata {
    tokenId: string;
    tokenURI: string;
    name: string;
    description: string;
    firstPrice: string;
    image: string;
    creationDate: string;
    artType: string;
}

interface Discount {
    discountId: number;
    amount: number;
    from: string;
}
type GraphQLResponseBuyer = {
    buyerDiscountBoughts: Discount[];
    discountUseds: { discountId: number; from: string }[];
};
type GraphQLResponseSeller = {
    sellerDiscountBoughts: Discount[];
    discountUseds: { discountId: number; from: string }[];
};
export default function UserProfile() {
    const { address } = useAccount(); // Récupère l'adresse utilisateur connectée

    const { data: tokenBalance, isLoading: isBalanceLoading, error: balanceError } = useReadContract({
        address: ldrTokenAddress,
        abi: ldrTokenAbi,
        functionName: 'balanceOf',
        args: [address],
    });


    type UserProfileData = {
        userRegistereds: {
            userName: string;
            email: string;
            bio: string;
            isCreator: boolean;
            profileImage: string;
        }[];
    };


    const [NFTs, setNFTs] = useState<NFT[] | null>(null);
    const [NFTMetadatas, setNFTMetadatas] = useState<NFTMetadata[]>([]);

    useEffect(() => {
        if (!address) return;
        //récupère les nft de l'utilisateur
        const fetchNFTs = async () => {
            if (!address) return;
            setLoadingNFT(true);
            try {
                const tokenIds: number[] = await getAllNFTFromOwner(address);
                const NFTs: NFT[] = [];
                for (let tokenId of tokenIds) {
                    const data: NFTRequest = await request(GRAPHQL_URL, queries.GET_NFT_BY_TOKEN_ID, { tokenId: tokenId });
                    NFTs.push({ tokenId: data.nftminteds[0].tokenId, tokenURI: data.nftminteds[0].tokenURI });
                }
                setNFTs(NFTs);
            } catch (error) {
                console.error("Erreur lors de la récupération des NFTs :", error);
            }
        };
        fetchNFTs();
    }, [address]);


    useEffect(() => {
        const fetchMetadata = async () => {
            if (!NFTs) return;
            console.log("NFTs", NFTs);

            //récupère les métadonnées des nft
            const NFTMetadatas = await fetchNFTMetadata(NFTs);
            setNFTMetadatas(NFTMetadatas);
            setLoadingNFT(false);
        };
        fetchMetadata();
    }, [NFTs]);

    const { data, isLoading, error, isSuccess: isSuccessQuery } = useQuery<UserProfileData>({
        queryKey: ['userProfile', address], // Clé unique pour l'utilisateur
        queryFn: () => {
            return request(GRAPHQL_URL, queries.GET_USER_PROFILE, { user: address });
        },
        enabled: !!address, // Exécute la requête uniquement si une adresse est disponible
    });

    const [unusedBuyerDiscounts, setUnusedBuyerDiscounts] = useState<Discount[]>([]);
    const [unusedSellerDiscounts, setUnusedSellerDiscounts] = useState<Discount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingNFT, setLoadingNFT] = useState<boolean>(true);

    useEffect(() => {
        if (!address) return;
        const fetchDiscounts = async () => {
            try {
                setLoading(true);

                // Appel de la requête GraphQL pour récupérer les réductions achetées et utilisées
                const data: GraphQLResponseBuyer = await request(GRAPHQL_URL, queries.GET_ALL_BUYER_DISCOUNTS, { userAddress: address });

                // Filtrer les réductions non utilisées avec la fonction utilitaire
                const availableDiscounts: Discount[] = filterUnusedBuyerDiscounts(
                    data.buyerDiscountBoughts,
                    data.discountUseds
                );

                console.log("availableDiscountsBuyer", availableDiscounts);
                setUnusedBuyerDiscounts(availableDiscounts);
            } catch (error) {
                console.error("Erreur lors de la récupération des réductions :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscounts();
    }, [address]);

    useEffect(() => {
        const fetchDiscounts = async () => {
            if (!address) return;
            try {
                setLoading(true);

                // Appel de la requête GraphQL pour récupérer les réductions achetées et utilisées
                const data: GraphQLResponseSeller = await request(GRAPHQL_URL, queries.GET_ALL_SELLER_DISCOUNTS, { userAddress: address });

                // Filtrer les réductions non utilisées avec la fonction utilitaire
                const availableDiscounts: Discount[] = filterUnusedBuyerDiscounts(
                    data.sellerDiscountBoughts,
                    data.discountUseds
                );

                console.log("availableDiscountsSeller", availableDiscounts);
                setUnusedSellerDiscounts(availableDiscounts);
            } catch (error) {
                console.error("Erreur lors de la récupération des réductions :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscounts();
    }, [address]);


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
        <div className='flex flex-row gap-8 justify-center'>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto py-12">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                        <div className='flex flex-row space-between border-b'>
                            <div className="p-12 content-center">
                                <h1 className="text-2xl font-bold text-gray-800">Profil Utilisateur</h1>
                                <p className="text-gray-500">Gérez vos informations personnelles</p>
                            </div>
                            <div className="flex flex-col gap-2 p-4 ml-6">
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
                        <div className="p-12 flex flex-row space-y-6">

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
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto py-12">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                        <div className='flex flex-row justify-between border-b'>
                            <div className="p-12 content-center">
                                <h1 className="text-2xl font-bold text-gray-800">Tableau de bord LDR</h1>
                                <p className="text-gray-500">Gérez vos Tokens LDR</p>
                                <div className="mt-6">
                                    <BuyDiscountModal />
                                </div>
                            </div>
                            <div className="flex flex-col items-center bg-white border border-gray-200 shadow-md rounded-lg p-4 w-1/2 m-6 h-1/2">
                                {/* Titre */}
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">💰 Solde de vos Tokens LDR</h3>

                                {/* Valeur des Tokens */}
                                <div className="text-3xl font-bold text-gray-800 mb-2">
                                    {Number(tokenBalance || 0)} LDR
                                </div>

                                {/* Barre de Progression */}
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full transition-all"
                                        style={{
                                            width: `${Math.min((Number(tokenBalance || 0) / 200) * 100, 100)}%`,
                                        }}
                                    ></div>
                                </div>

                                {/* Indicateurs Min/Max */}
                                <div className="flex justify-between w-full text-xs text-gray-500 mt-2">
                                    <span>0</span>
                                    <span>200</span>
                                </div>
                            </div>
                        </div>
                        {/* Section Réductions */}
                        <div className="p-12">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">🎟️ Vos Réductions Disponibles</h2>

                            {loading ? (
                                <p className="text-gray-500">Chargement des réductions...</p>
                            ) : unusedBuyerDiscounts.length > 0 || unusedSellerDiscounts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Réductions Acheteurs */}
                                    {unusedBuyerDiscounts.map((discount) => (
                                        <div
                                            key={`buyer-${discount.discountId}`}
                                            className="flex flex-col items-center bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm"
                                        >
                                            <p className="text-gray-700 text-lg font-medium">Réduction Acheteur</p>
                                            <p className="text-3xl font-bold text-green-600 my-2">
                                                {discount.amount == 50 ? '5%' : '10%'}
                                            </p>
                                            <p className="text-sm text-gray-500">Valable pour un achat</p>
                                        </div>
                                    ))}

                                    {/* Réductions Vendeurs */}
                                    {unusedSellerDiscounts.map((discount) => (
                                        <div
                                            key={`seller-${discount.discountId}`}
                                            className="flex flex-col items-center bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm"
                                        >
                                            <p className="text-gray-700 text-lg font-medium">Réduction Vendeur</p>
                                            <p className="text-3xl font-bold text-red-600 my-2">
                                                {discount.amount == 50 ? '5%' : '10%'}
                                            </p>
                                            <p className="text-sm text-gray-500">Valable pour une vente</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Vous n'avez aucune réduction disponible.</p>
                            )}
                        </div>

                        {/* Section NFTs */}
                        <div className="p-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                🖼️ Vos Oeuvres possédées
                            </h2>
                            {loadingNFT ? (
                                <ClipLoader
                                    color="#3498db"
                                    loading={loadingNFT}
                                    size={50} // Taille du spinner
                                />
                            ) : (
                                <>
                                    {NFTMetadatas.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {NFTMetadatas.map((nft, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col items-center bg-white border rounded-lg p-4 shadow-lg transition transform hover:scale-105"
                                                >
                                                    {/* Image */}
                                                    <img
                                                        src={`https://${nft.image}`}
                                                        alt={nft.name}
                                                        className="w-full h-40 object-cover rounded-md mb-4"
                                                        onError={(e) => {
                                                            // Fallback image in case of error
                                                            (e.target as HTMLImageElement).src =
                                                                "https://via.placeholder.com/150";
                                                        }}
                                                    />
                                                    {/* Name */}
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                        {nft.name}
                                                    </h3>
                                                    {/* Description */}
                                                    {/* <p className="text-sm text-gray-600 mb-2 text-center line-clamp-3">
                                                        {nft.description}
                                                    </p> */}
                                                    {/* Additional Metadata */}
                                                    <p className="text-xs text-gray-500">
                                                        Type d'art: <span className="font-medium">{translateArtType(nft.artType)}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Créée le :{" "}
                                                        <span className="font-medium">{nft.creationDate}</span>
                                                    </p>
                                                    {/* Token ID */}
                                                    <span className="mt-4 inline-block text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                                                        Token ID: {nft.tokenId}
                                                    </span>
                                                    {/* Revendre Button */}
                                                    <div className="mt-4 w-full">
                                                        <Button
                                                            onClick={() => window.location.href = `/artworks-list/upload?tokenURI=${encodeURIComponent(nft.tokenURI)}`}
                                                            className="w-full"
                                                        >
                                                            Revendre
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 text-center">Vous n'avez pas encore de NFTs.</p>
                                    )
                                    }</>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
