export default async function fetchNFTMetadata(nfts) {
    // Tableau pour stocker les métadonnées récupérées
    const metadataArray = [];

    for (const nft of nfts) {
        const tokenId = nft.tokenId;
        const tokenURI = nft.tokenURI;

        try {
            // Ajouter le préfixe "https://" si nécessaire
            const completeURI = tokenURI.startsWith("http") ? tokenURI : `https://${tokenURI}`;

            // Récupérer les métadonnées avec fetch
            const response = await fetch(completeURI);
            if (!response.ok) {
                console.error(`Erreur lors du fetch de l'URI : ${completeURI}`);
                continue;
            }

            const metadata = await response.json();

            // Ajouter le tokenId et les métadonnées dans le tableau
            metadataArray.push({
                tokenId,
                ...metadata,
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération des métadonnées pour l'URI : ${tokenURI}`, error);
        }
    }

    return metadataArray;
}