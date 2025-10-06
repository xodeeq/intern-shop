import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product, ProductService } from '../../services/product.services';
import { FormsModule } from '@angular/forms';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard, FormsModule, CapitalizeAndSpacePipe],
  template: `
    <div class="shop">
      <h2>SHOP</h2>
    </div>

     <select [(ngModel)]="selectedCategory" (change)="filterProducts()">
        <option value="all" >All Categories</option>
        <option *ngFor="let category of categories" [value]="category">
          {{ category | capitalizeAndSpace }}
        </option>
      </select>

    <div class="product-list">
      <app-product-card
        *ngFor="let product of filteredProducts"
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

    select { margin-bottom: 20px; padding: 5px; border: none; margin-left: 8%;}

    option{
      background: #fff;
      border : none;
      height: 150%;
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
export class ProductList implements OnInit {
  @Input() selectedCategory: string = 'all';  // ✅ Step 1: Add this Input

  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProduct();
  }

  ngOnInit() {
    this.categories = this.productService.getCategories();
    this.filterProducts();
  }

  ngOnChanges(changes: SimpleChanges) {   // ✅ Step 2: React when footer updates category
    if (changes['selectedCategory']) {
      this.filterProducts();
    }
  }

  filterProducts() {
    this.filteredProducts = this.productService.getProductsByCategory(this.selectedCategory);
  }
}