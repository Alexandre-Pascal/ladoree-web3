'use client';

import React, { useEffect, useState } from 'react';
import { Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../icons/ldrcut3.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from "wagmi";
import RegisterForm from '@/components/shared/RegisterForm';
import { userManagerAddress, userManagerAbi } from "../../utils/abis";

const Header = () => {
    const { isConnected, address } = useAccount();

    const { data: isRegistered } = useReadContract({
        address: userManagerAddress,
        abi: userManagerAbi,
        functionName: "isUserRegistered",
        args: [address],
    });


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
                <RegisterForm />
            )}
        </header>
    );
};

export default Header;
