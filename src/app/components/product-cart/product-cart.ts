import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';
import { Payment } from '../payment/payment';


@Component({
  selector: 'app-product-cart',
  imports: [CommonModule, CapitalizeAndSpacePipe, Payment],
  standalone: true,
  template: `

  <div class="cart-layout">
  <div class="cart-section">
    <h2 class="class-header">Cart</h2>
    <div *ngFor="let item of cart" class="cart-item">
      <img [src]="item.image" alt="{{item.name | capitalizeAndSpace}}" class="cart-image" />

      <div class="item-details">
        <h3 class="item-name">{{ item.name | capitalizeAndSpace}}</h3>
        <div class="item-sub-details">
          
          @if (item.color === '#007bff'){
            <p class="item-subs">Colour: Blue</p>
          }
          @else if (item.color === '#ff5722'){
            <p class="item-subs">Colour: Orange</p>
          }
          @else if (item.color === '#9c27b0'){
            <p class="item-subs">Colour: Purple</p>
          }
          @else if (item.color === '#4caf50'){
            <p class="item-subs">Colour: Green</p>
          }
          
          @if (item.size === 'S') {
             <p class="item-subs">Size: Small</p>
            } @else if (item.size === 'M') {
              <p class="item-subs">Size: Medium</p>
            } @else if (item.size === 'L') {
               <p class="item-subs">Size: Large</p>
            }
            @else if (item.size === 'XL') {
               <p class="item-subs">Size: Exta Large</p>
            }
            @else if (item.size === 'XXL') {
               <p class="item-subs">Size: Double Extra Large</p>
            }

          <p class="item-subs">Other details</p>
        </div>
      </div>

  
      <div class="cart-actions">
        <div class="price">{{ item.price | currency:'NGN':'symbol-narrow':'1.2-2' }}</div>

        <div class="quantity">
          <button (click)="decreaseQuantity(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button (click)="increaseQuantity(item)">+</button>
        </div>


        <div class="icons">
          <span class="icon favorite">
            <i class="fa-regular fa-heart"></i>
          </span>

          <span class="icon remove" (click)="removeItem(item)">
            <i class="fa-solid fa-trash"></i>
          </span>

        </div>
      </div>
    </div>

    <h3 *ngIf="totalPrice > 0">Sub Total: {{ totalPrice | currency:'NGN' }}</h3>
    <h3 *ngIf="totalPrice === 0">Your cart is empty.</h3>
  </div>

  <app-payment></app-payment>

  </div>
  
  
`,
  styles: [`
  .cart-section {
    flex: 2;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(248, 238, 238, 0.72);
  }

  .cart-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  margin: 30px;
}

app-payment {
  flex: 1;
  position: sticky;
  top: 20px;
}

  .class-header{
    font-size: bolder;
    font-family: Arial, sans-serif;
  }

  .cart-item {
    display: flex;
    justify-content: space-between; 
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
    flex-direction: column; \
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
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
  transition: color 0.4s ease, transform 0.4s ease;
}

.icon.favorite:hover {
  color: #e91e63; 
  
}

.icon.remove:hover {
  color: #f44336; 
  
}

`]

})
export class ProductCart implements OnInit {

  cart: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }



  ngOnInit(): void {
    this.cartService.cartUpdates$.subscribe(updatedCart => {
      this.cart = updatedCart;
    });

    this.cartService.totalPriceUpdates$.subscribe(updatedTotal => {
      this.totalPrice = updatedTotal;
    });
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateCart(item.id, item.quantity + 1, item.color, item.size);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateCart(item.id, item.quantity - 1, item.color, item.size);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id, item.color, item.size);
  }




}
