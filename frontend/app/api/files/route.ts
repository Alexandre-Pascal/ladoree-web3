import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config"

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const uploadData = await pinata.upload.file(file)
        console.log(file, "file");
        console.log(uploadData, "uploadData");
        // const url = await pinata.gateways.convert(uploadData.IpfsHash)
        const url = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/${uploadData.IpfsHash}`;
        console.log(url, "url");
        return NextResponse.json(url, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
