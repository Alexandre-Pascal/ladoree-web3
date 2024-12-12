'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { marketplaceAbi, marketplaceAddress } from '@/utils/abis';

const UploadForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [price, setPrice] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{ imageUrl: string; metadataUrl: string } | null>(null);

    const { address } = useAccount();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        if (!file) {
            alert("Please select a file!");
            setIsLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);

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
            alert("An error occurred during the upload process.");
        } finally {
            setIsLoading(false);
        }
    };

    const { writeContract, error, isSuccess, isPending } = useWriteContract();
    const listItem = async (data: { imageUrl: string; metadataUrl: string } | null) => {
        console.log({ data });
        if (!data) return;
        writeContract({
            address: marketplaceAddress,
            abi: marketplaceAbi,
            functionName: "listItem",
            args: [data.metadataUrl, price, address, 500]
        })
    }

    useEffect(() => {
        console.log({ result, error, isSuccess });
    }, [result, error, isSuccess]);

    return (
        <div>
            <h1>Upload Creation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="file">Image:</label>
                    <input type="file" id="file" onChange={handleFileChange} required />
                </div>
                <div>
                    <label htmlFor="price">Price (ETH):</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Uploading..." : "Submit"}
                </button>
            </form>

            {result && (
                <div>
                    <h2>Upload Successful</h2>
                    <p>
                        Image URL:{" "}
                        <a href={result.imageUrl} target="_blank" rel="noopener noreferrer">
                            {result.imageUrl}
                        </a>
                    </p>
                    <p>
                        Metadata URL:{" "}
                        <a href={result.metadataUrl} target="_blank" rel="noopener noreferrer">
                            {result.metadataUrl}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
