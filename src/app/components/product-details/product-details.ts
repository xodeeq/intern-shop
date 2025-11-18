import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.services';
import { CartService } from '../../services/cart.service';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CapitalizeAndSpacePipe],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    
    <div class="loading" *ngIf="loading">
      <i class="fa fa-spinner fa-spin"></i>
      <p>Loading product...</p>
    </div>

    <div class="product-details" *ngIf="product && !loading">
      <div class="image-section">
        <img [src]="product.image" [alt]="product.name" class="main-img" />

        <div class="thumbnail-row">
          <img *ngFor="let img of [product.image, product.image, product.image]"
               [src]="img"
               class="thumb"
               (click)="product.image = img" />
        </div>
      </div>

      <div class="info-section">
        <h2>{{ product.name | capitalizeAndSpace}}</h2>
        <div class="rating">
          <span class="stars"><i class="fa-solid fa-star text-yellow-500"></i> {{product.rating}}</span>
          <small>({{product.review}} Reviews)</small>
        </div>

        <div class="price">
          <span class="current">{{ product.price | currency:'NGN':'symbol-narrow':'1.2-2' }}</span>
          <span class="old">{{ (product.price * 1.2) | currency:'NGN':'symbol-narrow':'1.2-2' }}</span>
        </div>

        <p class="desc">
          {{ product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam, purus eget sagittis vulputate...' }}
        </p>

        <div class="options">
          <p><strong>Available Options</strong></p>

          <div class="colors">
            <span *ngFor="let color of ['#007bff', '#ff5722', '#9c27b0', '#4caf50']"
                  [style.background]="color"
                  class="color-box"
                  [class.active]="selectedColor === color"
                  (click)="selectColor(color)"></span>
          </div>

          <div class="sizes">
            <button *ngFor="let size of ['S', 'M', 'L', 'XL', 'XXL']"
                    [class.active]="selectedSize === size"
                    (click)="selectSize(size)">
              {{ size }}
            </button>
          </div>
        </div>

        <div class="quantity">
          <button (click)="decreaseQty()">−</button>
          <span>{{ quantity }}</span>
          <button (click)="increaseQty()">+</button>
        </div>

        <button class="add-cart" (click)="addToCart()" [disabled]="isAddingToCart">
          <i class="fa fa-shopping-cart"></i>
          {{ isAddingToCart ? 'Adding...' : 'Add To Cart' }}
        </button>

        <p class="category"><strong>Category:</strong> {{ product.category | capitalizeAndSpace }}</p>
        <p class="availability">
          <strong>Availability:</strong> 
          <span [class.in-stock]="product.stock > 0" [class.out-of-stock]="product.stock === 0">
            {{ product.stock > 0 ? product.stock + ' In Stock' : 'Out of Stock' }}
          </span>
        </p>

        <p class="message" [class.success]="message.includes('✅')" [class.error]="message.includes('❌')">
          {{ message }}
        </p>
      </div>
    </div>

    <div class="error" *ngIf="!product && !loading">
      <i class="fa fa-exclamation-circle"></i>
      <h3>Product not found</h3>
      <p>The product you're looking for doesn't exist.</p>
      <a routerLink="/" class="back-home">Back to Home</a>
    </div>
  `,
  styles: `
  /* Loading State */
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    color: #666;
  }

  .loading i {
    font-size: 48px;
    margin-bottom: 15px;
    color: #007bff;
  }

  /* Error State */
  .error {
    text-align: center;
    padding: 60px 20px;
    color: #999;
  }

  .error i {
    font-size: 64px;
    color: #ff4d4f;
    margin-bottom: 20px;
  }

  .error h3 {
    font-size: 24px;
    color: #666;
    margin-bottom: 10px;
  }

  .back-home {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 30px;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
  }

  /* Product Details */
  .product-details {
    display: flex;
    margin: 40px;
    gap: 40px;
    padding: 40px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .image-section {
    flex: 1;
  }

  .main-img {
    width: 100%;
    max-height: 500px;
    border-radius: 8px;
    object-fit: cover;
  }

  .thumbnail-row {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .thumb {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
    object-fit: cover;
    transition: border-color 0.3s ease;
  }

  .thumb:hover {
    border-color: #e91e63;
  }

  .info-section {
    flex: 1;
  }

  .info-section h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }

  .rating small {
    color: gray;
  }

  .price {
    margin: 15px 0;
  }

  .price .current {
    color: #e91e63;
    font-weight: 700;
    font-size: 28px;
  }

  .price .old {
    text-decoration: line-through;
    color: gray;
    margin-left: 10px;
    font-size: 18px;
  }

  .desc {
    line-height: 1.6;
    color: #666;
    margin: 20px 0;
  }

  .options {
    margin: 25px 0;
  }

  .colors {
    display: flex;
    gap: 10px;
    margin: 15px 0;
  }

  .color-box {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    margin-right: 8px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: all 0.3s ease;
  }

  .color-box:hover {
    transform: scale(1.1);
  }

  .color-box.active {
    border-color: #000;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;
  }

  .sizes {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .sizes button {
    padding: 8px 16px;
    border: 2px solid #ddd;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .sizes button:hover {
    border-color: #007bff;
    background: #f0f8ff;
  }

  .sizes button.active {
    border-color: #e91e63;
    background: #fdecef;
    color: #e91e63;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 20px 0;
  }

  .quantity button {
    width: 40px;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid #ddd;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .quantity button:hover {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .quantity span {
    font-size: 18px;
    font-weight: 600;
    min-width: 40px;
    text-align: center;
  }

  .add-cart {
    padding: 14px 30px;
    background: #e91e63;
    border: none;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.3s ease;
    width: 100%;
    justify-content: center;
  }

  .add-cart:hover:not(:disabled) {
    background: #c2185b;
  }

  .add-cart:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .category, .availability {
    margin: 15px 0;
    font-size: 15px;
    color: #666;
  }

  .in-stock {
    color: #4caf50;
    font-weight: 600;
  }

  .out-of-stock {
    color: #ff4d4f;
    font-weight: 600;
  }

  .message {
    margin-top: 15px;
    padding: 12px;
    border-radius: 6px;
    font-weight: 500;
  }

  .message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  /* Tablet Styles */
  @media (max-width: 1024px) {
    .product-details {
      margin: 30px 20px;
      padding: 30px;
      gap: 30px;
    }

    .info-section h2 {
      font-size: 24px;
    }

    .price .current {
      font-size: 24px;
    }
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .product-details {
      flex-direction: column;
      margin: 20px 10px;
      padding: 20px;
      gap: 25px;
    }

    .thumbnail-row {
      justify-content: center;
    }

    .thumb {
      width: 70px;
      height: 70px;
    }

    .info-section h2 {
      font-size: 22px;
    }

    .price .current {
      font-size: 22px;
    }

    .sizes button {
      padding: 6px 12px;
      font-size: 14px;
    }
  }

  /* Small Mobile */
  @media (max-width: 480px) {
    .product-details {
      padding: 15px;
    }

    .info-section h2 {
      font-size: 20px;
    }

    .price .current {
      font-size: 20px;
    }

    .color-box {
      width: 28px;
      height: 28px;
    }

    .sizes {
      flex-wrap: wrap;
    }

    .thumb {
      width: 60px;
      height: 60px;
    }
  }
  `
})
export class ProductDetails implements OnInit {
  product: Product | null = null;
  quantity = 1;
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  message = '';
  loading = true;
  isAddingToCart = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Try sync first (from cached products)
    this.product = this.productService.getProductByIdSync(id);
    
    if (this.product) {
      this.loading = false;
    } else {
      // Fetch from Supabase if not in cache
      this.product = await this.productService.getProductById(id);
      this.loading = false;
    }
  }

  increaseQty() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.message = '';
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.message = '';
  }

  async addToCart() {
    if (!this.product) {
      this.message = '❌ Product not found.';
      return;
    }

    if (!this.selectedColor || !this.selectedSize) {
      this.message = '❌ Please select color and size.';
      return;
    }

    this.isAddingToCart = true;
    this.message = 'Adding to cart...';

    try {
      const result = await this.cartService.addToCart(
        this.product.id, 
        this.quantity, 
        this.selectedColor, 
        this.selectedSize
      );
      
      this.message = result;

      // Reset selections if successful
      if (result.includes('✅')) {
        setTimeout(() => {
          this.quantity = 1;
          this.selectedColor = null;
          this.selectedSize = null;
        }, 2000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.message = '❌ Failed to add to cart. Please try again.';
    } finally {
      this.isAddingToCart = false;
    }
  }
}