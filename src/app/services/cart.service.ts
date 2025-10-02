import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService, Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private totalPrice: number = 0;

  private cartUpdate = new BehaviorSubject<CartItem[]>([]);
  cartUpdates$ = this.cartUpdate.asObservable();

  private totalPriceUpdate = new BehaviorSubject<number>(0);
  totalPriceUpdates$ = this.totalPriceUpdate.asObservable();

  constructor(private productService: ProductService) {}

  addToCart(productKey: string, quantity: number = 1): string {
    const product = this.productService.getProductByName(productKey);

    if (!product) return `❌ Item not found.`;
    if (quantity > product.stock) {
      return `❌ Sorry, we only have ${product.stock} ${productKey}(s) in stock.`;
    }

    const existingItem = this.cart.find(item => item.product.name === product.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }

    product.stock -= quantity;
    this.totalPrice += product.price * quantity;

    this.cartUpdate.next(this.cart);
    this.totalPriceUpdate.next(this.totalPrice);

    return `✅ Added ${quantity} ${productKey}(s) to the cart.`;
  }

  getCart() {
    return this.cart;
  }

  updateCart(productKey: string, newQuantity: number): string {
    const product = this.productService.getProductByName(productKey);
    if (!product) return `❌ Item not found.`;

    const item = this.cart.find(c => c.product.name === product.name);
    if (!item) return `❌ Item not found in cart.`;

    const difference = newQuantity - item.quantity;

    if (difference > 0) {
      if (difference > product.stock) {
        return `❌ Sorry, only ${product.stock} left in stock.`;
      }
      product.stock -= difference;
      this.totalPrice += product.price * difference;
    } else if (difference < 0) {
      product.stock += Math.abs(difference);
      this.totalPrice -= product.price * Math.abs(difference);
    }

    item.quantity = newQuantity;

    this.cartUpdate.next(this.cart);
    this.totalPriceUpdate.next(this.totalPrice);

    return `✅ Updated ${productKey} quantity to ${newQuantity}.`;
  }

  removeFromCart(productKey: string): string {
    const product = this.productService.getProductByName(productKey);
    if (!product) return `❌ Item not found.`;

    const itemIndex = this.cart.findIndex(c => c.product.name === product.name);
    if (itemIndex === -1) return `❌ Item not found in cart.`;

    const item = this.cart[itemIndex];
    product.stock += item.quantity;
    this.totalPrice -= product.price * item.quantity;
    this.cart.splice(itemIndex, 1);

    this.cartUpdate.next(this.cart);
    this.totalPriceUpdate.next(this.totalPrice);

    return `✅ Removed ${productKey} from the cart.`;
  }

  getTotalCartPrice() {
    return this.totalPrice;
  }
  

  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
