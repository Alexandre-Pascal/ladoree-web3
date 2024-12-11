import React from 'react';
import Image from 'next/image';
import user from "@/icons/user.png";
import { Creator } from '@/utils/types';

export default function CreatorCard({ creator }: { creator: Creator }) {
    const { email, userName, bio } = creator;
    console.log(email, userName, bio, "zzezez");

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => window.location.href = `/creators-list/${encodeURIComponent(userName)}`}
        >
            <div className="relative h-48">
                <Image
                    src={user}
                    alt={userName}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                />
            </div>
            <div className="p-6">
                <div className="flex items-center">
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{userName}</h3>
                        <p className="text-gray-500">Œuvres vendues : </p>
                        <p className="text-gray-500">Œuvres en vente :</p>
                        <p className="text-gray-500">Valeur totale : </p>
                    </div>
                </div>
            </div>
        </div>
    )
}