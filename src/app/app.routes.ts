import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    loadComponent: () => import('./storefront/storefront').then(m => m.Storefront)
  },
];
