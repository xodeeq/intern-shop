import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Inventory {
  /**
   * implement products features here
   */
  products = [];

  getProducts() { }

  findProduct(name: string) { }
}
