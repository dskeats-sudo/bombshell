export interface Product {
    id: string;
    name: string;
    inspiration: string;
    image: string;
    scentProfile: string[];
    category: "Men" | "Women" | "Unisex";
}

export const PRODUCTS: Product[] = [
    {
        id: "her-number",
        name: "Her Number",
        inspiration: "Lady Million",
        image: "/products/product_1.png",
        scentProfile: ["Floral", "Honey", "Nectar"],
        category: "Women",
    },
    {
        id: "meadow-flower",
        name: "Meadow Flower",
        inspiration: "Marc Jacobs Daisy",
        image: "/products/product_2.png",
        scentProfile: ["Fresh", "Violet", "Wild Strawberry"],
        category: "Women",
    },
    {
        id: "timeless-rose",
        name: "Timeless Rose",
        inspiration: "Louis Vuitton Les Sables Roses",
        image: "/products/product_3.png",
        scentProfile: ["Rose", "Oud", "Saffron"],
        category: "Unisex",
    },
    {
        id: "eternal-petal",
        name: "Eternal Petal",
        inspiration: "Chanel No.5",
        image: "/products/product_4.png",
        scentProfile: ["Aldehydic", "Floral", "Powdery"],
        category: "Women",
    },
    {
        id: "green-canopy",
        name: "Green Canopy",
        inspiration: "Jo Malone Cypress & Grapevine",
        image: "/products/product_5.png",
        scentProfile: ["Woody", "Fougere", "Aromatic"],
        category: "Unisex",
    },
    {
        id: "rouge-elixir",
        name: "Rouge Elixir",
        inspiration: "Baccarat Rouge",
        image: "/products/product_6.png",
        scentProfile: ["Saffron", "Amberwood", "Cedar"],
        category: "Unisex",
    },
    {
        id: "moss-n-mist",
        name: "Moss N Mist",
        inspiration: "Green Irish Tweed",
        image: "/products/product_7.png",
        scentProfile: ["Green", "Citrus", "Sandalwood"],
        category: "Men",
    },
    {
        id: "smoke-silk",
        name: "Smoke Silk",
        inspiration: "Tom Ford Oud Wood",
        image: "/products/product_8.png",
        scentProfile: ["Smoky", "Oud", "Rare Wood"],
        category: "Unisex",
    },
    {
        id: "roadtripper",
        name: "Roadtripper",
        inspiration: "Dior Sauvage",
        image: "/products/product_9.png",
        scentProfile: ["Fresh", "Spicy", "Ambroxan"],
        category: "Men",
    },
    {
        id: "dune-eclipse",
        name: "Dune Eclipse",
        inspiration: "Louis Vuitton Ombre Nomade",
        image: "/products/product_10.png",
        scentProfile: ["Oud", "Incense", "Raspberry"],
        category: "Unisex",
    },
    {
        id: "intense",
        name: "Intense",
        inspiration: "Chanel Bleu",
        image: "/products/product_11.png",
        scentProfile: ["Aromatic", "Woody", "Citrus"],
        category: "Men",
    },
    {
        id: "ingot",
        name: "Ingot",
        inspiration: "One Million Men",
        image: "/products/product_12.png",
        scentProfile: ["Leather", "Spicy", "Cinnamon"],
        category: "Men",
    },
    {
        id: "extreme",
        name: "Extreme",
        inspiration: "Gucci Guilty",
        image: "/products/product_13.png",
        scentProfile: ["Lavender", "Patchouli", "Lemon"],
        category: "Men",
    },
    {
        id: "velvet-thorne",
        name: "Velvet Thorne",
        inspiration: "Tom Ford Rose Prick",
        image: "/products/product_14.png",
        scentProfile: ["Spicy Rose", "Turmeric", "Pepper"],
        category: "Unisex",
    },
];

export const PRICING = {
    standard: 30, // 50ml
    tester: 15,
    bundle: 40,
};
