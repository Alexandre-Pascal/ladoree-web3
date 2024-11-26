'use client';
import React, { useState } from 'react';

const page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Envoi des données ou traitement du formulaire ici
        alert('Formulaire soumis');
    };

    return (
        <div className="max-w-screen-lg mx-auto py-12">
            {/* Titre */}
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Contactez-nous</h1>

            {/* Formulaire de page */}
            <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
                <h2 className="text-2xl font-medium text-gray-900 mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Nom */}
                        <div>
                            <label htmlFor="name" className="block text-gray-600 mb-2">Nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Votre nom"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Votre email"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-gray-600 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Votre message"
                                rows={6}
                                required
                            />
                        </div>

                        {/* Bouton d'envoi */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>

            {/* Informations de page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Localisation */}
                <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-medium text-gray-900 mb-6">Notre adresse</h2>
                    <p className="text-gray-600">42 Esplanade Octave Médale, Saint-Sulpice-la-Pointe, France</p>
                    <iframe
                        className="mt-6 w-full h-64 rounded-md"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5762.563509583875!2d1.6834978766737754!3d43.77421254459493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ae82a6035c2519%3A0x6237aed8c6a68ace!2s42%20Esp.%20Octave%20Medale%2C%2081370%20Saint-Sulpice-la-Pointe%2C%20France!5e0!3m2!1sen!2sus!4v1732650596856!5m2!1sen!2sus"
                        title="Localisation"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>

                {/* Réseaux Sociaux */}
                <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-medium text-gray-900 mb-6">Suivez-nous</h2>
                    <div className="space-y-4">
                        <a
                            href="https://www.instagram.com/boutique.ladoree/"
                            target="_blank"
                            className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                                alt="Instagram"
                                className="w-6 h-6"
                            />
                            Instagram
                        </a>
                        <a
                            href="https://www.facebook.com/p/Boutique-Lador%C3%A9e-100086719748274/?locale=fr_FR"
                            target="_blank"
                            className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                alt="Facebook"
                                className="w-6 h-6"
                            />
                            Facebook
                        </a>
                        <a
                            href="https://www.twitter.com/"
                            target="_blank"
                            className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/langfr-1024px-X_logo_2023.svg.png"
                                alt="Twitter"
                                className="w-6 h-6"
                            />
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
