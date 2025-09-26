import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductSearch } from './component/product-search.component';
import { QuantityComponent } from './component/quantity.component';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductSearch, QuantityComponent, ProductList],
  template: `
    <h1 class="header">Welcome to Products Store!</h1>
    <!-- <app-product-search (productsearched)="handleProductSearch($event)"></app-product-search>
    <app-quantity [disabled]="isQuantityDisabled" [productName]="searchedProductName"></app-quantity
    ><router-outlet /> -->
    <app-product-list></app-product-list>
    <router-outlet></router-outlet>
    <style></style>
  `,
  styles: [
    `
      .header {
        text-align: center;
        color: #2c3e50;
        font-family: Arial, sans-serif;
        margin-top: 20px;
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
