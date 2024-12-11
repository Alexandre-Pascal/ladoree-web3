import React from 'react'


const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 border-t border-black">
            <div className="container mx-auto px-6 text-center">
                <div className="space-y-6">
                    <div className="text-3xl font-serif uppercase tracking-wide text-gray-800">
                        <span>LADOREE</span>
                    </div>

                    <div className="flex justify-center space-x-8">
                        <a href="/about" className="text-gray-600 hover:underline">A propos</a>
                        {/* <a href="#" className="text-gray-600 hover:underline">Expositions</a> */}
                        <a href="/creators-list" className="text-gray-600 hover:underline">Créateurs</a>
                        <a href="/contact" className="text-gray-600 hover:underline">Contact</a>
                    </div>

                    <div className="flex justify-center space-x-6 mt-6">
                        <a href="https://www.instagram.com/boutique.ladoree/" className="text-gray-600 hover:text-gray-500">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/p/Boutique-Lador%C3%A9e-100086719748274/?locale=fr_FR" className="text-gray-600 hover:text-gray-500">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-500">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        &copy; 2024 LADOREE. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer