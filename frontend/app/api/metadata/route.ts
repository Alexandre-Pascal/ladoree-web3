import { NextResponse } from "next/server";
import { GRAPHQL_URL, queries } from '@/utils/graphQL';
import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';

async function fetchMetadata(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch metadata");
        return await response.json();
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
}

interface NFTMinted {
    tokenURI: string;
}

interface GraphQLResponse {
    nftminteds: NFTMinted[];
}

const BASE_URL = "https://indigo-hidden-meerkat-77.mypinata.cloud/ipfs";

export async function GET() {
    try {
        // Fetch tokenURIs from The Graph
        const data: GraphQLResponse = await request(GRAPHQL_URL, queries.GET_METADATAS);

        if (!data || !data.nftminteds) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        // Extract CIDs from tokenURIs
        const CIDs = data.nftminteds.map((item: { tokenURI: string }) => item.tokenURI.split("/").pop() || "");

        // Fetch metadata for each CID
        const metadataPromises = CIDs.map(async (cid) => {
            const url = `${BASE_URL}/${cid}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch metadata for CID: ${cid}`);
            const metadata = await response.json();

            // Convert image path to HTTP URL
            if (metadata.image) {
                const imageCID = metadata.image.split("ipfs://")[1]; // Remove "ipfs://"
                metadata.image = `${BASE_URL}/${imageCID}`;
            }

            return metadata;
        });

        const metadataList = await Promise.all(metadataPromises);

        return NextResponse.json(metadataList, { status: 200 });
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
    }
}
