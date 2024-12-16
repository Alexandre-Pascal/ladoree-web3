export type user = {
    userName: string;
    email: string;
    bio: string;
    isCreator: boolean;
};

export type Creator = {
    email: string;
    userName: string;
    bio: string;
    profileImage: string;
}
export type CreatorData = {
    userRegistereds: {
        email: string;
        userName: string;
        bio: string;
        profileImage: string;
        user: user;
    }[];
};


export interface OrderItem {
    name: string;
    description: string;
    imageURI: string;
    itemId: string;
    buyer: string;
}

export interface OrderDetails {
    id: string;
    amount_total: number; // Montant total en euros
    currency: string; // Devise (par ex. "eur")
    customer_name: string; // Nom du client
    customer_email: string; // Email du client
    item: OrderItem; // Article acheté
}
