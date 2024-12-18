import { BrowserProvider, ethers } from 'ethers';
import { ldrTokenAbi } from './abis';

export const verifyDiscount = async (discountAmount: number, userAddress: string) => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();


    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LDR_TOKEN_ADDRESS || '',
        ldrTokenAbi,
        signer
    );

    // Récupère les réductions de l'utilisateur
    const userDiscounts = await contract.getUserDiscounts(userAddress);

    // Vérifie si une réduction du montant demandé existe et n'est pas utilisée
    const validDiscount = userDiscounts.find(
        (discount: any) => discount.amount.toNumber() === discountAmount && !discount.isUsed
    );

    return !!validDiscount; // Retourne true si la réduction est valide
};
