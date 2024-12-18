'use client';

import React, { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ldrTokenAddress, ldrTokenAbi } from "@/utils/abis";
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { request } from 'graphql-request';

interface LastMintedResponse {
    userHasMinteds: {
        blockTimestamp: string;
    }[];
}
const TokenCollector: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [lastMintedDate, setLastMintedDate] = useState<string | null>(null);
    const [isReadyToMintAgain, setIsReadyToMintAgain] = useState(false);

    const { address, isConnected } = useAccount();
    const { writeContract } = useWriteContract();

    const isMoreThanOneMonthOld = (dateToCheck: string): boolean => {
        // Convertir la date passée (timestamp en secondes) en millisecondes
        const givenDate = new Date(parseInt(dateToCheck) * 1000);

        // Obtenir la date actuelle moins 30 jours
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Soustraire 1 mois

        // Comparer les dates
        return givenDate < oneMonthAgo;
    };

    useEffect(() => {
        if (!address) return;
        const fetchLastMinted = async () => {
            const lastMintedTimestamp = await lastMinted();
            if (!lastMintedTimestamp?.userHasMinteds?.length) {
                setIsReadyToMintAgain(true);
                return;
            }
            const blockTimestamp = lastMintedTimestamp?.userHasMinteds?.[0]?.blockTimestamp;
            const isItReady = isMoreThanOneMonthOld(blockTimestamp);
            setIsReadyToMintAgain(isItReady);
        };
        fetchLastMinted();
    }, [address]);


    const lastMinted = async (): Promise<LastMintedResponse> => {
        const data = await request(GRAPHQL_URL, queries.GET_LAST_MINT_TIMESTAMP, { user: address });
        return data as LastMintedResponse;
    };

    const mintTokens = async () => {
        if (!isConnected || !address) return;

        setIsLoading(true);
        setSuccessMessage(null);

        try {
            writeContract({
                address: ldrTokenAddress,
                abi: ldrTokenAbi,
                functionName: "monthlyMint",
                args: [address], // Mint 10 tokens
            });

            setSuccessMessage("🎉 Tokens collectés avec succès !");
        } catch (error) {
            console.error("Erreur pendant le mint :", error);
            setSuccessMessage("❌ Erreur lors de la collecte des tokens.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isReadyToMintAgain && (
                <div className="relative flex items-center justify-center w-full py-6">
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-800">
                                🎁 Collectez vos Tokens LDR
                            </h3>
                            <span className="text-sm text-gray-500">Mensuel</span>
                        </div>

                        {successMessage && (
                            <div
                                className={`mt-3 p-2 rounded-md text-sm ${successMessage.includes("🎉")
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {successMessage}
                            </div>
                        )}

                        <div className="mt-4">
                            {isConnected ? (
                                <button
                                    onClick={mintTokens}
                                    className={`w-full py-2 px-4 rounded-lg text-white font-medium text-lg transition-all ${isLoading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Collecte en cours..." : "Collecter 10 LDR"}
                                </button>
                            ) : (
                                <p className="text-center text-sm text-gray-500">
                                    🚨 Connectez votre wallet pour continuer.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TokenCollector;
