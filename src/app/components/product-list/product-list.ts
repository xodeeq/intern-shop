// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
// import { ProductCard } from '../product-card/product-card';
// import { Product, ProductService } from '../../services/product.services';
// import { FormsModule } from '@angular/forms';
// import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';


// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule, ProductCard, FormsModule, CapitalizeAndSpacePipe],
//   template: `
//     <div class="shop">
//       <h2>SHOP</h2>
//     </div>
    
//     <div class="this-products">
//      <select [(ngModel)]="selectedCategory" (change)="filterProducts()">
//         <option value="all" >All Categories</option>
//         <option *ngFor="let category of categories" [value]="category">
//           {{ category | capitalizeAndSpace }}
//         </option>
//       </select>

//     <div class="product-list">
//       <app-product-card
//         *ngFor="let product of filteredProducts"
//         [product]="product">
//       </app-product-card>
//     </div>
//     </div>
//   `,
//   styles: [`
//     .shop {
//   text-align: center;
//   margin: 20px 0;
//   font-family: 'Poppins', sans-serif;
// }


// .this-products {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
//   font-family: Arial, sans-serif;
// }


// .this-products select {
//   display: block;
//   margin-bottom: 20px;
//   padding: 8px 12px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 15px;
//   font-family: inherit;
// }


// option {
//   background: #fff;
//   border: none;
// }


// .product-list {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px;
// }


// .product-card {
//   background: white;
//   border: 1px solid #eee;
//   border-radius: 8px;
//   padding: 16px;
//   text-align: center;
//   box-shadow: 0 2px 6px rgba(0,0,0,0.08);
//   transition: transform 0.2s ease;
// }

// .product-card:hover {
//   transform: translateY(-4px);
// }

// .product-card img {
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   border-radius: 6px;
//   margin-bottom: 12px;
// }

// .product-card h3 {
//   font-size: 18px;
//   margin: 10px 0 5px;
//   font-weight: 500;
// }

// .product-card .price {
//   font-size: 15px;
//   font-weight: bold;
//   margin-bottom: 15px;
//   color: #333;
// }

// .product-card button {
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 16px;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 14px;
//   width: 100%;
// }

// .product-card button:hover {
//   background-color: #0056b3;
// }

//   `],
// })
// export class ProductList implements OnInit {
//   @Input() selectedCategory: string = 'all';  // ✅ Step 1: Add this Input

//   products: Product[] = [];
//   categories: string[] = [];
//   filteredProducts: Product[] = [];

//   constructor(private productService: ProductService) {
//     this.products = this.productService.getProduct();
//   }

//   ngOnInit() {
//     this.categories = this.productService.getCategories();
//     this.filterProducts();
//   }

//   ngOnChanges(changes: SimpleChanges) {   // ✅ Step 2: React when footer updates category
//     if (changes['selectedCategory']) {
//       this.filterProducts();
//     }
//   }

//   filterProducts() {
//     this.filteredProducts = this.productService.getProductsByCategory(this.selectedCategory);
//   }
// }

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
    <div class="shop-container">
      <div class="shop-header">
        <h2>SHOP</h2>
        <p class="subtitle">Discover our amazing products</p>
      </div>
      
      <div class="filter-section">
        <div class="filter-controls">
          <select [(ngModel)]="selectedCategory" (change)="filterProducts()" class="category-select">
            <option value="all">All Categories</option>
            <option *ngFor="let category of categories" [value]="category">
              {{ category | capitalizeAndSpace }}
            </option>
          </select>

          <div class="view-toggle">
            <button 
              class="view-btn" 
              [class.active]="viewMode === 'grid'"
              (click)="viewMode = 'grid'"
              title="Grid View">
              <i class="fa fa-th"></i>
            </button>
            <button 
              class="view-btn" 
              [class.active]="viewMode === 'list'"
              (click)="viewMode = 'list'"
              title="List View">
              <i class="fa fa-list"></i>
            </button>
          </div>
        </div>

        <div class="results-info">
          <span>{{ filteredProducts.length }} products found</span>
        </div>
      </div>

      <div class="product-list" [class.grid-view]="viewMode === 'grid'" [class.list-view]="viewMode === 'list'">
        <app-product-card
          *ngFor="let product of filteredProducts"
          [product]="product"
          [viewMode]="viewMode">
        </app-product-card>
      </div>

      <div *ngIf="filteredProducts.length === 0" class="no-products">
        <i class="fa fa-box-open"></i>
        <h3>No products found</h3>
        <p>Try selecting a different category</p>
      </div>
    </div>
  `,
  styles: [`
    /* Container */
    .shop-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Arial', sans-serif;
    }

    /* Header */
    .shop-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .shop-header h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #333;
    }

    .subtitle {
      color: #666;
      font-size: 16px;
    }

    /* Filter Section */
    .filter-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding: 15px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      flex-wrap: wrap;
      gap: 15px;
    }

    .filter-controls {
      display: flex;
      align-items: center;
      gap: 15px;
      flex: 1;
    }

    .category-select {
      padding: 10px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 15px;
      font-family: inherit;
      background: #fff;
      cursor: pointer;
      transition: border-color 0.3s ease;
      min-width: 180px;
    }

    .category-select:hover {
      border-color: #007bff;
    }

    .category-select:focus {
      outline: none;
      border-color: #007bff;
    }

    /* View Toggle */
    .view-toggle {
      display: flex;
      gap: 5px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      overflow: hidden;
    }

    .view-btn {
      padding: 8px 12px;
      background: #fff;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #666;
      transition: all 0.3s ease;
    }

    .view-btn:hover {
      background: #f5f5f5;
      color: #333;
    }

    .view-btn.active {
      background: #007bff;
      color: #fff;
    }

    .results-info {
      color: #666;
      font-size: 14px;
    }

    /* Product List - Grid View */
    .product-list.grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
    }

    /* Product List - List View */
    .product-list.list-view {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* No Products Message */
    .no-products {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .no-products i {
      font-size: 64px;
      margin-bottom: 20px;
      color: #ddd;
    }

    .no-products h3 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #666;
    }

    .no-products p {
      font-size: 16px;
    }

    /* Tablet Styles (768px - 1024px) */
    @media (max-width: 1024px) {
      .shop-container {
        padding: 15px;
      }

      .shop-header h2 {
        font-size: 28px;
      }

      .product-list.grid-view {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 20px;
      }
    }

    /* Mobile Styles (< 768px) */
    @media (max-width: 768px) {
      .shop-container {
        padding: 10px;
      }

      .shop-header h2 {
        font-size: 24px;
      }

      .subtitle {
        font-size: 14px;
      }

      .filter-section {
        flex-direction: column;
        align-items: stretch;
        padding: 12px;
      }

      .filter-controls {
        width: 100%;
        justify-content: space-between;
      }

      .category-select {
        flex: 1;
        min-width: auto;
      }

      .results-info {
        width: 100%;
        text-align: center;
        padding-top: 10px;
        border-top: 1px solid #eee;
      }

      .product-list.grid-view {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 15px;
      }

      .product-list.list-view {
        gap: 15px;
      }

      .no-products {
        padding: 40px 20px;
      }

      .no-products i {
        font-size: 48px;
      }

      .no-products h3 {
        font-size: 20px;
      }
    }

    /* Small Mobile (< 480px) */
    @media (max-width: 480px) {
      .shop-header h2 {
        font-size: 20px;
      }

      .filter-section {
        padding: 10px;
      }

      .category-select {
        font-size: 14px;
        padding: 8px 12px;
      }

      .view-btn {
        padding: 6px 10px;
        font-size: 14px;
      }

      .product-list.grid-view {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
      }

      .results-info {
        font-size: 13px;
      }
    }
  `]
})
export class ProductList implements OnInit {
  @Input() selectedCategory: string = 'all';
  
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    // Subscribe to products from service
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.filterProducts();
    });

    this.categories = this.productService.getCategories();
    
    // Load saved view mode from localStorage
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'list' || savedViewMode === 'grid') {
      this.viewMode = savedViewMode;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory']) {
      this.filterProducts();
    }
  }

  filterProducts() {
    this.filteredProducts = this.productService.getProductsByCategory(this.selectedCategory);
  }

  ngOnDestroy() {
    // Save view mode preference
    localStorage.setItem('viewMode', this.viewMode);
  }
}