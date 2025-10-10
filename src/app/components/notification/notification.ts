import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

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
  top: -8px;
  right: -10px;
  background: #ff3b3b;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 6px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
`,
})
export class Notification {
  constructor(private cartservice: CartService) { }

  totalItems() {
    return this.cartservice.getTotalItems();
  }
}