import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.services';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../services/likes.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CapitalizeAndSpacePipe, RouterLink],
  template: `
    <div class="product-card">
      <h3>{{ product.name | capitalizeAndSpace }}</h3>
      <img [src]="product.image" alt="{{ product.name }}" />
      
       <div class= "details">
        <p>Brand: {{ product.brand }}</p>
        <p>Price: {{ product.price | currency:'NGN' }}</p>
        <p>Stock: {{ product.stock }}</p>
       </div>
      <button (click)="addToCart()">Add to Cart</button>

      <div class="favourite">
        <a [routerLink]="['/product', product.category, product.name, product.id]"
          [queryParams]="{rating: product.rating, reviews: product.review}" class="product-details">View Details</a>
        <i 
          class="fa-heart love-icon"
          [class.fa-solid]="likesService.isInLikes(product.id)"
          [class.fa-regular]="!likesService.isInLikes(product.id)"
          (click)="toggleLike(product)">
        </i>
      </div>

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

      .favourite{
        display: flex;
        gap: 100px;
        align-items: center;
        justify-items: space-between;
        margin-top: 5px;
        margin-left: 20px
      }

      .product-details{
        text-decoration: none;
        transition: 0.3s all ease;
      }

      .product-details:hover{
        color: #e91e63;
      }

      .love-icon{
        font-size: 17px;
        color: #bbb;
        cursor: pointer;
        transition: color 0.3s ease, transform 0.2s ease;
      }
      .love-icon:hover {
        color: #ff4d6d;
        transform: scale(1.2);
      }
      .love-icon.active {
        color: #ff4d6d;
      }
    `,
  ],
})
export class ProductCard {
  @Input() product!: Product;

  constructor(private cartService: CartService
    , public likesService: LikesService
  ) { }

  addToCart() {
    const result = this.cartService.addToCart(this.product.id, 1);
    console.log(result);
    alert(result);
  }

  toggleLike(product: any) {
    if (this.likesService.isInLikes(product.id)) {
      this.likesService.removeFromLikes(product.id);
    } else {
      this.likesService.addToLikes(product.id, 1);
    }
  }
}