import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="failure-container">
      <div class="icon">❌</div>
      <h2>Payment Failed</h2>
      <p>Unfortunately, your payment could not be processed.</p>

      <div class="actions">
        <button class="retry-btn" (click)="retryPayment()">Try Again</button>
        <button class="home-btn" (click)="goHome()">Back to Shop</button>
      </div>
    </div>
  `,
  styles: [`
    .failure-container {
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
      color: #E53935;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 5px;
    }

    p {
      color: #555;
      margin-bottom: 25px;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    button {
      padding: 10px 25px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
    }

    .retry-btn {
      background: #E53935;
      color: white;
    }

    .retry-btn:hover {
      background: #d32f2f;
    }

    .home-btn {
      background: #555;
      color: white;
    }

    .home-btn:hover {
      background: #333;
    }
  `]
})
export class PaymentFailure {

  constructor(private router: Router) { }

  retryPayment() {
    this.router.navigate(['/make-payment']);
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }
}
