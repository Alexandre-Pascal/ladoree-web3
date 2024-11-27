'use client';

import React from 'react'
import { Search } from 'lucide-react';
import Image from 'next/image';

import Link from 'next/link';

import logo from '../../icons/ldrcut3.png';

const Header = () => {
    return (
        <header className="border-b border-gray-800">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            className='cursor-pointer shadow-sm-md rounded-md h-auto w-auto h-12 w-12'
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
                            <input type='button' value='Connexion' className='bg-black text-white px-4 py-2 rounded-md' />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header