import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductSearch } from './components/product-search/product-search';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductSearch],
  template: `
    <h1 class="header">Welcome to Products Store!</h1>
    <app-product-search (productsearched)="handleProductSearch($event)"></app-product-search>
    <router-outlet />
    <style>
      
    </style>
  `,
  styles: [`
    .header { 
        text-align: center;
        color: #2c3e50;
        font-family: Arial, sans-serif;
        margin-top: 20px;
      }
    `],
})
export class App {
  protected readonly title = signal('intern-shop');

  handleProductSearch(event: string) {
    console.log('Product searched:', event);
  }
}
