'use client';

import { useAccount, useWriteContract, useDisconnect } from "wagmi";
import { userManagerAddress, userManagerAbi } from "../../utils/abis";
import { user } from "../../utils/types";
import { Switch } from "@/components/ui/switch";
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { User } from 'lucide-react';
const RegisterForm = () => {
    const { address } = useAccount();
    const { writeContract, error, isSuccess: registerIsSuccess } = useWriteContract();

    const [user, setUser] = useState<user | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

    let toastId: string = '';

    const registerUser = async () => {
        toastId = toast.loading('Inscription en cours...');
        const url = await uploadFileAndReturnIpfsURL();

        if (!user?.userName || user.userName.trim() === '') {
            setErrorMessage("Vous devez obligatoirement renseigner ce champ");
            toast.dismiss(toastId);
            return;
        }
        setErrorMessage(null);

        // Appelle le contrat avec les informations utilisateur
        writeContract({
            address: userManagerAddress,
            abi: userManagerAbi,
            functionName: "registerUser",
            args: [
                address,
                user.userName,
                user.email || '',
                user.bio || '',
                user.isCreator || false,
                url, // Hash IPFS de l'image
            ],
        });
    };

    const { disconnect } = useDisconnect();

    const forceDisconnect = () => {
        disconnect();
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


    useEffect(() => {
        if (registerIsSuccess) {
            setTimeout(() => {
                toast.success('Inscription réussie', { id: toastId });
            }, 1500);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        if (error) {
            toast.error('Erreur lors de l\'inscription', { id: toastId });
        }
    }, [registerIsSuccess]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-4">Inscription</h2>
                <p className="text-gray-600 text-center mb-6">
                    Vous devez renseigner au moins votre nom complet ou pseudonyme pour vous inscrire.
                    Les autres informations pourront être renseignées ultérieurement.
                </p>
                <form className="space-y-4">
                    <div className="space-x-4 flex flex-row items-center">
                        <div className="rounded-full w-50 h-50 border m-r-4">

                            {previewUrl ?
                                <Image src={previewUrl} alt="Prévisualisation" className="object-cover rounded-full" width="60" height="60" />
                                : <User className="object-cover" width="50" height="50" />
                            }
                        </div>
                        <Input type="file" accept="image/*" onChange={handleChange} className='mt-0' />
                    </div>

                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                            Nom Complet / Pseudonyme (Obligatoire)
                        </label>
                        <input
                            type="text"
                            id="userName"
                            placeholder='Nom Complet / Pseudonyme'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onChange={(e) =>
                                setUser({ ...user, userName: e.target.value, email: user?.email || '', bio: user?.bio || '', isCreator: user?.isCreator || false })
                            }
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder='you@example.com'
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value, userName: user?.userName || '', bio: user?.bio || '', isCreator: user?.isCreator || false })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Décris-toi
                        </label>
                        <textarea
                            id="bio"
                            rows={4}
                            placeholder='Décris-toi en quelques mots...'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onChange={(e) =>
                                setUser({ ...user, bio: e.target.value, email: user?.email || '', userName: user?.userName || '', isCreator: user?.isCreator || false })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="isCreator" className="block text-sm font-medium text-gray-700">
                            Êtes-vous un créateur ?
                        </label>
                        <Switch onCheckedChange={(checked) => {
                            setUser({
                                ...user,
                                isCreator: checked,
                                email: user?.email || '',
                                userName: user?.userName || '',
                                bio: user?.bio || '',
                            });
                        }}
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            type="button"
                            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onClick={registerUser}
                        >
                            S'inscrire
                        </button>
                        <button
                            type="button"
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={forceDisconnect}
                        >
                            Se déconnecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
