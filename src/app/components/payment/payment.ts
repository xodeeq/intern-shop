import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  template: `
    <div class="order-summary">
      <h3>Order Summary</h3>

      <div class="summary-row">
        <span>Subtotal</span>
        <span>\{{ subtotal | currency:'NGN':'symbol-narrow':'1.2-2'  }}</span>
      </div>

      <div class="summary-row">
        <span>Delivery</span>
        <span>\{{ delivery | currency:'NGN':'symbol-narrow':'1.2-2'  }}</span>
      </div>

      <div class="summary-row">
        <span>Discount</span>
        <span>{{ discount === '-' ? '-' : (discount | currency:'NGN':'symbol-narrow':'1.2-2') }}</span>
      </div>

      <hr />

      <div class="summary-total">
        <span>Total</span>
        <span>\{{ total | currency:'NGN':'symbol-narrow':'1.2-2' }}</span>
      </div>

      <button class="checkout-btn">Checkout</button>
    </div>

  `,
  styles: `
   .order-summary {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 10px;
      padding: 20px;
      width: 300px;
      font-family: 'Arial', sans-serif;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .order-summary h3 {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
      color: #555;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
      color: #111;
    }

    .checkout-btn {
      width: 100%;
      background: #000;
      color: #fff;
      border: none;
      padding: 10px 0;
      border-radius: 6px;
      font-size: 15px;
      margin-top: 15px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .checkout-btn:hover {
      background: #222;
    }
`
})
export class Payment implements OnInit {

  subtotal = 0;
  delivery = 0;
  discount: string | number = '-';
  total = 0;

  constructor(private paymentservice: PaymentService) { }

  ngOnInit() {
    this.loadPaymentSummary();
  }

  loadPaymentSummary() {
    this.subtotal = this.paymentservice.getSubTotalPrice();
    this.delivery = this.paymentservice.calculateDelivery();
    this.discount = this.paymentservice.calculateDiscount();
    this.total = this.paymentservice.calculateTotalPrice();
  }

}
