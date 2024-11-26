// data/artistsData.ts

export interface Artist {
    name: string;
    image: string;
    artworksSold: number;
    artworksForSale: number;
    totalValue: number;
    profileImage: string;
    biography: string;
    notableWorks: string[];
    era: string;
}

export interface Artwork {
    title: string;
    artist: string;
    image: string;
    artistImage: string;
    price: string;
}

// Données des artistes
export const artistsData: Artist[] = [
    {
        name: 'Léonard de Vinci',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg",
        artworksSold: 5,
        artworksForSale: 2,
        totalValue: 78000000,
        profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/800px-Francesco_Melzi_-_Portrait_of_Leonardo.png',
        biography: "Léonard de Vinci (1452-1519) était un génie de la Renaissance italienne. Artiste, inventeur, ingénieur et scientifique, il est célèbre pour des œuvres emblématiques comme la Mona Lisa et La Cène.",
        notableWorks: ["La Mona Lisa", "La Cène", "L'Homme de Vitruve"],
        era: "Renaissance",
    },
    {
        name: 'Vincent van Gogh',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        artworksSold: 8,
        artworksForSale: 3,
        totalValue: 172000000,
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
        biography: "Vincent van Gogh (1853-1890) est un peintre néerlandais post-impressionniste dont les œuvres ont eu une influence majeure sur l'art du 20ème siècle. Il est notamment célèbre pour ses autoportraits et sa série de tournesols.",
        notableWorks: ["La Nuit étoilée", "Les Tournesols", "Autoportrait"],
        era: "Post-impressionnisme",
    },
    {
        name: 'Pablo Picasso',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mural_del_Gernika.jpg/260px-Mural_del_Gernika.jpg",
        artworksSold: 12,
        artworksForSale: 4,
        totalValue: 500000000,
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/800px-Pablo_picasso_1.jpg",
        biography: "Pablo Picasso (1881-1973) est un peintre, sculpteur et créateur espagnol, pionnier du mouvement cubiste et l'un des artistes les plus influents du 20ème siècle.",
        notableWorks: ["Guernica", "Les Demoiselles d'Avignon", "La Vie"],
        era: "Cubisme",
    },
    {
        name: 'Claude Monet',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/260px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
        artworksSold: 7,
        artworksForSale: 3,
        totalValue: 110000000,
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg",
        biography: "Claude Monet (1840-1926) est un peintre français, fondateur du mouvement impressionniste. Ses œuvres reflètent l'atmosphère de la nature et de la lumière.",
        notableWorks: ["Impression, soleil levant", "Les Nymphéas", "La Gare Saint-Lazare"],
        era: "Impressionnisme",
    },
    {
        name: 'Frida Kahlo',
        image: "https://www.museumtv.art/wp-content/uploads/2021/04/les-deux-fridas-portrait.jpg",
        artworksSold: 4,
        artworksForSale: 1,
        totalValue: 30000000,
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/260px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
        biography: "Frida Kahlo (1907-1954) était une artiste mexicaine qui a fusionné le réalisme, le surréalisme et le folklore mexicain dans ses œuvres célèbres.",
        notableWorks: ["Les Deux Fridas", "Le Suicide de Dorothy Hale", "Autoportrait avec collier d'épines"],
        era: "Surréalisme",
    },
    {
        name: 'Salvador Dalí',
        image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
        artworksSold: 3,
        artworksForSale: 1,
        totalValue: 60000000,
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/800px-Salvador_Dal%C3%AD_1939.jpg",
        biography: "Salvador Dalí (1904-1989) était un artiste surréaliste espagnol, célèbre pour ses œuvres extravagantes et son utilisation de l'illusion et des rêves.",
        notableWorks: ["La Persistance de la mémoire", "Le Rêve", "La Tentation de Saint Antoine"],
        era: "Surréalisme",
    },
    {
        name: "Georgia O'Keeffe",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Red_Canna_%281924%29_by_Georgia_O%27Keeffe.jpg/270px-Red_Canna_%281924%29_by_Georgia_O%27Keeffe.jpg",
        artworksSold: 4,
        artworksForSale: 1,
        totalValue: 75000000,
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Georgia_O%27Keeffe_MET_DP230868.jpg/220px-Georgia_O%27Keeffe_MET_DP230868.jpg",
        biography: "Georgia O'Keeffe (1887-1986) est une peintre américaine, célèbre pour ses représentations abstraites de fleurs et de paysages du sud-ouest des États-Unis.",
        notableWorks: ["Red Canna", "Sky Above Clouds", "Cow's Skull with Calico Roses"],
        era: "Modernisme",
    },
    {
        name: 'Henri Matisse',
        image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Matissedance.jpg",
        artworksSold: 10,
        artworksForSale: 4,
        totalValue: 150000000,
        profileImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Portrait_of_Henri_Matisse_1933_May_20.jpg/260px-Portrait_of_Henri_Matisse_1933_May_20.jpg",
        biography: "Henri Matisse (1869-1954) était un peintre, sculpteur et dessinateur français. Il est un des fondateurs du fauvisme et est reconnu pour ses couleurs vives et ses formes simplifiées.",
        notableWorks: ["La Danse", "La Musique", "Le Luxe II"],
        era: "Fauvisme",
    }
];

// Données des œuvres d'art
export const artworksData: Artwork[] = [
    {
        title: "La Joconde",
        artist: "Léonard de Vinci",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_natural_color.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/800px-Francesco_Melzi_-_Portrait_of_Leonardo.png",
        price: "78 000 000",
    },
    {
        title: "La Nuit étoilée",
        artist: "Vincent van Gogh",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
        price: "82 000 000",
    },
    {
        title: "Guernica",
        artist: "Pablo Picasso",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mural_del_Gernika.jpg/260px-Mural_del_Gernika.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/800px-Pablo_picasso_1.jpg",
        price: "200 000 000",
    },
    {
        title: "Les Demoiselles d'Avignon",
        artist: "Pablo Picasso",
        image: "https://uploads2.wikiart.org/00492/images/pablo-picasso/les-demoiselles-d-avignon-1907.jpg!Large.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/800px-Pablo_picasso_1.jpg",
        price: "180 000 000",
    },
    {
        title: "Impression, soleil levant",
        artist: "Claude Monet",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/260px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg",
        price: "120 000 000",
    },
    {
        title: "Les Nymphéas",
        artist: "Claude Monet",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Claude_Monet_038.jpg/260px-Claude_Monet_038.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg",
        price: "105 000 000",
    },
    {
        title: "Les Deux Fridas",
        artist: "Frida Kahlo",
        image: "https://www.museumtv.art/wp-content/uploads/2021/04/les-deux-fridas-portrait.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/260px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
        price: "55 000 000",
    },
    {
        title: "La Persistance de la mémoire",
        artist: "Salvador Dalí",
        image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/800px-Salvador_Dal%C3%AD_1939.jpg",
        price: "120 000 000",
    },
    // 2. Red Canna - Georgia O'Keeffe
    {
        title: "Red Canna",
        artist: "Georgia O'Keeffe",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Red_Canna_%281924%29_by_Georgia_O%27Keeffe.jpg/270px-Red_Canna_%281924%29_by_Georgia_O%27Keeffe.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Georgia_O%27Keeffe_MET_DP230868.jpg/220px-Georgia_O%27Keeffe_MET_DP230868.jpg",
        price: "80 000 000",
    },
    // 3. La Danse - Henri Matisse
    {
        title: "La Danse",
        artist: "Henri Matisse",
        image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Matissedance.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Portrait_of_Henri_Matisse_1933_May_20.jpg/260px-Portrait_of_Henri_Matisse_1933_May_20.jpg",
        price: "120 000 000",
    },
    // 4. Campbell's Soup Cans - Andy Warhol
    {
        title: "Campbell's Soup Cans",
        artist: "Andy Warhol",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Campbells_Soup_Cans_MOMA.jpg/270px-Campbells_Soup_Cans_MOMA.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg/220px-Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg",
        price: "150 000 000",
    },
    // 5. David - Michelangelo
    {
        title: "David",
        artist: "Michelangelo",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/%27David%27_by_Michelangelo_Fir_JBU004.jpg/260px-%27David%27_by_Michelangelo_Fir_JBU004.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg/260px-Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg",
        price: "300 000 000",
    },
    // 6. La Ronde de Nuit - Rembrandt van Rijn
    {
        title: "La Ronde de Nuit",
        artist: "Rembrandt van Rijn",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Netherlands-4167_-_The_Night_Watch_%2811715123333%29.jpg/390px-Netherlands-4167_-_The_Night_Watch_%2811715123333%29.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/260px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
        price: "140 000 000",
    },
    // 7. La Classe de danse - Edgar Degas
    {
        title: "La Classe de danse",
        artist: "Edgar Degas",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Edgar_Degas_-_La_Classe_de_danse.jpg/260px-Edgar_Degas_-_La_Classe_de_danse.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/2/24/Edgar_Degas_%281834-1917%29.jpg",
        price: "85 000 000",
    },
    // 8. Le Baiser - Gustav Klimt
    {
        title: "Le Baiser",
        artist: "Gustav Klimt",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/260px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/8/87/The_Kiss_%28Gustav_Klimt%29.jpg",
        price: "190 000 000",
    },
];
