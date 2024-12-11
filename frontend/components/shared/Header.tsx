'use client';

import React, { useEffect, useState } from 'react';
import { Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../icons/ldrcut3.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract, useDisconnect } from "wagmi";
import { userManagerAddress, userManagerAbi } from "../../utils/abis";
import { user } from "../../utils/types";
import { Switch } from "@/components/ui/switch"
import { toast } from 'react-hot-toast';

const Header = () => {
    const { isConnected, address } = useAccount();

    const { data: isRegistered } = useReadContract({
        address: userManagerAddress,
        abi: userManagerAbi,
        functionName: "isUserRegistered",
        args: [address],
    });

    const { writeContract, error, isSuccess: registerIsSuccess } = useWriteContract();

    const [user, setUser] = useState<user | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let toastId: string = '';

    const registerUser = async () => {
        toastId = toast.loading('Inscription en cours...');

        if (!user?.userName || user.userName.trim() === '') {
            setErrorMessage("Vous devez obligatoirement renseigner ce champ");
            return;
        }
        setErrorMessage(null); // Efface le message d'erreur si tout est OK

        writeContract({
            address: userManagerAddress,
            abi: userManagerAbi,
            functionName: "registerUser",
            args: [address, user.userName, user.email || '', user.bio || '', user.isCreator || false],
        });
    };

    const { disconnect } = useDisconnect(); // Hook pour gérer la déconnexion

    const forceDisconnect = () => {
        disconnect(); // Déconnexion immédiate
    };

    useEffect(() => {
        console.log("registerIsSuccess", registerIsSuccess);
        if (registerIsSuccess) {
            setTimeout(() => toast.success('Inscription réussie', { id: toastId }), 3000)
            setTimeout(() => {
                window.location.reload(); // Recharge la page pour mettre à jour l'état de connexion
            }, 5000);
        }
        if (error) {
            setTimeout(() => toast.error('Erreur lors de l\'inscription', { id: toastId }), 3000)
        }
    }, [registerIsSuccess]);

    useEffect(() => {
        console.log("user", user);
    }, [user]);

    return (
        <header className="border-b border-gray-800">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            className="cursor-pointer shadow-sm-md rounded-md w-auto h-12"
                        />
                    </Link>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full px-10 py-2 border rounded-md ml-1"
                        />
                    </div>
                    <nav>
                        <div className="flex items-center justify-center space-x-10">
                            <ul className="flex space-x-6 text-sm">
                                <li><Link href="/">ACCUEIL</Link></li>
                                <li><Link href="/artworks-list">OEUVRES</Link></li>
                                <li><Link href="/creators-list">CRÉATEURS</Link></li>
                                <li><Link href="/about">A PROPOS</Link></li>
                                <li><Link href="/contact">CONTACT</Link></li>
                            </ul>
                            <ConnectButton />
                            {isConnected && (
                                <div className="relative">
                                    <Link href={'/profile'}>
                                        <User
                                            width={36}
                                            height={36}
                                            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer border border-gray-300 rounded-xl hover:bg-gray-50 p-1"
                                        />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
            {isConnected && !isRegistered && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                        <h2 className="text-2xl font-bold text-center mb-4">Inscription</h2>
                        <p className="text-gray-600 text-center mb-6">
                            Vous devez renseigner au moins votre nom complet ou pseudonyme pour vous inscrire.
                            Les autres informations pourront être renseignées ultérieurement.
                        </p>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                    Nom Complet / Pseudonyme (Obligatoire)
                                </label>
                                <input
                                    type="text"
                                    id="userName"
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
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    onChange={(e) =>
                                        setUser({ ...user, email: e.target.value, userName: user?.userName || '', bio: user?.bio || '', isCreator: user?.isCreator || false })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                    Biographie
                                </label>
                                <textarea
                                    id="bio"
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    onChange={(e) =>
                                        setUser({ ...user, bio: e.target.value, email: user?.email || '', userName: user?.userName || '', isCreator: user?.isCreator || false })
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
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
                                    onClick={() => {
                                        forceDisconnect();
                                        window.location.reload();
                                    }}
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
