import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  brand: string;
  stock: number;
  image: string;
  category: string;
}

export type ProductDictionary = {
  [key: string]: Product;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductDictionary = {
    "phone": { name: "phone", price: 699, stock: 50, brand: 'Samsung', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "tablet": { name: "tablet", price: 799, stock: 23, brand: 'Apple', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "laptop": { name: "laptop", price: 1299, stock: 75, brand: 'Dell', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "monitor": { name: "monitor", price: 199, stock: 18, brand: 'LG', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "headphones": { name: "headphones", price: 99, stock: 25, brand: 'Sony', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "smartwatch": { name: "smartwatch", price: 299, stock: 34, brand: 'Samsung', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "router": { name: "router", price: 149, stock: 12, brand: 'TP-Link', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "camera": { name: "camera", price: 499, stock: 8, brand: 'Canon', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "speaker": { name: "speaker", price: 129, stock: 40, brand: 'Bose', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "printer": { name: "printer", price: 249, stock: 15, brand: 'HP', category: "gadget", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },

    // Appliances
    "fridge": { name: "fridge", price: 899, stock: 10, brand: 'Samsung', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "microwave": { name: "microwave", price: 199, stock: 20, brand: 'Panasonic', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "washingMachine": { name: "washingMachine", price: 599, stock: 8, brand: 'LG', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "airConditioner": { name: "airConditioner", price: 799, stock: 6, brand: 'Haier', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "blender": { name: "blender", price: 49, stock: 40, brand: 'Philips', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "oven": { name: "oven", price: 399, stock: 11, brand: 'Whirlpool', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "vacuumCleaner": { name: "vacuumCleaner", price: 249, stock: 14, brand: 'Dyson', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "toaster": { name: "toaster", price: 59, stock: 22, brand: 'Breville', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "dishwasher": { name: "dishwasher", price: 699, stock: 9, brand: 'Bosch', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "coffeeMaker": { name: "coffeeMaker", price: 149, stock: 16, brand: 'Nespresso', category: "appliance", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },

    // Fashion
    "tshirt": { name: "tshirt", price: 29, stock: 100, brand: 'Nike', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "jeans": { name: "jeans", price: 59, stock: 60, brand: 'Levis', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "sneakers": { name: "sneakers", price: 120, stock: 45, brand: 'Adidas', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "jacket": { name: "jacket", price: 89, stock: 30, brand: 'Zara', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "watch": { name: "watch", price: 149, stock: 25, brand: 'Fossil', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "cap": { name: "cap", price: 25, stock: 70, brand: 'Puma', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "dress": { name: "dress", price: 79, stock: 40, brand: 'H&M', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "sandals": { name: "sandals", price: 45, stock: 55, brand: 'Clarks', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "hoodie": { name: "hoodie", price: 65, stock: 48, brand: 'Champion', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "suit": { name: "suit", price: 249, stock: 15, brand: 'Armani', category: "fashion", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },

    // Books
    "novel": { name: "novel", price: 19, stock: 120, brand: 'Penguin', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "scienceTextbook": { name: "scienceTextbook", price: 49, stock: 50, brand: 'Oxford', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "comic": { name: "comic", price: 9, stock: 200, brand: 'Marvel', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "cookbook": { name: "cookbook", price: 25, stock: 70, brand: 'DK', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "dictionary": { name: "dictionary", price: 35, stock: 40, brand: 'Cambridge', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "biography": { name: "biography", price: 29, stock: 42, brand: 'HarperCollins', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "poetry": { name: "poetry", price: 15, stock: 60, brand: 'Random House', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },
    "encyclopedia": { name: "encyclopedia", price: 89, stock: 20, brand: 'Britannica', category: "book", image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3" },


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
    return [...new Set(Object.values(this.products).map(p => p.category))];
  }

  getProductsByCategory(category: string): Product[] {
    if (category === 'all') {
      return Object.values(this.products);
    }
    return Object.values(this.products).filter(p => p.category === category);
  }
}
