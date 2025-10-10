import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductSearch } from './components/product-search/product-search';
import { ProductCart } from './components/product-cart/product-cart';
import { ProductList } from "./components/product-list/product-list";
import { Footer } from './components/footer/footer';
import { HeaderComponent } from "./components/header/header";
import { Payment } from "./components/payment/payment";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, HeaderComponent,],
  template: `
  <div class="general">
    <app-header></app-header>
    
    
    <router-outlet />
     <app-footer (categorySelected)="onCategorySelected($event)"></app-footer>
    
  </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    

    body, html {
      font-family: Arial, sans-serif;
      background-color: #f4f6f9;
      
    }

    .header{
      align-self: center;
      justify-self: center;
    }
    .general {
      min-height: 100vh;
      padding: 20px;
      background-color: #f9f9f9;
    }
    `],

})
export class App {
  protected readonly title = signal('intern-shop');

  handleProductSearch(event: string) {
    console.log('Product searched:', event);
  }


  selectedCategory: string = 'all';

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }
}
