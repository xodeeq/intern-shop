import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <h3>{{ product.name }}</h3>

     <img [src]="product.image" alt="{{product.name}}" />

      <p class="price">Price: ₦{{ product.price }} | Stock: {{ product.stock }}</p>
      <button (click)="addToCart()">Add to Cart</button>
    </div>
  `,
  styles: [
    `
      .product-card {
        background: white;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      }

      .product-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 6px;
        margin: 12px 0;
      }

      .product-card h3 {
        font-size: 20px;
        margin: 0 0 10px;
        font-weight: 600;
      }

      .price {
        font-size: 20px;
        font-weight: bold;
        margin: 10px 0 15px;
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
    `,
  ],
})
export class ProductCard {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    const result = this.cartService.addToCart(this.product.name.toLowerCase(), 1);
    console.log(result);
    alert(result);
  }
}
