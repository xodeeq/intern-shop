import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductSearch } from './component/product-search.component';
import { QuantityComponent } from './component/quantity.component';
import { HeaderComponent } from './header/header';
import { ProductList } from './product-list/product-list';
import { ProductCart } from './component/product-cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProductList, ProductCart, ],
  template: `
    <app-header></app-header>

    <main>
      <h1 class="header">Welcome to Products Store!</h1>
      <app-product-list></app-product-list>
      <app-product-cart></app-product-cart>
      
    </main>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .header {
        text-align: center;
        color: #bb277dff;
        font-family: Arial, sans-serif;
        margin: 20px 0;
      }

      main {
        padding: 0 50px;
        background-color: #ffffffff;
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('intern-shop');
  isQuantityDisabled = true;
  searchedProductName = '';

  handleProductSearch(event: { name: string; valid: boolean }) {
    this.searchedProductName = event.name;
    this.isQuantityDisabled = !event.valid;
    console.log('Product searched:', event);
  }
}
