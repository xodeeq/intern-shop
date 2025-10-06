import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  brand: string;
  stock: number;
  image: string;
}

export type ProductDictionary = {
  [key: string]: Product;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductDictionary = {
    "phone": { name: "Phone", price: 699, stock: 50, brand: 'Samsung', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3'},
    "tablet": { name: "Tablet", price: 799, stock: 23, brand: 'Apple', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3' },
    "laptop": { name: "Laptop", price: 1299, stock: 75, brand: 'Dell', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3' },
    "monitor": { name: "Monitor", price: 199, stock: 18, brand: 'LG', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3' },
    "headphones": { name: "Headphones", price: 99, stock: 25, brand: 'Sony', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3' },
    "smartwatch": { name: "Smartwatch", price: 299, stock: 34, brand: 'Samsung', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3' },
   "router" : { name: "Router", price: 149, stock: 12, brand: 'TP-Link', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3' },
    "camera":{ name: "Camera", price: 499, stock: 8, brand: 'Canon', image: 'https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3' },
    
  };

  
  getProduct(): Product[] {
    return Object.values(this.products);
  }

  
  getProductByName(name: string): Product | undefined {
    return this.products[name];
  }

  
  addProduct(key: string, product: Product){
    this.products[key] = product;
  }

  
  updateStock(name: string, newStock: number){
    if (this.products[name]) {
      this.products[name].stock = newStock;
    }
  }

  
  removeProduct(name: string) {
    delete this.products[name];
  }
}
