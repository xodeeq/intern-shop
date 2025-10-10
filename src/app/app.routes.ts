import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList)
  },
  {
    title: 'Product Details',
    path: 'product/:category/:name/:id',
    loadComponent: () => import('./components/product-details/product-details').then(m => m.ProductDetails)
  },
  {
    title: 'Cart',
    path: 'cart',
    loadComponent: () => import('./components/product-cart/product-cart').then(m => m.ProductCart)
  },
];
