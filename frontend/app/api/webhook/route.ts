import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { ethers } from 'ethers';
import { marketplaceAbi, marketplaceAddress } from '@/utils/abis';

const stripe = new Stripe(process.env.STRIPE_API_SECRET!);

// Configuration d'Ethers.js
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL!);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contractAddress = marketplaceAddress!;
const contractABI = marketplaceAbi;
const marketplaceContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Simule une "base de données" en mémoire pour stocker temporairement les informations
const orderCache: Record<string, any> = {};

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

    // Traite uniquement les événements `checkout.session.completed`
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Vérifie que les métadonnées Stripe contiennent les informations nécessaires
        if (!session.metadata) {
            return new Response("Metadata manquante dans la session Stripe", { status: 400 });
        }

        // Crée les informations de la commande
        const orderDetails = {
            id: session.id,
            amount_total: session.amount_total! / 100, // Montant en euros
            currency: session.currency!,
            customer_name: session.customer_details?.name || 'Client',
            customer_email: session.customer_details?.email || 'unknown@example.com',
            item: {
                name: session.metadata?.name || 'Article inconnu',
                description: session.metadata?.description || 'Pas de description disponible',
                imageURI: session.metadata?.imageURI || '',
                itemId: session.metadata?.itemId || '0',
                buyer: session.metadata?.buyer || '0x0000000000000000000000000000000000000000',
            },
        };

        // Stocke la commande dans le cache temporaire
        orderCache[session.id] = orderDetails;

        console.log("Commande enregistrée :", orderDetails);

        // Envoie l'email de confirmation
        try {
            await sendOrderConfirmationEmail(orderDetails);
        } catch (err) {
            console.error("Erreur lors de l'envoi de l'email :", err);
            return new Response("Erreur lors de l'envoi de l'email", { status: 500 });
        }

        // Appelle la fonction `itemBuyed` sur le contrat
        try {
            console.log("Appel à itemBuyed sur la blockchain...");
            const tx = await marketplaceContract.itemBuyed(orderDetails.item.itemId, orderDetails.item.buyer);
            console.log("Transaction envoyée :", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction confirmée :", receipt.transactionHash);
        } catch (err) {
            console.error("Erreur lors de l'appel à itemBuyed :", err);
            return new Response("Erreur blockchain", { status: 500 });
        }
    }

    return new Response('Webhook reçu avec succès', { status: 200 });
}

// Fonction pour envoyer un email avec Nodemailer
async function sendOrderConfirmationEmail(orderDetails: any): Promise<void> {
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

export async function GET(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId || !orderCache[sessionId]) {
        return new Response("Commande introuvable", { status: 404 });
    }

    return new Response(JSON.stringify(orderCache[sessionId]), { status: 200 });
}
