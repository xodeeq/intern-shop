import { Injectable } from '@angular/core';

@Injectable()
export class Cart {
  items: { name: string; quantity: number }[] = [];

  getItems() {
    return this.items;
  }

  addItem(name: string, quantity: number) {
    // Check if item already exists, then increase quantity
    const existing = this.items.find((item) => item.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ name, quantity });
    }
  }

  removeItem(name: string) {
    this.items = this.items.filter((item) => item.name !== name);
  }
}
