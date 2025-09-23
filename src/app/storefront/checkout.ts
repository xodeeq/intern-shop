import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { Inventory } from './inventory';

@Injectable()
export class Checkout {

  constructor(private inventory: Inventory, private cart: Cart) { }

  getTotal() { }

  makePayment(amount: number) { }

  calculateChange(amount: number) { }
}
