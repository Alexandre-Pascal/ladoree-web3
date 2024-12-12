import { NextResponse } from "next/server";

const BASE_URL = "https://indigo-hidden-meerkat-77.mypinata.cloud/ipfs";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const cid = url.pathname.split("/").pop(); // Récupère le CID depuis l'URL

    if (!cid) {
        return NextResponse.json({ error: "CID not provided" }, { status: 400 });
    }

    try {
        const imageUrl = `${BASE_URL}/${cid}`;
        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error) {
        console.error("Error fetching image URL:", error);
        return NextResponse.json({ error: "Failed to fetch image URL" }, { status: 500 });
    }
}
