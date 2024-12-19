import { request } from 'graphql-request';
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { ethers } from 'ethers';
import { authenticityNftAbi, authenticityNftAddress } from '@/utils/abis';

interface GraphqlResponse {
    nftminteds: {
        tokenId: number;
    }[];
}

export default async function getAllNFTFromOwner(owner: string) {
    // Récupérer le dernier token minté
    const lastTokenIDQuery: GraphqlResponse = await request(
        GRAPHQL_URL,
        queries.GET_LAST_TOKEN_ID
    );
    const lastTokenID = lastTokenIDQuery.nftminteds[0]?.tokenId || 0;

    console.log('lastTokenID:', lastTokenID);

    // Initialiser une instance d'Ethers.js avec un provider
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const contract = new ethers.Contract(authenticityNftAddress, authenticityNftAbi, provider);

    // Tableau pour stocker les propriétaires
    const OwnersTokenId: number[] = [];

    // Parcourir tous les tokenId jusqu'au dernier
    for (let tokenId = 1; tokenId <= lastTokenID; tokenId++) {
        try {
            // Appeler la méthode ownerOf pour chaque tokenId
            const ownerOf = await contract.ownerOf(tokenId);

            // Ajouter au tableau si l'owner correspond
            if (ownerOf.toLowerCase() === owner.toLowerCase()) {
                OwnersTokenId.push(tokenId);
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'owner pour le token ${tokenId}:`, error);
        }
    }

    return OwnersTokenId;
}
