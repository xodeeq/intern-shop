import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="success-container">
      <div class="icon">✅</div>
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>

      <div *ngIf="paymentRef" class="reference">
        <strong>Transaction Reference:</strong>
        <span>{{ paymentRef }}</span>
      </div>

      <button class="home-btn" (click)="goHome()">Continue Shopping</button>
    </div>
  `,
  styles: [`
    .success-container {
      text-align: center;
      background: #fff;
      border-radius: 12px;
      padding: 40px 20px;
      max-width: 450px;
      margin: 100px auto;
      box-shadow: 0 3px 15px rgba(0,0,0,0.1);
      font-family: 'Segoe UI', sans-serif;
    }

    .icon {
      font-size: 50px;
      color: #4CAF50;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 5px;
    }

    p {
      color: #555;
      margin-bottom: 20px;
    }

    .reference {
      background: #f7f7f7;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 25px;
      font-size: 14px;
    }

    .home-btn {
      background: #000;
      color: white;
      padding: 10px 25px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
    }

    .home-btn:hover {
      background: #222;
    }
  `]
})
export class PaymentSuccess {
  paymentRef: string | null = null;

  constructor(private router: Router) {

    const navigation = this.router.getCurrentNavigation();
    this.paymentRef = navigation?.extras?.state?.['reference'] || null;
  }

  goHome() {
    this.router.navigate(['/']); // 
  }
}
