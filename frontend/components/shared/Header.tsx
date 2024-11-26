import React from 'react'
import { Search } from 'lucide-react';

const Header = () => {
    return (
        <header className="border-b border-gray-300">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl">Logo</div>
                    <div className="relative mt-4">
                        {/* Icone de recherche */}
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-10 py-2 border rounded-md ml-1"
                        />
                    </div>
                    <nav>
                        <div className="flex items-center space-x-10">
                            <ul className="flex space-x-4 text-lg">
                                <li>Home</li>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                            <input type='button' value='Login' className='bg-blue-500 text-white px-4 py-2 rounded-md' />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header