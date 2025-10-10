import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { thumbsUpSharp } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private cartservice: CartService) { }




  getSubTotalPrice(): number {
    const subTotalPrice = this.cartservice.getSubTotalCartPrice();
    return parseFloat(subTotalPrice.toFixed(2))
  }

  calculateVAT(): number {
    const subTotal = this.getSubTotalPrice();
    const calculatedDiscount = 0.01 * subTotal;
    return parseFloat(calculatedDiscount.toFixed(2));
  }

  calculateDelivery(): number {
    const subTotal = this.getSubTotalPrice();
    const calculatedDeliveryPrice = 0.06 * subTotal;
    return parseFloat(calculatedDeliveryPrice.toFixed(2));
  }

  calculateDiscount(): string | number {
    const discountRate = this.cartservice.getDiscount?.() ?? 0;
    const subTotal = this.getSubTotalPrice();

    if (discountRate > 0) {
      const discountAmount = (discountRate / 100) * subTotal;
      return discountAmount.toFixed(2)
    }
    else {
      return '-';
    }
  }


  calculateTotalPrice(): number {
    const subTotal = this.getSubTotalPrice();
    const vat = this.calculateVAT();
    const delivery = this.calculateDelivery();
    const discount = this.calculateDiscount();
    const discountValue = discount === '-' ? 0 : parseFloat(discount as string);

    const totalPrice = subTotal - discountValue + vat + delivery;
    return parseFloat(totalPrice.toFixed(2));
  }



}

