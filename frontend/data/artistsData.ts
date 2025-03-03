// data/artistsData.ts

export interface Artist {
    name: string;
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
    description: string;
}

// Données des artistes
export const artistsData: Artist[] = [
    {
        name: 'Léonard de Vinci',
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
        description: "La Joconde, ou Mona Lisa, est un portrait de Lisa Gherardini, épouse de Francesco del Giocondo, réalisé par Léonard de Vinci entre 1503 et 1506. C'est l'une des œuvres les plus célèbres et les plus étudiées de l'histoire de l'art.",
    },
    {
        title: "La Nuit étoilée",
        artist: "Vincent van Gogh",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
        price: "82 000 000",
        description: "La Nuit étoilée est une peinture de Vincent van Gogh réalisée en 1889. Elle représente le ciel nocturne au-dessus de Saint-Rémy-de-Provence, où l'artiste était interné à l'époque.",
    },
    {
        title: "Guernica",
        artist: "Pablo Picasso",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Mural_del_Gernika.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/800px-Pablo_picasso_1.jpg",
        price: "200 000 000",
        description: "Guernica est une peinture de Pablo Picasso réalisée en 1937 en réaction au bombardement de la ville basque de Guernica par l'aviation allemande pendant la guerre civile espagnole.",
    },
    {
        title: "Les Demoiselles d'Avignon",
        artist: "Pablo Picasso",
        image: "https://uploads2.wikiart.org/00492/images/pablo-picasso/les-demoiselles-d-avignon-1907.jpg!Large.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/800px-Pablo_picasso_1.jpg",
        price: "180 000 000",
        description: "Les Demoiselles d'Avignon est une peinture de Pablo Picasso réalisée en 1907. Elle marque le début du cubisme et est l'une des œuvres les plus importantes de l'art moderne.",
    },
    {
        title: "Impression, soleil levant",
        artist: "Claude Monet",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1920px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg",
        price: "120 000 000",
        description: "Impression, soleil levant est une peinture de Claude Monet réalisée en 1872. Elle est à l'origine du terme 'impressionnisme' et est l'une des œuvres les plus célèbres du mouvement.",
    },
    {
        title: "Les Nymphéas",
        artist: "Claude Monet",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Claude_Monet_038.jpg/1920px-Claude_Monet_038.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/800px-Claude_Monet_1899_Nadar_crop.jpg",
        price: "105 000 000",
        description: "Les Nymphéas est une série de peintures de Claude Monet réalisée entre 1899 et 1926. Elle représente les jardins de sa maison de Giverny et est l'une des œuvres les plus emblématiques de l'artiste.",
    },
    {
        title: "Les Deux Fridas",
        artist: "Frida Kahlo",
        image: "https://www.museumtv.art/wp-content/uploads/2021/04/les-deux-fridas-portrait.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/260px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
        price: "55 000 000",
        description: "Les Deux Fridas est une peinture de Frida Kahlo réalisée en 1939. Elle représente deux versions de l'artiste, l'une vêtue de blanc et l'autre de rouge, symbolisant son identité mexicaine et européenne.",
    },
    {
        title: "La Persistance de la mémoire",
        artist: "Salvador Dalí",
        image: "https://misterprepa.net/wp-content/uploads/2023/07/Salvador-Dali-persistance-de-la-memoire-1931-1536x1167.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/800px-Salvador_Dal%C3%AD_1939.jpg",
        price: "120 000 000",
        description: "La Persistance de la mémoire est une peinture de Salvador Dalí réalisée en 1931. Elle représente des montres molles et un paysage désertique, symbolisant la relativité du temps et de la réalité.",
    },
    // 2. Red Canna - Georgia O'Keeffe
    {
        title: "Red Canna",
        artist: "Georgia O'Keeffe",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Georgia_O%27Keeffe_Red_Canna_1919_HMA.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Georgia_O%27Keeffe_MET_DP230868.jpg/220px-Georgia_O%27Keeffe_MET_DP230868.jpg",
        price: "80 000 000",
        description: "Red Canna est une peinture de Georgia O'Keeffe réalisée en 1919. Elle représente une fleur de canna rouge, symbole de la nature et de la féminité dans l'œuvre de l'artiste.",
    },
    // 3. La Danse - Henri Matisse
    {
        title: "La Danse",
        artist: "Henri Matisse",
        image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Matissedance.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Portrait_of_Henri_Matisse_1933_May_20.jpg/260px-Portrait_of_Henri_Matisse_1933_May_20.jpg",
        price: "120 000 000",
        description: "La Danse est une peinture d'Henri Matisse réalisée en 1909. Elle représente cinq figures en mouvement, symbolisant la joie et la liberté de la danse.",
    },
    // 4. Campbell's Soup Cans - Andy Warhol
    {
        title: "Campbell's Soup Cans",
        artist: "Andy Warhol",
        image: "https://www.moma.org/media/W1siZiIsIjMxODI0MiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=f1e923ce509ba9e6",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg/220px-Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg",
        price: "150 000 000",
        description: "Campbell's Soup Cans est une série de peintures d'Andy Warhol réalisée en 1962. Elle représente des boîtes de soupe Campbell, symbole de la culture de consommation de masse.",
    },
    // 5. David - Michelangelo
    {
        title: "David",
        artist: "Michelangelo",
        image: "https://i.f1g.fr/media/cms/orig/2023/03/28/54561cefa113a5c5312bab88d343f65bc218e84773188d7a2c5b8c1725697c25.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg/260px-Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg",
        price: "300 000 000",
        description: "David est une sculpture de Michelangelo réalisée entre 1501 et 1504. Elle représente le héros biblique David, symbole de la force et de la liberté de la République de Florence.",
    },
    // 6. La Ronde de Nuit - Rembrandt van Rijn
    {
        title: "La Ronde de Nuit",
        artist: "Rembrandt van Rijn",
        image: "https://www.connaissancedesarts.com/wp-content/thumbnails/uploads/2021/06/copie-de-cda19_article_actu-rembrandt-ronde-de-nuit-rijksmuseum-reconstitution-tt-width-1200-height-900-fill-0-crop-1-bgcolor-ffffff.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/260px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
        price: "140 000 000",
        description: "La Ronde de Nuit est une peinture de Rembrandt van Rijn réalisée en 1642. Elle représente une compagnie de miliciens d'Amsterdam en mouvement, symbolisant la puissance et la solidarité de la ville.",
    },
    // 7. La Classe de danse - Edgar Degas
    {
        title: "La Classe de danse",
        artist: "Edgar Degas",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Edgar_Degas_-_La_Classe_de_danse.jpg/1200px-Edgar_Degas_-_La_Classe_de_danse.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/2/24/Edgar_Degas_%281834-1917%29.jpg",
        price: "85 000 000",
        description: "La Classe de danse est une peinture d'Edgar Degas réalisée en 1873. Elle représente des danseuses en répétition, capturant l'élégance et la grâce du mouvement.",
    },
    // 8. Le Baiser - Gustav Klimt
    {
        title: "Le Baiser",
        artist: "Gustav Klimt",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1200px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Klimt.jpg/260px-Klimt.jpg",
        price: "190 000 000",
        description: "Le Baiser est une peinture de Gustav Klimt réalisée en 1907-1908. Elle représente un couple enlacé, symbolisant l'amour et l'intimité dans l'art nouveau.",
    },
];
