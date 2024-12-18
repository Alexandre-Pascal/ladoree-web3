'use client';

import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ldrTokenAddress, ldrTokenAbi } from "@/utils/abis";


const TokenCollector: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { address, isConnected } = useAccount();
    const { writeContract } = useWriteContract();

    const mintTokens = async () => {
        if (!isConnected || !address) return;

        setIsLoading(true);
        setSuccessMessage(null);

        try {
            writeContract({
                address: ldrTokenAddress,
                abi: ldrTokenAbi,
                functionName: "mint",
                args: [address, 10], // Mint 10 tokens
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
    );
};

export default TokenCollector;
