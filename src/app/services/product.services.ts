import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  id: number;
  description: string;
  rating: number;
  image: string;
  review?: number;
}

export type ProductDictionary = {
  [key: string]: Product;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: ProductDictionary = {
    phone: {
      name: 'phone',
      price: 699,
      stock: 50,
      brand: 'Samsung',
      category: 'gadget',
      id: 1,
      description:
        'The Samsung phone blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.5,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760528841/s-l1600_1_u3udif.webp',
      review: 102,
    },
    tablet: {
      name: 'tablet',
      price: 799,
      stock: 23,
      brand: 'Apple',
      category: 'gadget',
      id: 2,
      description:
        'The Apple tablet blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.1,
      image:"https://res.cloudinary.com/dw6xlwksx/image/upload/v1760529337/photo-1623126908029-58cb08a2b272_ne0ddc.jpg",
      review: 102,
    },
    laptop: {
      name: 'laptop',
      price: 1299,
      stock: 75,
      brand: 'Dell',
      category: 'gadget',
      id: 3,
      description:
        'The Dell laptop blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.3,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760529855/ScV86zVws5qDnowbP7KsWA_alq71p.jpg',
      review: 102,
    },
    monitor: {
      name: 'monitor',
      price: 199,
      stock: 18,
      brand: 'LG',
      category: 'gadget',
      id: 4,
      description:
        'The LG monitor blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.3,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760529295/10_Top_32_inch_monitors_in_trend_1751360715077_1751360724136_g6rsld.avif',
      review: 102,
    },
    headphones: {
      name: 'headphones',
      price: 99,
      stock: 25,
      brand: 'Sony',
      category: 'gadget',
      id: 5,
      description:
        'The Sony headphones blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.6,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760529853/Sony-WH-1000XM4-Noise-Canceling-Headphones-w-Mic-and-Alexa-Voice-Control-Blue_c8cd3999-f5d3-4591-9d76-2e22be8c574d.d754ed68dfa65874d28a95f2d360eb69_w9qpco.avif',
      review: 102,
    },
    smartwatch: {
      name: 'smartwatch',
      price: 299,
      stock: 34,
      brand: 'Samsung',
      category: 'gadget',
      id: 6,
      description:
        'The Samsung smartwatch blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.6,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760529853/samsungwatchultra-2_woh6gl.jpg',
      review: 102,
    },
    router: {
      name: 'router',
      price: 149,
      stock: 12,
      brand: 'TP-Link',
      category: 'gadget',
      id: 7,
      description:
        'The TP-Link router blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.7,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760529852/1_jrdkgs.jpg',
      review: 102,
    },
    camera: {
      name: 'camera',
      price: 499,
      stock: 8,
      brand: 'Canon',
      category: 'gadget',
      id: 8,
      description:
        'The Canon camera blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.2,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760529852/f7837d96-46a9-4a93-b2ae-7aae9d4a34b7.ee7886a1edadebb5617039a832aef144_s2o710.webp',
      review: 102,
    },
    speaker: {
      name: 'speaker',
      price: 129,
      stock: 40,
      brand: 'JBL',
      category: 'gadget',
      id: 9,
      description:
        'The Jbl speaker blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.4,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760530614/jbl-charge-5-bluetooth-speaker-blue_qzpu2m.jpg',
      review: 102,
    },
    printer: {
      name: 'printer',
      price: 249,
      stock: 15,
      brand: 'HP',
      category: 'gadget',
      id: 10,
      description:
        'The HP printer blends cutting-edge technology with refined design to elevate daily use. With a powerful processor, a vivid display, and long-lasting battery life, it handles multitasking effortlessly. Advanced camera and connectivity features ensure you capture and share moments with ease. Ideal for users seeking performance and style in one premium device.',
      rating: 4.1,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760530609/hp-office-jet-pro-9025-e_2x_cfyedb.avif',
      review: 102,
    },
    fridge: {
      name: 'fridge',
      price: 899,
      stock: 10,
      brand: 'Hisense',
      category: 'appliance',
      id: 11,
      description:
        'Designed for reliability and efficiency, this Samsung fridge streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.2,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760530608/ff580f0d-d482-4501-8021-86617207789d.c5742c5c68d0721661bacc12748b31ab_dky8dd.jpg',
      review: 102,
    },
    microwave: {
      name: 'microwave',
      price: 199,
      stock: 20,
      brand: 'Panasonic',
      category: 'appliance',
      id: 12,
      description:
        'Designed for reliability and efficiency, this Panasonic microwave streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.4,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760530605/51S9_snZCsL._AC_SL1000_cwzsyt.webp',
      review: 102,
    },
    washingmachine: {
      name: 'washingMachine',
      price: 599,
      stock: 8,
      brand: 'LG',
      category: 'appliance',
      id: 13,
      description:
        'Designed for reliability and efficiency, this LG washingMachine streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.0,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760530602/dm-01_mrk99w.avif',
      review: 102,
    },
    airconditioner: {
      name: 'airConditioner',
      price: 799,
      stock: 6,
      brand: 'Haier',
      category: 'appliance',
      id: 14,
      description:
        'Designed for reliability and efficiency, this Haier airConditioner streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.1,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760530601/haier-thermocool-15hp-low-voltage-split-air-conditioner-12tesn-02-wht-c9ad-640x640_jumqwt.webp',
      review: 102,
    },
    blender: {
      name: 'blender',
      price: 49,
      stock: 40,
      brand: 'Philips',
      category: 'appliance',
      id: 15,
      description:
        'Designed for reliability and efficiency, this Philips blender streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.5,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760531296/vrs_bab80040b24ded0622afcfb39a0c60ea8ff597f6_myon0m.webp',
      review: 102,
    },
    oven: {
      name: 'oven',
      price: 399,
      stock: 11,
      brand: 'Whirlpool',
      category: 'appliance',
      id: 16,
      description:
        'Designed for reliability and efficiency, this Whirlpool oven streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.4,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760531295/meywxinxhqga_shjvsa.avif',
      review: 102,
    },
    vacuumcleaner: {
      name: 'vacuumCleaner',
      price: 249,
      stock: 14,
      brand: 'Dyson',
      category: 'appliance',
      id: 17,
      description:
        'Designed for reliability and efficiency, this Dyson vacuumCleaner streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.2,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760531289/comfortable-wet--dry1726491409_i6nnfq.jpg',
      review: 102,
    },
    toaster: {
      name: 'toaster',
      price: 59,
      stock: 22,
      brand: 'Breville',
      category: 'appliance',
      id: 18,
      description:
        'Designed for reliability and efficiency, this Breville toaster streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.4,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760531226/images_zjwk9b.jpg',
      review: 102,
    },
    dishwasher: {
      name: 'dishwasher',
      price: 699,
      stock: 9,
      brand: 'Bosch',
      category: 'appliance',
      id: 19,
      description:
        'Designed for reliability and efficiency, this Bosch dishwasher streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.6,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760531225/dishwashers-thumbnails_zdxh9d.png',
      review: 102,
    },
    coffeemaker: {
      name: 'coffeeMaker',
      price: 149,
      stock: 16,
      brand: 'Nespresso',
      category: 'appliance',
      id: 20,
      description:
        'Designed for reliability and efficiency, this Nespresso coffeeMaker streamlines household tasks. It combines modern engineering with user-friendly controls to deliver consistent results. Durable construction and energy-conscious operation reduce long-term costs and maintenance. A dependable choice for busy homes that demand performance and convenience.',
      rating: 4.0,
      image:'https://res.cloudinary.com/dw6xlwksx/image/upload/v1760531108/Mainstays-Black-5-Cup-Drip-Coffee-Maker-New_16f77040-27ab-4008-9852-59c900d7a7d9_1.c524f1d9c465e122596bf65f939c8d26_o1usei.avif',
      review: 102,
    },
    // "tshirt": { name: "tshirt", price: 29, stock: 100, brand: "Nike", category: "fashion", id: 21, description: "This Nike tshirt pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.5, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "jeans": { name: "jeans", price: 59, stock: 60, brand: "Levis", category: "fashion", id: 22, description: "This Levis jeans pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.4, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "sneakers": { name: "sneakers", price: 120, stock: 45, brand: "Adidas", category: "fashion", id: 23, description: "This Adidas sneakers pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.1, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "jacket": { name: "jacket", price: 89, stock: 30, brand: "Zara", category: "fashion", id: 24, description: "This Zara jacket pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "watch": { name: "watch", price: 149, stock: 25, brand: "Fossil", category: "fashion", id: 25, description: "This Fossil watch pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.6, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "cap": { name: "cap", price: 25, stock: 70, brand: "Puma", category: "fashion", id: 26, description: "This Puma cap pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.1, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "dress": { name: "dress", price: 79, stock: 40, brand: "H&M", category: "fashion", id: 27, description: "This H&M dress pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "sandals": { name: "sandals", price: 45, stock: 55, brand: "Clarks", category: "fashion", id: 28, description: "This Clarks sandals pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "hoodie": { name: "hoodie", price: 65, stock: 48, brand: "Champion", category: "fashion", id: 29, description: "This Champion hoodie pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.5, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "suit": { name: "suit", price: 249, stock: 15, brand: "Armani", category: "fashion", id: 30, description: "This Armani suit pairs contemporary style with high-quality materials for lasting comfort. Precision tailoring and thoughtful design make it suitable for both casual and formal occasions. The product’s finish and fit reflect attention to detail and seasonless appeal. An essential wardrobe piece for those who value fashion and durability.", rating: 4.3, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "novel": { name: "novel", price: 19, stock: 120, brand: "Penguin", category: "book", id: 31, description: "A thoughtfully curated novel from Penguin that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.8, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    // "sciencetextbook": { name: "scienceTextbook", price: 49, stock: 50, brand: "Oxford", category: "book", id: 32, description: "A thoughtfully curated scienceTextbook from Oxford that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.7, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "comic": { name: "comic", price: 9, stock: 200, brand: "Marvel", category: "book", id: 33, description: "A thoughtfully curated comic from Marvel that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.6, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "cookbook": { name: "cookbook", price: 25, stock: 70, brand: "DK", category: "book", id: 34, description: "A thoughtfully curated cookbook from DK that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.9, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "dictionary": { name: "dictionary", price: 35, stock: 40, brand: "Cambridge", category: "book", id: 35, description: "A thoughtfully curated dictionary from Cambridge that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.5, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "biography": { name: "biography", price: 29, stock: 42, brand: "HarperCollins", category: "book", id: 36, description: "A thoughtfully curated biography from HarperCollins that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.6, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "poetry": { name: "poetry", price: 15, stock: 60, brand: "Random House", category: "book", id: 37, description: "A thoughtfully curated poetry from Random House that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.8, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "encyclopedia": { name: "encyclopedia", price: 89, stock: 20, brand: "Britannica", category: "book", id: 38, description: "A thoughtfully curated encyclopedia from Britannica that delivers insightful content and excellent readability. Produced with quality binding and layout, it offers a comfortable reading experience. Whether for study or leisure, it provides authoritative information and engaging narratives. A recommended pick for readers seeking depth and quality in their collection.", rating: 4.6, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "sofa": { name: "sofa", price: 899, stock: 12, brand: "IKEA", category: "furniture", id: 39, description: "The IKEA sofa combines elegant design with practical comfort to elevate any living space. Constructed from durable materials and finished with attention to detail, it balances style and longevity. Ergonomic considerations ensure everyday comfort, while the refined aesthetic complements modern interiors. A reliable centerpiece for thoughtful home decor and everyday use.", rating: 4.5, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "bed": { name: "bed", price: 1099, stock: 8, brand: "Ashley", category: "furniture", id: 40, description: "The Ashley bed combines elegant design with practical comfort to elevate any living space. Constructed from durable materials and finished with attention to detail, it balances style and longevity. Ergonomic considerations ensure everyday comfort, while the refined aesthetic complements modern interiors. A reliable centerpiece for thoughtful home decor and everyday use.", rating: 4.3, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "chair": { name: "chair", price: 149, stock: 25, brand: "HomeCentre", category: "furniture", id: 41, description: "The HomeCentre chair combines elegant design with practical comfort to elevate any living space. Constructed from durable materials and finished with attention to detail, it balances style and longevity. Ergonomic considerations ensure everyday comfort, while the refined aesthetic complements modern interiors. A reliable centerpiece for thoughtful home decor and everyday use.", rating: 4.4, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "desk": { name: "desk", price: 299, stock: 15, brand: "Wayfair", category: "furniture", id: 42, description: "The Wayfair desk combines elegant design with practical comfort to elevate any living space. Constructed from durable materials and finished with attention to detail, it balances style and longevity. Ergonomic considerations ensure everyday comfort, while the refined aesthetic complements modern interiors. A reliable centerpiece for thoughtful home decor and everyday use.", rating: 3.9, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "wardrobe": { name: "wardrobe", price: 699, stock: 10, brand: "IKEA", category: "furniture", id: 43, description: "The IKEA wardrobe combines elegant design with practical comfort to elevate any living space. Constructed from durable materials and finished with attention to detail, it balances style and longevity. Ergonomic considerations ensure everyday comfort, while the refined aesthetic complements modern interiors. A reliable centerpiece for thoughtful home decor and everyday use.", rating: 4.1, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "usbdrive": { name: "usbDrive", price: 25, stock: 80, brand: "SanDisk", category: "electronics", id: 44, description: "A high-quality SanDisk usbDrive built to enhance your device ecosystem with dependable performance. It delivers fast, reliable operation and simple setup, designed for everyday convenience. Compact and durable, it’s crafted to fit modern workflows without compromise. An affordable accessory choice for users wanting dependable tech support.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "keyboard": { name: "keyboard", price: 49, stock: 30, brand: "Logitech", category: "electronics", id: 45, description: "A high-quality Logitech keyboard built to enhance your device ecosystem with dependable performance. It delivers fast, reliable operation and simple setup, designed for everyday convenience. Compact and durable, it’s crafted to fit modern workflows without compromise. An affordable accessory choice for users wanting dependable tech support.", rating: 3.9, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "mouse": { name: "mouse", price: 29, stock: 40, brand: "Razer", category: "electronics", id: 46, description: "A high-quality Razer mouse built to enhance your device ecosystem with dependable performance. It delivers fast, reliable operation and simple setup, designed for everyday convenience. Compact and durable, it’s crafted to fit modern workflows without compromise. An affordable accessory choice for users wanting dependable tech support.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "powerbank": { name: "powerBank", price: 59, stock: 20, brand: "Anker", category: "electronics", id: 47, description: "A high-quality Anker powerBank built to enhance your device ecosystem with dependable performance. It delivers fast, reliable operation and simple setup, designed for everyday convenience. Compact and durable, it’s crafted to fit modern workflows without compromise. An affordable accessory choice for users wanting dependable tech support.", rating: 3.9, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "memorycard": { name: "memoryCard", price: 39, stock: 50, brand: "Kingston", category: "electronics", id: 48, description: "A high-quality Kingston memoryCard built to enhance your device ecosystem with dependable performance. It delivers fast, reliable operation and simple setup, designed for everyday convenience. Compact and durable, it’s crafted to fit modern workflows without compromise. An affordable accessory choice for users wanting dependable tech support.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "rice": { name: "rice", price: 25, stock: 100, brand: "Golden Penny", category: "grocery", id: 49, description: "Premium-grade rice from Golden Penny ensuring consistent quality and freshness for everyday meals. Carefully sourced and packaged to preserve flavor and nutritional value. Perfect for family kitchens and daily use, it delivers dependable taste and reliability. A pantry staple that combines tradition and convenience for everyday cooking.", rating: 4.1, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "milk": { name: "milk", price: 15, stock: 80, brand: "Peak", category: "grocery", id: 50, description: "Premium-grade milk from Peak ensuring consistent quality and freshness for everyday meals. Carefully sourced and packaged to preserve flavor and nutritional value. Perfect for family kitchens and daily use, it delivers dependable taste and reliability. A pantry staple that combines tradition and convenience for everyday cooking.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "bread": { name: "bread", price: 5, stock: 60, brand: "Supreme", category: "grocery", id: 51, description: "Premium-grade bread from Supreme ensuring consistent quality and freshness for everyday meals. Carefully sourced and packaged to preserve flavor and nutritional value. Perfect for family kitchens and daily use, it delivers dependable taste and reliability. A pantry staple that combines tradition and convenience for everyday cooking.", rating: 4.0, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "eggs": { name: "eggs", price: 12, stock: 90, brand: "FarmFresh", category: "grocery", id: 52, description: "Premium-grade eggs from FarmFresh ensuring consistent quality and freshness for everyday meals. Carefully sourced and packaged to preserve flavor and nutritional value. Perfect for family kitchens and daily use, it delivers dependable taste and reliability. A pantry staple that combines tradition and convenience for everyday cooking.", rating: 3.8, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "cereal": { name: "cereal", price: 18, stock: 70, brand: "Kellogg’s", category: "grocery", id: 53, description: "Premium-grade cereal from Kellogg’s ensuring consistent quality and freshness for everyday meals. Carefully sourced and packaged to preserve flavor and nutritional value. Perfect for family kitchens and daily use, it delivers dependable taste and reliability. A pantry staple that combines tradition and convenience for everyday cooking.", rating: 3.9, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "shampoo": { name: "shampoo", price: 15, stock: 60, brand: "Dove", category: "beauty", id: 54, description: "Dove shampoo formulated to enhance personal care routines with gentle, effective ingredients. Developed to meet high standards of performance and skin/hair compatibility, it offers visible results. Elegant packaging and pleasant fragrance complete a premium self-care experience. Recommended for users seeking reliable daily grooming essentials.", rating: 4.7, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "soap": { name: "soap", price: 5, stock: 100, brand: "Olay", category: "beauty", id: 55, description: "Olay soap formulated to enhance personal care routines with gentle, effective ingredients. Developed to meet high standards of performance and skin/hair compatibility, it offers visible results. Elegant packaging and pleasant fragrance complete a premium self-care experience. Recommended for users seeking reliable daily grooming essentials.", rating: 4.5, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "perfume": { name: "perfume", price: 79, stock: 25, brand: "Chanel", category: "beauty", id: 56, description: "Chanel perfume formulated to enhance personal care routines with gentle, effective ingredients. Developed to meet high standards of performance and skin/hair compatibility, it offers visible results. Elegant packaging and pleasant fragrance complete a premium self-care experience. Recommended for users seeking reliable daily grooming essentials.", rating: 4.4, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "lotion": { name: "lotion", price: 20, stock: 45, brand: "Nivea", category: "beauty", id: 57, description: "Nivea lotion formulated to enhance personal care routines with gentle, effective ingredients. Developed to meet high standards of performance and skin/hair compatibility, it offers visible results. Elegant packaging and pleasant fragrance complete a premium self-care experience. Recommended for users seeking reliable daily grooming essentials.", rating: 4.1, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "toothpaste": { name: "toothpaste", price: 8, stock: 80, brand: "Colgate", category: "beauty", id: 58, description: "Colgate toothpaste formulated to enhance personal care routines with gentle, effective ingredients. Developed to meet high standards of performance and skin/hair compatibility, it offers visible results. Elegant packaging and pleasant fragrance complete a premium self-care experience. Recommended for users seeking reliable daily grooming essentials.", rating: 4.5, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "teddybear": { name: "teddyBear", price: 25, stock: 35, brand: "Hasbro", category: "toy", id: 59, description: "A playful and safe Hasbro teddyBear designed to entertain and stimulate young minds. Crafted with child-friendly materials and thoughtful details to encourage imaginative play. Durable construction and easy maintenance make it suitable for repeated use. An excellent gift choice that combines fun with developmental value.", rating: 3.9, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "puzzle": { name: "puzzle", price: 15, stock: 40, brand: "Ravensburger", category: "toy", id: 60, description: "A playful and safe Ravensburger puzzle designed to entertain and stimulate young minds. Crafted with child-friendly materials and thoughtful details to encourage imaginative play. Durable construction and easy maintenance make it suitable for repeated use. An excellent gift choice that combines fun with developmental value.", rating: 4.1, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "doll": { name: "doll", price: 35, stock: 30, brand: "Barbie", category: "toy", id: 61, description: "A playful and safe Barbie doll designed to entertain and stimulate young minds. Crafted with child-friendly materials and thoughtful details to encourage imaginative play. Durable construction and easy maintenance make it suitable for repeated use. An excellent gift choice that combines fun with developmental value.", rating: 4.5, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "boardgame": { name: "boardGame", price: 49, stock: 20, brand: "Mattel", category: "toy", id: 62, description: "A playful and safe Mattel boardGame designed to entertain and stimulate young minds. Crafted with child-friendly materials and thoughtful details to encourage imaginative play. Durable construction and easy maintenance make it suitable for repeated use. An excellent gift choice that combines fun with developmental value.", rating: 4.2, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
    // "remotecontrolcar": { name: "remoteControlCar", price: 79, stock: 15, brand: "Hot Wheels", category: "toy", id: 63, description: "A playful and safe Hot Wheels remoteControlCar designed to entertain and stimulate young minds. Crafted with child-friendly materials and thoughtful details to encourage imaginative play. Durable construction and easy maintenance make it suitable for repeated use. An excellent gift choice that combines fun with developmental value.", rating: 4.2, image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3", review: 102, },
  };

  getProduct(): Product[] {
    return Object.values(this.products);
  }

  getProductByName(name: string): Product | undefined {
    return this.products[name];
  }

  addProduct(key: string, product: Product) {
    this.products[key] = product;
  }

  updateStock(name: string, newStock: number) {
    if (this.products[name]) {
      this.products[name].stock = newStock;
    }
  }

  removeProduct(name: string) {
    delete this.products[name];
  }

  getCategories(): string[] {
    return [...new Set(Object.values(this.products).map((p) => p.category))];
  }

  getProductsByCategory(category: string): Product[] {
    if (category === 'all') {
      return Object.values(this.products);
    }
    return Object.values(this.products).filter((p) => p.category === category);
  }

  getProductById(id: number): Product | undefined {
    return Object.values(this.products).find((p) => p.id === id);
  }
}
