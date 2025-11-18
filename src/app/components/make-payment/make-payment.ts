// import { Component, OnInit } from '@angular/core';
// import { PaymentService } from '../../services/payment.service';
// import { Router } from '@angular/router';
// import { CurrencyPipe } from '@angular/common';

// declare var PaystackPop: any;

// @Component({
//   selector: 'app-make-payment',
//   standalone: true,
//   imports: [CurrencyPipe],
//   template: `
//     <div class="make-payment-container">
//       <h2>Make Payment</h2>

//       <div class="amount">
//         Total Amount: {{ total | currency:'NGN':'symbol-narrow':'1.2-2' }}
//       </div>

//       <p class="info">
//         ⚠️ Please don’t refresh the page while the transaction is processing.
//       </p>

//       <div class="actions">
//         <button class="pay-btn" (click)="payWithPaystack()">Pay Now</button>
//         <button class="cancel-btn" (click)="cancel()">Cancel</button>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .make-payment-container {
//       background: #fff;
//       border-radius: 12px;
//       padding: 30px;
//       max-width: 450px;
//       margin: 80px auto;
//       box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//       text-align: center;
//       font-family: Arial, sans-serif;
//     }

//     h2 {
//       color: #333;
//       margin-bottom: 15px;
//     }

//     .amount {
//       font-size: 18px;
//       font-weight: bold;
//       color: #000;
//       margin-bottom: 15px;
//     }

//     .info {
//       font-size: 14px;
//       color: #777;
//       margin-bottom: 20px;
//     }

//     .actions {
//       display: flex;
//       justify-content: center;
//       gap: 10px;
//     }

//     .pay-btn, .cancel-btn {
//       border: none;
//       padding: 10px 20px;
//       font-size: 15px;
//       border-radius: 6px;
//       cursor: pointer;
//     }

//     .pay-btn {
//       background: #00b341;
//       color: white;
//     }

//     .cancel-btn {
//       background: #f44336;
//       color: white;
//     }

//     .pay-btn:hover { background: #009432; }
//     .cancel-btn:hover { background: #d32f2f; }
//   `]
// })
// export class MakePayment implements OnInit {
//   total = 0;

//   constructor(
//     private paymentService: PaymentService,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.total = this.paymentService.calculateTotalPrice();
//   }

//   payWithPaystack() {
//     const handler = PaystackPop.setup({
//       key: 'pk_test_e927b587355c3f1746921ac51fb09b5aa99e841f',
//       email: 'customer@example.com',
//       amount: this.total * 100,
//       currency: 'NGN',
//       ref: 'ref_' + Date.now(),

//       callback: (response: any) => {
//         alert('✅ Payment successful! Ref: ' + response.reference);
//         console.log('Payment successful:', response);

//         this.router.navigate(['/payment-success'], {
//           state: { reference: response.reference, amount: this.total }
//         });
//       },

//       onClose: () => {
//         alert('❌ Payment window closed.');
//         console.log('Payment cancelled.');
//         this.router.navigate(['/payment-failure']);
//       }
//     });

//     handler.openIframe();
//   }

//   cancel() {
//     this.router.navigate(['/cart']);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

declare var PaystackPop: any;

@Component({
  selector: 'app-make-payment',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="make-payment-container">
      <h2>Make Payment</h2>

      <div class="amount">
        Total Amount: {{ total | currency:'NGN':'symbol-narrow':'1.2-2' }}
      </div>

      <p class="info">
        ⚠️ Please don't refresh the page while the transaction is processing.
      </p>

      <div class="actions">
        <button class="pay-btn"
                (click)="payWithPaystack()"
                [disabled]="isProcessing">
          {{ isProcessing ? 'Processing...' : 'Pay Now' }}
        </button>

        <button class="cancel-btn"
                (click)="cancel()"
                [disabled]="isProcessing">
          Cancel
        </button>
      </div>
    </div>
  `,
  styles: [`
    .make-payment-container {
      background: #fff;
      border-radius: 12px;
      padding: 30px;
      max-width: 450px;
      margin: 80px auto;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
      font-family: Arial, sans-serif;
    }

    h2 { color: #333; margin-bottom: 15px; }
    .amount { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
    .info { color: #777; margin-bottom: 20px; }

    .actions { display: flex; justify-content: center; gap: 10px; }

    .pay-btn, .cancel-btn {
      border: none;
      padding: 10px 20px;
      font-size: 15px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .pay-btn { background: #00b341; color: white; }
    .cancel-btn { background: #f44336; color: white; }

    .pay-btn:hover:not(:disabled) { background: #009432; }
    .cancel-btn:hover:not(:disabled) { background: #d32f2f; }

    .pay-btn:disabled,
    .cancel-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class MakePayment implements OnInit {
  total = 0;
  isProcessing = false;

  constructor(
    private paymentService: PaymentService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.total = this.paymentService.calculateTotalPrice();
    console.log("ℹ Total Amount:", this.total);
  }

  payWithPaystack() {
    this.isProcessing = true;

    const amountInKobo = Math.round(this.total * 100);

    if (!amountInKobo || amountInKobo <= 0) {
      alert("❌ Invalid payment amount.");
      this.isProcessing = false;
      return;
    }

    console.log("💳 Sending amount to Paystack:", amountInKobo);

    const handler = PaystackPop.setup({
      key: 'pk_test_e927b587355c3f1746921ac51fb09b5aa99e841f',
      email: 'customer@example.com',
      amount: amountInKobo,
      currency: 'NGN',
      ref: 'ref_' + Date.now(),

      callback: (response: any) => {
        console.log("✅ Payment successful:", response);

        // clear cart (run outside Paystack, not async inside callback)
        this.cartService.clearCart().then(() => {
          console.log("Cart cleared.");
        }).catch(err => console.error(err));

        this.isProcessing = false;

        this.router.navigate(['/payment-success'], {
          state: { reference: response.reference, amount: this.total }
        });
      },

      onClose: () => {
        console.warn("❌ Paystack window closed.");
        alert("❌ Payment window closed.");

        this.isProcessing = false;
      }
    });

    handler.openIframe();
  }

  cancel() {
    this.router.navigate(['/cart']);
  }
}
