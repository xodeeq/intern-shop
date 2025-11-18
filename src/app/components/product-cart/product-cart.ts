// import { Component, OnInit } from '@angular/core';
// import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
// import { CartItem, CartService } from '../../services/cart.service';
// import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';
// import { Payment } from '../payment/payment';


// @Component({
//   selector: 'app-product-cart',
//   imports: [CommonModule, CapitalizeAndSpacePipe, Payment],
//   standalone: true,
//   template: `

//   <div class="cart-layout">
//   <div class="cart-section">
//     <h2 class="class-header">Cart</h2>
//     <div *ngFor="let item of cart" class="cart-item">
//       <img [src]="item.image" alt="{{item.name | capitalizeAndSpace}}" class="cart-image" />

//       <div class="item-details">
//         <h3 class="item-name">{{ item.name | capitalizeAndSpace}}</h3>
//         <div class="item-sub-details">
          
//           @if (item.color === '#007bff'){
//             <p class="item-subs">Colour: Blue</p>
//           }
//           @else if (item.color === '#ff5722'){
//             <p class="item-subs">Colour: Orange</p>
//           }
//           @else if (item.color === '#9c27b0'){
//             <p class="item-subs">Colour: Purple</p>
//           }
//           @else if (item.color === '#4caf50'){
//             <p class="item-subs">Colour: Green</p>
//           }
          
//           @if (item.size === 'S') {
//              <p class="item-subs">Size: Small</p>
//             } @else if (item.size === 'M') {
//               <p class="item-subs">Size: Medium</p>
//             } @else if (item.size === 'L') {
//                <p class="item-subs">Size: Large</p>
//             }
//             @else if (item.size === 'XL') {
//                <p class="item-subs">Size: Exta Large</p>
//             }
//             @else if (item.size === 'XXL') {
//                <p class="item-subs">Size: Double Extra Large</p>
//             }

//           <p class="item-subs">Other details</p>
//         </div>
//       </div>

  
//       <div class="cart-actions">
//         <div class="price">{{ item.price | currency:'NGN':'symbol-narrow':'1.2-2' }}</div>

//         <div class="quantity">
//           <button (click)="decreaseQuantity(item)">-</button>
//           <span>{{ item.quantity }}</span>
//           <button (click)="increaseQuantity(item)">+</button>
//         </div>


//         <div class="icons">
//           <span class="icon favorite">
//             <i class="fa-regular fa-heart"></i>
//           </span>

//           <span class="icon remove" (click)="removeItem(item)">
//             <i class="fa-solid fa-trash"></i>
//           </span>

//         </div>
//       </div>
//     </div>

//     <h3 *ngIf="totalPrice > 0">Sub Total: {{ totalPrice | currency:'NGN' }}</h3>
//     <h3 *ngIf="totalPrice === 0">Your cart is empty.</h3>
//   </div>

//   <app-payment></app-payment>

//   </div>
  
  
// `,
//   styles: [`
//   .cart-section {
//     flex: 2;
//   background-color: #fff;
//   border-radius: 8px;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(248, 238, 238, 0.72);
//   }

//   .cart-layout {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: 30px;
//   margin: 30px;
// }

// app-payment {
//   flex: 1;
//   position: sticky;
//   top: 20px;
// }

//   .class-header{
//     font-size: bolder;
//     font-family: Arial, sans-serif;
//   }

//   .cart-item {
//     display: flex;
//     justify-content: space-between; 
//     border-bottom: 1px solid #ccc;
//     padding: 10px 0;
//     margin-bottom: 10px;
//   }

//   .cart-image {
//     width: 100px;
//     height: 100px;
//     object-fit: cover;
//     margin-right: 15px;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
//   }

//   .item-name {
//     font-family: Arial, sans-serif;
//     font-size: 16px;
//     margin: 0;
//   }

//   .item-sub-details {
//     margin-top: 4px;
//   }

//   .item-subs {
//     font-family: Arial, sans-serif;
//     font-size: 12px;
//     color: #857979ff;
//     margin: 2px 0;
//   }

//   .cart-actions {
//     display: flex;
//     flex-direction: column; \
//     align-items: flex-end;
//     gap: 8px;
//     min-width: 80px;
//   }

//   .price {
//     font-weight: bold;
//     color: #000;
//     font-size: 16px;
//   }

//   .quantity {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .quantity button {
//     padding: 4px 8px;
//     border: 1px solid #ccc;
//     background: #f9f9f9;
//     border-radius: 4px;
//     cursor: pointer;
//   }

//   .quantity span {
//     font-size: 14px;
//     min-width: 20px;
//     text-align: center;
//   }

//   .icons {
//     display: flex;
//     gap: 10px;
//     cursor: pointer;
//   }

//   .icon {
//   cursor: pointer;
//   font-size: 18px;
//   margin-right: 10px;
//   transition: color 0.4s ease, transform 0.4s ease;
// }

// .icon.favorite:hover {
//   color: #e91e63; 
  
// }

// .icon.remove:hover {
//   color: #f44336; 
  
// }

// `]

// })
// export class ProductCart implements OnInit {

//   cart: CartItem[] = [];
//   totalPrice: number = 0;

//   constructor(private cartService: CartService) { }



//   ngOnInit(): void {
//     this.cartService.cartUpdates$.subscribe(updatedCart => {
//       this.cart = updatedCart;
//     });

//     this.cartService.totalPriceUpdates$.subscribe(updatedTotal => {
//       this.totalPrice = updatedTotal;
//     });
//   }

//   increaseQuantity(item: CartItem) {
//     this.cartService.updateCart(item.id, item.quantity + 1, item.color, item.size);
//   }

//   decreaseQuantity(item: CartItem) {
//     if (item.quantity > 1) {
//       this.cartService.updateCart(item.id, item.quantity - 1, item.color, item.size);
//     }
//   }

//   removeItem(item: CartItem) {
//     this.cartService.removeFromCart(item.id, item.color, item.size);
//   }




// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';
import { Payment } from '../payment/payment';

@Component({
  selector: 'app-product-cart',
  imports: [CommonModule, CapitalizeAndSpacePipe, Payment],
  standalone: true,
  template: `
    <div class="cart-container">
      <!-- Cart Header -->
      <div class="cart-header">
        <h2><i class="fa fa-shopping-cart"></i> Shopping Cart</h2>
        <span class="item-count">{{ cart.length }} {{ cart.length === 1 ? 'item' : 'items' }}</span>
      </div>

      <div class="cart-layout">
        <!-- Cart Items Section -->
        <div class="cart-section">
          <div *ngIf="cart.length === 0" class="empty-cart">
            <i class="fa fa-shopping-cart"></i>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <a routerLink="/" class="continue-shopping">Continue Shopping</a>
          </div>

          <div *ngFor="let item of cart" class="cart-item">
            <div class="item-image-container">
              <img [src]="item.image" [alt]="item.name | capitalizeAndSpace" class="cart-image" />
            </div>

            <div class="item-details">
              <h3 class="item-name">{{ item.name | capitalizeAndSpace }}</h3>
              
              <div class="item-attributes">
                <span *ngIf="item.color" class="attribute">
                  <span class="color-dot" [style.background]="item.color"></span>
                  {{ getColorName(item.color) }}
                </span>
                <span *ngIf="item.size" class="attribute">
                  <i class="fa fa-ruler"></i> {{ getSizeName(item.size) }}
                </span>
              </div>

              <div class="mobile-price">
                {{ item.price | currency:'NGN':'symbol-narrow':'1.2-2' }}
              </div>

              <div class="item-actions-mobile">
                <div class="quantity-control">
                  <button (click)="decreaseQuantity(item)" class="qty-btn" aria-label="Decrease quantity">
                    <i class="fa fa-minus"></i>
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button (click)="increaseQuantity(item)" class="qty-btn" aria-label="Increase quantity">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>

                <button class="remove-btn-mobile" (click)="removeItem(item)" aria-label="Remove item">
                  <i class="fa fa-trash"></i> Remove
                </button>
              </div>
            </div>

            <!-- Desktop Actions -->
            <div class="cart-actions">
              <div class="price">{{ item.price | currency:'NGN':'symbol-narrow':'1.2-2' }}</div>

              <div class="quantity-control">
                <button (click)="decreaseQuantity(item)" class="qty-btn" aria-label="Decrease quantity">
                  <i class="fa fa-minus"></i>
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button (click)="increaseQuantity(item)" class="qty-btn" aria-label="Increase quantity">
                  <i class="fa fa-plus"></i>
                </button>
              </div>

              <div class="item-total">
                {{ (item.price * item.quantity) | currency:'NGN':'symbol-narrow':'1.2-2' }}
              </div>

              <div class="action-icons">
                <button class="icon-btn remove" (click)="removeItem(item)" aria-label="Remove item" title="Remove">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <div *ngIf="cart.length > 0" class="cart-summary-mobile">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span class="amount">{{ totalPrice | currency:'NGN':'symbol-narrow':'1.2-2' }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Summary (Desktop) -->
        <div class="payment-container" *ngIf="cart.length > 0">
          <app-payment></app-payment>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Container */
    .cart-container {
      max-width: 1400px;
      margin: 20px auto;
      padding: 20px;
      font-family: 'Arial', sans-serif;
    }

    /* Header */
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #eee;
    }

    .cart-header h2 {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
    }

    .item-count {
      color: #666;
      font-size: 16px;
      background: #f5f5f5;
      padding: 6px 12px;
      border-radius: 20px;
    }

    /* Layout */
    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 30px;
      align-items: start;
    }

    /* Cart Section */
    .cart-section {
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    /* Empty Cart */
    .empty-cart {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .empty-cart i {
      font-size: 64px;
      color: #ddd;
      margin-bottom: 20px;
    }

    .empty-cart h3 {
      font-size: 24px;
      color: #666;
      margin-bottom: 10px;
    }

    .continue-shopping {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 30px;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      transition: background 0.3s ease;
    }

    .continue-shopping:hover {
      background: #0056b3;
    }

    /* Cart Item */
    .cart-item {
      display: grid;
      grid-template-columns: 120px 1fr auto;
      gap: 20px;
      padding: 20px;
      border-bottom: 1px solid #eee;
      transition: background 0.3s ease;
    }

    .cart-item:hover {
      background: #fafafa;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    /* Image */
    .item-image-container {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      overflow: hidden;
      background: #f5f5f5;
    }

    .cart-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Item Details */
    .item-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .item-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .item-attributes {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .attribute {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: #666;
      background: #f0f0f0;
      padding: 4px 10px;
      border-radius: 4px;
    }

    .color-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #ddd;
    }

    /* Mobile Elements (Hidden on Desktop) */
    .mobile-price,
    .item-actions-mobile,
    .cart-summary-mobile {
      display: none;
    }

    /* Cart Actions */
    .cart-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 15px;
      min-width: 150px;
    }

    .price {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    .item-total {
      font-size: 20px;
      font-weight: 700;
      color: #e91e63;
    }

    /* Quantity Control */
    .quantity-control {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #f5f5f5;
      border-radius: 6px;
      padding: 4px;
    }

    .qty-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: #666;
    }

    .qty-btn:hover {
      background: #007bff;
      color: white;
    }

    .quantity {
      font-size: 16px;
      font-weight: 600;
      min-width: 30px;
      text-align: center;
    }

    /* Action Icons */
    .action-icons {
      display: flex;
      gap: 10px;
    }

    .icon-btn {
      width: 36px;
      height: 36px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: #666;
    }

    .icon-btn.remove:hover {
      background: #ff4d4f;
      color: white;
      border-color: #ff4d4f;
    }

    /* Payment Container */
    .payment-container {
      position: sticky;
      top: 20px;
    }

    /* Tablet Styles (768px - 1024px) */
    @media (max-width: 1024px) {
      .cart-layout {
        grid-template-columns: 1fr 320px;
        gap: 20px;
      }

      .cart-item {
        grid-template-columns: 100px 1fr auto;
        gap: 15px;
      }

      .item-image-container {
        width: 100px;
        height: 100px;
      }
    }

    /* Mobile Styles (< 768px) */
    @media (max-width: 768px) {
      .cart-container {
        padding: 15px 10px;
      }

      .cart-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

      .cart-header h2 {
        font-size: 22px;
      }

      .cart-layout {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .cart-section {
        padding: 15px;
      }

      .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 12px;
        padding: 15px;
      }

      .item-image-container {
        width: 80px;
        height: 80px;
      }

      .item-name {
        font-size: 16px;
      }

      /* Show Mobile Elements */
      .mobile-price {
        display: block;
        font-size: 18px;
        font-weight: 700;
        color: #e91e63;
        margin-top: 5px;
      }

      .item-actions-mobile {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        gap: 10px;
      }

      .remove-btn-mobile {
        padding: 8px 16px;
        background: #ff4d4f;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: background 0.3s ease;
      }

      .remove-btn-mobile:hover {
        background: #d9363e;
      }

      /* Hide Desktop Actions */
      .cart-actions {
        display: none;
      }

      /* Payment moves to bottom on mobile */
      .payment-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        max-height: 60vh;
        overflow-y: auto;
      }

      .cart-summary-mobile {
        display: block;
        padding: 15px 0;
        border-top: 2px solid #eee;
        margin-top: 20px;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 600;
      }

      .amount {
        color: #e91e63;
      }
    }

    /* Small Mobile (< 480px) */
    @media (max-width: 480px) {
      .cart-header h2 {
        font-size: 20px;
      }

      .item-count {
        font-size: 14px;
        padding: 4px 10px;
      }

      .cart-item {
        padding: 12px;
      }

      .item-image-container {
        width: 70px;
        height: 70px;
      }

      .item-name {
        font-size: 14px;
      }

      .attribute {
        font-size: 12px;
        padding: 3px 8px;
      }

      .mobile-price {
        font-size: 16px;
      }

      .item-actions-mobile {
        flex-direction: column;
        align-items: stretch;
      }

      .quantity-control {
        justify-content: center;
      }

      .remove-btn-mobile {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ProductCart implements OnInit {
  cart: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartUpdates$.subscribe(updatedCart => {
      this.cart = updatedCart;
    });

    this.cartService.totalPriceUpdates$.subscribe(updatedTotal => {
      this.totalPrice = updatedTotal;
    });
  }

  async increaseQuantity(item: CartItem) {
    await this.cartService.updateCart(item.product_id, item.quantity + 1, item.color, item.size);
  }

  async decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      await this.cartService.updateCart(item.product_id, item.quantity - 1, item.color, item.size);
    }
  }

  async removeItem(item: CartItem) {
    const confirmed = confirm(`Remove ${item.name} from cart?`);
    if (confirmed) {
      await this.cartService.removeFromCart(item.product_id, item.color, item.size);
    }
  }

  getColorName(colorCode?: string): string {
    const colorMap: { [key: string]: string } = {
      '#007bff': 'Blue',
      '#ff5722': 'Orange',
      '#9c27b0': 'Purple',
      '#4caf50': 'Green'
    };
    return colorCode ? colorMap[colorCode] || 'Color' : '';
  }

  getSizeName(size?: string): string {
    const sizeMap: { [key: string]: string } = {
      'S': 'Small',
      'M': 'Medium',
      'L': 'Large',
      'XL': 'Extra Large',
      'XXL': 'Double XL'
    };
    return size ? sizeMap[size] || size : '';
  }
}