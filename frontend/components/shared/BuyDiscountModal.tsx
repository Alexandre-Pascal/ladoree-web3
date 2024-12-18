"use client";

import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ldrTokenAbi, ldrTokenAddress } from "@/utils/abis";
import { toast } from "react-hot-toast";
import { ShoppingCart, BarChart2 } from "lucide-react";

export default function BuyDiscountModal() {
    const { address } = useAccount();

    const { writeContract: buyBuyersDiscount, isPending: isBuyingBuyers } = useWriteContract();
    const { writeContract: buySellersDiscount, isPending: isBuyingSellers } = useWriteContract();

    const [open, setOpen] = useState(false);

    const handleBuy = (type: "buyers" | "sellers", amount: number) => {
        const functionName = type === "buyers" ? "buyBuyersDiscount" : "buySellersDiscount";

        const writeDiscount = type === "buyers" ? buyBuyersDiscount : buySellersDiscount;

        writeDiscount({
            address: ldrTokenAddress,
            abi: ldrTokenAbi,
            functionName,
            args: [amount],
        });

        toast.success(`Réduction de ${amount === 50 ? "5%" : "10%"} achetée avec succès !`);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">
                    🎟️ Acheter des réductions
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl rounded-lg p-8 bg-gray-50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Utilisez vos Tokens LDR
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Réductions Acheteurs */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                        <div className="flex items-center justify-center mb-4">
                            <ShoppingCart className="text-green-500 h-8 w-8" />
                            <h3 className="ml-2 text-lg font-semibold text-gray-700">Réductions Acheteurs</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <span className="text-gray-700">5% - 50 LDR</span>
                                <Button
                                    onClick={() => handleBuy("buyers", 50)}
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    disabled={isBuyingBuyers}
                                >
                                    {isBuyingBuyers ? "En cours..." : "Acheter"}
                                </Button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <span className="text-gray-700">10% - 100 LDR</span>
                                <Button
                                    onClick={() => handleBuy("buyers", 100)}
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    disabled={isBuyingBuyers}
                                >
                                    {isBuyingBuyers ? "En cours..." : "Acheter"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Réductions Vendeurs */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                        <div className="flex items-center justify-center mb-4">
                            <BarChart2 className="text-red-500 h-8 w-8" />
                            <h3 className="ml-2 text-lg font-semibold text-gray-700">Réductions Vendeurs</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <span className="text-gray-700">5% - 50 LDR</span>
                                <Button
                                    onClick={() => handleBuy("sellers", 50)}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                    disabled={isBuyingSellers}
                                >
                                    {isBuyingSellers ? "En cours..." : "Acheter"}
                                </Button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <span className="text-gray-700">10% - 100 LDR</span>
                                <Button
                                    onClick={() => handleBuy("sellers", 100)}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                    disabled={isBuyingSellers}
                                >
                                    {isBuyingSellers ? "En cours..." : "Acheter"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
