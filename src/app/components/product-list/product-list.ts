import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product, ProductService } from '../../services/product.services';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  template: `
    <div class="shop">
      <h2>SHOP</h2>
    </div>

    <div class="product-list">
      <app-product-card
        *ngFor="let product of products"
        [product]="product">
      </app-product-card>
    </div>
  `,
  styles: [`
    .shop {
      text-align: center;
      margin: 20px 0;
      font-family: Arial, sans-serif;
    }

    .product-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr); 
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto; 
      padding: 20px;
    }

    .product-card {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      transition: transform 0.2s ease;
    }

    

    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .product-card h3 {
      font-size: 80px;
      margin: 10px 0 5px;
      font-weight: 500;
    }

    .product-card .price {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #333;
    }

    .product-card button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      width: 100%;
    }

    .product-card button:hover {
      background-color: #0056b3;
    }
  `],
})
export class ProductList {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProduct();
  }
}