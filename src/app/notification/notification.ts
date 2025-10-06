import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  template: `
    <div class="notification">
      <span class="badge" *ngIf="totalItems() > 0">{{ totalItems() }}</span>
    </div>
  `,
  styles: `
     .notification {
      position: relative;
      display: inline-block;
    }

    .badge {
      position: absolute;
      top: -25px;
      right: -15px;
      background: #ff3b3b;
      color: white;
      border-radius: 50%;
      padding: 3px 7px;
      font-size: 11px;
      font-weight: 600;
      min-width:8px;
      max-width: 10px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      line-height: 1;
    }`,
})
export class Notification {
  constructor(private cartservice: CartService) {}

  totalItems() {
    return this.cartservice.getTotalItems();
  }
}
