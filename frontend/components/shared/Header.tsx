'use client';

import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

import logo from '../../icons/ldrcut3.png';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount, useReadContract, useWriteContract, useDisconnect } from "wagmi";

import { userManagerAddress, userManagerAbi } from "../../utils/abis";

import { User } from 'lucide-react';


import { user } from "../../utils/types";

const Header = () => {
    const { isConnected, address, status } = useAccount();

    const isRegistered = useReadContract({
        address: userManagerAddress,
        abi: userManagerAbi,
        functionName: "isUserRegistered",
        args: [address],
    });

    const { data, writeContract, error, isSuccess: registerIsSuccess, status: registerStatus } = useWriteContract();

    const [user, setUser] = useState<user | null>(null);


    const registerUser = async () => {
        writeContract({
            address: userManagerAddress,
            abi: userManagerAbi,
            functionName: "registerUser",
            args: [address, user?.email, user?.firstName, user?.lastName],
        });
    };

    const { disconnect } = useDisconnect(); // Hook pour gérer la déconnexion

    const forceDisconnect = () => {
        disconnect(); // Déconnexion immédiate
    };


    useEffect(() => {
        console.log('isRegistered', isRegistered)
        console.log('registerStatus', registerStatus)
        if (registerIsSuccess) {
            setTimeout(() => {
                window.location.reload(); // Recharge la page pour mettre à jour l'état de connexion
            }, 5000);
        }
    }, [registerIsSuccess, registerStatus])




    return (
        <header className="border-b border-gray-800" >
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            className='cursor-pointer shadow-sm-md rounded-md w-auto h-12'
                        // onClick={() => window.location.href = '/'}
                        />
                    </Link>
                    <div className="relative">
                        {/* Icone de recherche */}
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full px-10 py-2 border rounded-md ml-1"
                        />
                    </div>
                    <nav>
                        <div className="flex items-center justify-center  space-x-10">
                            <ul className="flex space-x-6 text-sm">
                                <li><Link href="/">ACCUEIL</Link></li>
                                <li><Link href="/artworks-list">OEUVRES</Link></li>
                                <li><Link href="/artists-list">ARTISTES</Link></li>
                                <li><Link href="/about">A PROPOS</Link></li>
                                <li><Link href="/contact">CONTACT</Link></li>
                            </ul>
                            {/* <input type='button' value='Connexion' className='bg-black text-white px-4 py-2 rounded-md' /> */}
                            <ConnectButton />

                            {isConnected && (
                                <div className="relative ">
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
            {
                isConnected && !isRegistered.data && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                            <h2 className="text-2xl font-bold text-center mb-4">Inscription</h2>
                            <p className="text-gray-600 text-center mb-6">
                                Veuillez vous inscrire pour accéder à toutes les fonctionnalités.
                            </p>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        onChange={(e) =>
                                            setUser({ ...user, email: e.target.value, firstName: user?.firstName || '', lastName: user?.lastName || '' })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        onChange={(e) =>
                                            setUser({ ...user, firstName: e.target.value, email: user?.email || '', lastName: user?.lastName || '' })
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        onChange={(e) =>
                                            setUser({ ...user, lastName: e.target.value, email: user?.email || '', firstName: user?.firstName || '' })
                                        }
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
                                            window.location.reload(); // Recharge la page, obligatoire car sinon bug avec raimbowkit
                                        }}
                                    >
                                        Se déconnecter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </header>
    )
}

export default Header