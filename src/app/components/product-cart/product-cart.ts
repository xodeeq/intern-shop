import { Component } from '@angular/core';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';


@Component({
  selector: 'app-product-cart',
  imports: [CommonModule,],
  standalone: true,
  template: `
  <div class="container">
    <h2 class="class-header">Cart</h2>
    <div *ngFor="let item of cart" class="cart-item">
      <img [src]="item.image" alt="{{item.name}}" class="cart-image" />

      <div class="item-details">
        <h3 class="item-name">{{ item.name }}</h3>
        <div class="item-sub-details">
          <p class="item-subs">Variant: {{item.variant}}</p>
          <p class="item-subs">Size: {{item.size}}</p>
          <p class="item-subs">Color: {{item.color}}</p>
        </div>
      </div>

      <!-- ✅ Actions on the right -->
      <div class="cart-actions">
        <div class="price">{{ item.price | currency:'NGN':'symbol-narrow':'1.0-0' }}</div>

        <div class="quantity">
          <button (click)="decrease(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button (click)="increase(item)">+</button>
        </div>

        <div class="icons">
          <span class="icon">♡</span>
          <span class="icon" (click)="remove(item)">🗑</span>
        </div>
      </div>
    </div>
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
export class ProductCart {

  cart = [

    {
      name: "Black Jacket Puffed",
      variant: "Agora",
      size: "XXL",
      color: "Black",
      price: 499.00,
      quantity: 63,
      image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Women White Jacket",
      variant: "Allure",
      size: "XL",
      color: "Smokie white",
      price: 1000.00,
      quantity: 36,
      image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Orange Full Wear",
      variant: "Vibe",
      size: "L",
      color: "Orange",
      price: 1200.00,
      quantity: 53,
      image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Blue Denim Jacket",
      variant: "Denim",
      size: "M",
      color: "Blue",
      price: 750.00,
      quantity: 41,
      image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Red Leather Jacket",
      variant: "Fierce",
      size: "S",
      color: "Red",
      price: 1500.00,
      quantity: 29,
      image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Green Parka Jacket",
      variant: "Forest",
      size: "M",
      color: "Green",
      price: 1100.00,
      quantity: 47,
      image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Grey Wool Jacket",
      variant: "Urban",
      size: "L",
      color: "Grey",
      price: 1300.00,
      quantity: 38,
      image: "https://tse3.mm.bing.net/th/id/OIP.xZGkTQ3grFSh1zI1z9WTewHaJn?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  ];

  increase(item: any) {
    item.quantity++;
  }

  decrease(item: any) {
    if (item.quantity > 1) item.quantity--;
  }

  remove(item: any) {
    this.cart = this.cart.filter(p => p !== item);
  }
}
