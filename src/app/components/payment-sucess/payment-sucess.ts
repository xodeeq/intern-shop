// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-payment-success',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="success-container">
//       <div class="icon">✅</div>
//       <h2>Payment Successful!</h2>
//       <p>Thank you for your purchase.</p>

//       <div *ngIf="paymentRef" class="reference">
//         <strong>Transaction Reference:</strong>
//         <span>{{ paymentRef }}</span>
//       </div>

//       <button class="home-btn" (click)="goHome()">Continue Shopping</button>
//     </div>
//   `,
//   styles: [`
//     .success-container {
//       text-align: center;
//       background: #fff;
//       border-radius: 12px;
//       padding: 40px 20px;
//       max-width: 450px;
//       margin: 100px auto;
//       box-shadow: 0 3px 15px rgba(0,0,0,0.1);
//       font-family: 'Segoe UI', sans-serif;
//     }

//     .icon {
//       font-size: 50px;
//       color: #4CAF50;
//       margin-bottom: 10px;
//     }

//     h2 {
//       font-size: 24px;
//       color: #333;
//       margin-bottom: 5px;
//     }

//     p {
//       color: #555;
//       margin-bottom: 20px;
//     }

//     .reference {
//       background: #f7f7f7;
//       padding: 10px;
//       border-radius: 6px;
//       margin-bottom: 25px;
//       font-size: 14px;
//     }

//     .home-btn {
//       background: #000;
//       color: white;
//       padding: 10px 25px;
//       border: none;
//       border-radius: 6px;
//       cursor: pointer;
//       font-size: 15px;
//     }

//     .home-btn:hover {
//       background: #222;
//     }
//   `]
// })
// export class PaymentSuccess {
//   paymentRef: string | null = null;

//   constructor(private router: Router) {

//     const navigation = this.router.getCurrentNavigation();
//     this.paymentRef = navigation?.extras?.state?.['reference'] || null;
//   }

//   goHome() {
//     this.router.navigate(['/']); // 
//   }
// }


import { Component, OnInit } from '@angular/core';
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
      <p>Thank you for your purchase. Your order has been confirmed.</p>

      <div *ngIf="paymentRef" class="reference">
        <strong>Transaction Reference:</strong>
        <span>{{ paymentRef }}</span>
      </div>

      <div *ngIf="amount" class="amount-paid">
        <strong>Amount Paid:</strong>
        <span>{{ amount | currency:'NGN':'symbol-narrow':'1.2-2' }}</span>
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
      animation: scaleIn 0.5s ease;
    }

    @keyframes scaleIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
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

    .reference,
    .amount-paid {
      background: #f7f7f7;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 15px;
      font-size: 14px;
    }

    .reference strong,
    .amount-paid strong {
      display: block;
      margin-bottom: 5px;
      color: #666;
    }

    .reference span,
    .amount-paid span {
      font-weight: 600;
      color: #333;
    }

    .info-box {
      background: #e8f5e9;
      border: 1px solid #4CAF50;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
    }

    .info-box p {
      margin: 5px 0;
      color: #2e7d32;
      font-size: 14px;
    }

    .home-btn {
      background: #000;
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
      transition: background 0.3s ease;
    }

    .home-btn:hover {
      background: #222;
    }

    /* Mobile Styles */
    @media (max-width: 480px) {
      .success-container {
        margin: 50px auto;
        padding: 30px 15px;
      }

      h2 {
        font-size: 20px;
      }

      .icon {
        font-size: 40px;
      }
    }
  `]
})
export class PaymentSuccess implements OnInit {
  paymentRef: string | null = null;
  amount: number | null = null;

  constructor(private router: Router) {
    console.log('✅ PaymentSuccess component initialized');
    
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    
    this.paymentRef = state?.['reference'] || null;
    this.amount = state?.['amount'] || null;

    console.log('💳 Payment Reference:', this.paymentRef);
    console.log('💰 Amount Paid:', this.amount);
  }

  ngOnInit() {
    console.log('🎉 Payment success page loaded');
  }

  goHome() {
    console.log('🏠 Navigating to home page');
    this.router.navigate(['/']);
  }
}