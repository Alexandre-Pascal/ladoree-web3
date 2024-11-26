import React from 'react'
import { Search } from 'lucide-react';
import Image from 'next/image';

import logo from '../../icons/logo.png';

const Header = () => {
    return (
        <header className="border-b border-gray-800">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <Image src={logo} alt="logo" width={100} height={100} />
                    <div className="relative">
                        {/* Icone de recherche */}
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-10 py-2 border rounded-md ml-1"
                        />
                    </div>
                    <nav>
                        <div className="flex items-center justify-center  space-x-10">
                            <ul className="flex space-x-4">
                                <li><a href="/">HOME</a></li>
                                <li><a href="/Explore">EXPLORE</a></li>
                                <li><a href="/About">ABOUT</a></li>
                                <li><a href="/Contact">CONTACT</a></li>
                            </ul>
                            <input type='button' value='Login' className='bg-black text-white px-4 py-2 rounded-md' />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header