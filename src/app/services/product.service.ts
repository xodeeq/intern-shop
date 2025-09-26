import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  brand: string;
  stock: number;
}

export type ProductDictionary = {
  [key: string]: Product;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductDictionary = {
    "phone": { name: "phone", price: 699, stock: 50, brand: 'Samsung' },
    "tablet": { name: "tablet", price: 799, stock: 23, brand: 'Apple' },
    "laptop": { name: "laptop", price: 1299, stock: 75, brand: 'Dell' },
    "monitor": { name: "monitor", price: 199, stock: 18, brand: 'LG' },
    "headphones": { name: "headphones", price: 99, stock: 25, brand: 'Sony' },
    "smartwatch": { name: "smartwatch", price: 299, stock: 34, brand: 'Samsung' },
   "router" : { name: "router", price: 149, stock: 12, brand: 'TP-Link' },
    "camera":{ name: "camera", price: 499, stock: 8, brand: 'Canon' },
    "speaker": { name: "speaker", price: 129, stock: 40, brand: 'Bose' },
    "printer": { name: "printer", price: 249, stock: 15, brand: 'HP' }
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
