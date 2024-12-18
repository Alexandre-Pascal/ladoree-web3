'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { marketplaceAbi, marketplaceAddress } from '@/utils/abis';
import { Input, Button, Textarea, Select, Label } from "@/components/ui/index";
import toast, { Toaster } from "react-hot-toast";
import {
    SelectContent,
    SelectItem,
    SelectValue,
    SelectTrigger,
} from "@/components/ui/select"
import dayjs from "dayjs";


const UploadForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [price, setPrice] = useState<string>("");
    const [creationDate, setCreationDate] = useState<string>("");
    const [artType, setArtType] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{ imageUrl: string; metadataUrl: string } | null>(null);

    const { address } = useAccount();

    let toastId;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        toast.loading("Mise en vente en cours...", { id: toastId });
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        if (!file) {
            toast.error("Please select a file!", { id: toastId });
            setIsLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("creationDate", creationDate);
            formData.append("artType", artType);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload");
            }

            const data = await response.json();
            listItem(data);
            setResult(data);
        } catch (error) {
            console.error("Error uploading data:", error);
            toast.error("An error occurred during the upload process.", { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    const { writeContract, error, isSuccess: isSuccessListItem, isPending: isPendingListItem } = useWriteContract();
    const listItem = async (data: { imageUrl: string; metadataUrl: string } | null) => {
        if (!data) return;
        const timestamp = dayjs(creationDate).unix();
        try {
            writeContract({
                address: marketplaceAddress,
                abi: marketplaceAbi,
                functionName: "listItem",
                args: [name, description, artType, price, timestamp, data.imageUrl, data.metadataUrl, address, 500]
            });
        } catch (error) {
            console.error("Error listing item:", error);
            toast.error("Erreur lors de la mise en vente de l'oeuvre.", { id: toastId });
        }
    };

    useEffect(() => {
        if (error) {
            console.error("Error listing item:", error);
            toast.error("Une erreur s'est produite lors de la mise en vente de l'oeuvre.", { id: toastId });
        }
        if (isSuccessListItem) {
            toast.dismiss(toastId); // Supprime le toast en cours
            toast.success("Oeuve mise en vente avec succès!", { id: toastId });
        }
    }, [error, isSuccessListItem]);

    return (
        <div className="max-w-lg mx-auto my-12 p-6 bg-white shadow-md rounded-lg">
            <Toaster />
            <h1 className="text-2xl font-semibold mb-6 text-center">Mettre en vente une œuvre</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Nom:</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        placeholder="Entrez le nom de votre création"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description:</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder="Entrez une description de votre création"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="file">Image:</Label>
                    <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="price">Prix en euros:</Label>
                    <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                        placeholder="Entrer le prix de votre création"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="creationDate">Date de création:</Label>
                    <Input
                        id="creationDate"
                        type="date"
                        value={creationDate}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCreationDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="artType">Type d'art :</Label>
                    <Select
                        value={artType !== undefined ? artType : "Type"}
                        onValueChange={(value: string) => setArtType(value)}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="painting">Peinture</SelectItem>
                            <SelectItem value="drawing">Dessin</SelectItem>
                            <SelectItem value="sculpture">Sculpture</SelectItem>
                            <SelectItem value="photography">Photographie</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button type="submit" disabled={isLoading || isPendingListItem} className="w-full">
                        {isLoading || isPendingListItem ? "Mise en vente..." : "Mettre en vente"}
                    </Button>
                </div>
            </form>

            {result && isSuccessListItem && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <h2 className="text-lg font-semibold text-green-700">Mise en vente réussie!</h2>
                    <p>
                        <strong>Image URL:</strong>{" "}
                        <a href={`https://` + result.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            Voir l'image
                        </a>
                    </p>
                    <p>
                        <strong>Metadata URL:</strong>{" "}
                        <a href={`https://` + result.metadataUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            Accéder à la métadonnée
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
