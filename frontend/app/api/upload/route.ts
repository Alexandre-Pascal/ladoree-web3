import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const name = data.get("name") as string;
        const description = data.get("description") as string;
        const price = data.get("price") as string;
        const creationDate = data.get("creationDate") as string;
        const artType = data.get("artType") as string;

        // Upload file to Pinata
        const uploadData = await pinata.upload.file(file);
        const imageUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${uploadData.IpfsHash}`;

        // Create metadata
        const metadata = {
            name,
            description,
            firstPrice: price,
            image: imageUrl,
            creationDate,
            artType,
        };

        const metadataUploadData = await pinata.upload.json(metadata);
        const metadataUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${metadataUploadData.IpfsHash}`;

        return NextResponse.json(
            { imageUrl, metadataUrl },
            { status: 200 }
        );
    } catch (e) {
        console.error("Upload failed:", e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
