export default async function fetchNFTMetadata(nftsOrTokenURI) {
    // Tableau pour stocker les métadonnées récupérées
    const metadataArray = [];
    const urisToFetch = Array.isArray(nftsOrTokenURI)
        ? nftsOrTokenURI.map((nft) => ({
            tokenId: nft.tokenId,
            tokenURI: nft.tokenURI
        }))
        : [
            {
                tokenId: null,
                tokenURI: nftsOrTokenURI,
            },
        ];

    for (const { tokenId, tokenURI } of urisToFetch) {
        try {
            // Récupérer les métadonnées avec fetch
            console.log(`Fetching metadata for tokenURI: ${tokenURI}`);
            const response = await fetch(`https://` + tokenURI);
            if (!response.ok) {
                console.error(`Erreur lors du fetch de l'URI : ${tokenURI}`);
                continue;
            }

            const metadata = await response.json();

            // Ajouter le tokenId (s'il existe) et les métadonnées dans le tableau
            metadataArray.push({
                tokenId,
                tokenURI,
                ...metadata,
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération des métadonnées pour l'URI : ${tokenURI}`, error);
        }
    }

    // Si un seul tokenURI a été passé, retourner directement l'objet au lieu d'un tableau
    if (!Array.isArray(nftsOrTokenURI)) {
        return metadataArray[0] || null;
    }

    return metadataArray;
}
