import React, { useEffect, useState } from "react";
import ArtCard from "./ArtCard";

interface Metadata {
    name: string;
    description: string;
    image: string;
    price: string;
}

const Marketplace: React.FC = () => {
    const [metadataList, setMetadataList] = useState<Metadata[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/metadata");
                if (!response.ok) {
                    throw new Error("Failed to fetch metadata");
                }

                const data: Metadata[] = await response.json();
                setMetadataList(data);
            } catch (err: any) {
                console.error("Error fetching metadata:", err);
                setError(err.message || "Unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    if (isLoading) return <p>Loading metadata...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {/* {metadataList.length > 0 ? (
                metadataList.map((metadata, index) => (
                    <ArtCard
                        key={index}
                        metadata={metadata}
                    />
                ))
            ) : (
                <p>No metadata available</p>
            )} */}
        </>
    );
};

export default Marketplace;
