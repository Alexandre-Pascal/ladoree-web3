import React from 'react'


const Footer = () => {
    return (
        <footer className="bg-gray-100 text-white py-6 border-t border-black">
            <div className="container mx-auto px-6 text-center">
                <div className="space-y-6">
                    <div className="text-3xl font-serif uppercase tracking-wide text-gray-800">
                        <span>LADOREE</span>
                    </div>

                    <div className="flex justify-center space-x-8">
                        <a href="#" className="text-gray-600 hover:text-white">About</a>
                        <a href="#" className="text-gray-600 hover:text-white">Exhibitions</a>
                        <a href="#" className="text-gray-600 hover:text-white">Artists</a>
                        <a href="#" className="text-gray-600 hover:text-white">Contact</a>
                    </div>

                    <div className="flex justify-center space-x-6 mt-6">
                        <a href="#" className="text-gray-600 hover:text-white">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-white">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-white">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        &copy; 2024 LADOREE. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer