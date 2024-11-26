'use client';

import React from 'react'
import { Search } from 'lucide-react';
import Image from 'next/image';

import logo from '../../icons/ldr cut4.png';

const Header = () => {
    return (
        <header className="border-b border-gray-800">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <Image
                        src={logo}
                        alt="logo"
                        width={300}
                        height={100}
                        className='cursor-pointer shadow-sm-md rounded-md'
                        onClick={() => window.location.href = '/'}
                    />
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
                                <li><a href="/">ACCUEIL</a></li>
                                <li><a href="/Explore">DECOUVRIR</a></li>
                                <li><a href="/About">A PROPOS</a></li>
                                <li><a href="/Contact">CONTACT</a></li>
                            </ul>
                            <input type='button' value='Connexion' className='bg-black text-white px-4 py-2 rounded-md' />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header