import { Component } from '@angular/core';
import { Cart } from './cart';
import { Checkout } from './checkout';

@Component({
  selector: 'app-storefront',
  imports: [],
  providers: [Cart, Checkout],
  template: `
    <p>
      storefront works!
    </p>
  `,
  styles: ``
})

export class Storefront {

}
