import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import type { OrderDetails } from '@/utils/types';
import path from 'path';
import fs from 'fs';
import { ethers } from 'ethers';
import { marketplaceAbi, marketplaceAddress } from '@/utils/abis';

const stripe = new Stripe(process.env.STRIPE_API_SECRET! || '');

// Configuration d'Ethers.js
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL!); // URL RPC (Infura, Alchemy, etc.)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider); // Ton wallet pour signer les transactions
const contractAddress = marketplaceAddress!; // Adresse du contrat Marketplace
const contractABI = marketplaceAbi; // ABI du contrat Marketplace
const marketplaceContract = new ethers.Contract(contractAddress, contractABI, wallet);


export async function POST(req: Request): Promise<Response> {
    const sig = req.headers.get('stripe-signature')!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook Error:", (err as Error).message);
        return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Récupère les informations de la commande depuis metadata
        const orderDetails = {
            id: session.id,
            amount_total: session.amount_total! / 100, // Converti en euros
            currency: session.currency!,
            customer_name: session.customer_details?.name || 'Client',
            customer_email: session.customer_details?.email || 'unknown@example.com',
            item: {
                name: session.metadata?.name || 'Article inconnu',
                description: session.metadata?.description || 'Pas de description disponible',
                imageURI: session.metadata?.imageURI || '',
                itemId: session.metadata?.itemId || '0',
                buyer: session.metadata?.buyer || '0x',
            },
        };

        // Stocker les informations dans un fichier temporaire (remplaçable par une base de données)
        const filePath = path.resolve(process.cwd(), 'order.json');
        fs.writeFileSync(filePath, JSON.stringify(orderDetails, null, 2));

        // Envoie un email de confirmation
        await sendOrderConfirmationEmail(orderDetails);

        console.log("Commande enregistrée :", orderDetails);

        // Appel à la fonction `itemBuyed` du contrat
        try {
            console.log("Appel à itemBuyed sur la blockchain...");
            const tx = await marketplaceContract.itemBuyed(orderDetails.item.itemId, orderDetails.item.buyer);
            console.log("Transaction envoyée :", tx.hash);

            // Optionnel : Attendre la confirmation de la transaction
            const receipt = await tx.wait();
            console.log("Transaction confirmée :", receipt.transactionHash);
        } catch (err) {
            console.error("Erreur lors de l'appel à itemBuyed :", err);
            return new Response(`Erreur blockchain : ${(err as Error).message}`, { status: 500 });
        }
    }

    return new Response('Webhook reçu avec succès', { status: 200 });
}


// Fonction pour envoyer un email avec Nodemailer
async function sendOrderConfirmationEmail(orderDetails: OrderDetails): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER!,
        to: orderDetails.customer_email,
        subject: 'Votre récapitulatif de commande - Merci pour votre achat !',
        html: `
            <h1>Merci pour votre commande, ${orderDetails.customer_name} !</h1>
            <p>Voici le récapitulatif de votre commande :</p>
            <ul>
                <li><strong>Article :</strong> ${orderDetails.item.name}</li>
                <li><strong>Description :</strong> ${orderDetails.item.description}</li>
                <li><strong>Montant total :</strong> ${orderDetails.amount_total.toFixed(2)} ${orderDetails.currency.toUpperCase()}</li>
            </ul>
            <p><img src="${orderDetails.item.imageURI}" alt="Article" style="width:200px;"/></p>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email envoyé à :", orderDetails.customer_email);
}
