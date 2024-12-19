// Fonction de traduction des types d'art
export default function translateArtType(artType: string): string {
    const translations: { [key: string]: string } = {
        painting: "peinture",
        photography: "photographie",
        sculpture: "sculpture",
        drawing: "dessin",
    };

    return translations[artType.toLowerCase()] || artType; // Retourne le type original si pas de traduction
};