import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';


@Component({
  selector: 'app-product-cart',
  imports: [CommonModule, CapitalizeAndSpacePipe],
  standalone: true,
  template: `
  <div class="container">
    <h2 class="class-header">Cart</h2>
    <div *ngFor="let item of cart" class="cart-item">
      <img [src]="item.image" alt="{{item.choice | capitalizeAndSpace}}" class="cart-image" />

      <div class="item-details">
        <h3 class="item-name">{{ item.choice | capitalizeAndSpace}}</h3>
        <div class="item-sub-details">
          <p class="item-subs">Other details</p>
          <p class="item-subs">Other details</p>
          <p class="item-subs">Other details</p>
        </div>
      </div>

  
      <div class="cart-actions">
        <div class="price">{{ item.price | currency:'NGN':'symbol-narrow':'1.0-0' }}</div>

        <div class="quantity">
          <button (click)="decrease(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button (click)="increase(item)">+</button>
        </div>

        <div class="icons">
          <span class="icon" >♡</span>
          <span class="icon" (click)="remove(item)">🗑</span>
        </div>
      </div>
    </div>

    <h3 *ngIf="totalPrice > 0">Total: {{ totalPrice | currency:'NGN' }}</h3>
    <h3 *ngIf="totalPrice === 0">Your cart is empty.</h3>
  </div>
`,
  styles: [`
  .container {
    border: 2px solid #fff;
    border-radius: 8px;
    padding: 20px;
    max-width: 700px;
    margin: 30px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(248, 238, 238, 0.72);
  }

  .cart-item {
    display: flex;
    justify-content: space-between; /* ✅ pushes actions to the right */
    align-items: flex-start;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    margin-bottom: 10px;
  }

  .cart-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
  }

  .item-name {
    font-family: Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  .item-sub-details {
    margin-top: 4px;
  }

  .item-subs {
    font-family: Arial, sans-serif;
    font-size: 12px;
    color: #857979ff;
    margin: 2px 0;
  }

  .cart-actions {
    display: flex;
    flex-direction: column; /* ✅ stack price, qty, icons */
    align-items: flex-end;
    gap: 8px;
    min-width: 80px;
  }

  .price {
    font-weight: bold;
    color: #000;
    font-size: 16px;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .quantity button {
    padding: 4px 8px;
    border: 1px solid #ccc;
    background: #f9f9f9;
    border-radius: 4px;
    cursor: pointer;
  }

  .quantity span {
    font-size: 14px;
    min-width: 20px;
    text-align: center;
  }

  .icons {
    display: flex;
    gap: 10px;
    cursor: pointer;
  }

  .icon {
    font-size: 18px;
  }

  .icon:hover {
    color: red;
  }
`]

})
export class ProductCart implements OnInit {

  cart: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private Cartservice: CartService) { }

  ngOnInit(): void {
    this.Cartservice.cartUpdates$.subscribe(updatedCart => {
      this.cart = updatedCart;
    });

    this.Cartservice.totalPriceUpdates$.subscribe(updatedTotal => {
      this.totalPrice = updatedTotal;
    });
  }

  increase(item: CartItem) {
    this.Cartservice.updateCart(item.choice, item.quantity + 1);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      this.Cartservice.updateCart(item.choice, item.quantity - 1);
    }
  }

  remove(item: CartItem) {
    this.Cartservice.removeFromCart(item.choice);
  }


}
