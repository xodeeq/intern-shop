import { Injectable } from '@angular/core';
import { ProductService } from './product.services';
import { BehaviorSubject } from 'rxjs';
import { CapitalizeAndSpacePipe } from '../pipes/capitalize-and-space-pipe';



export interface CartItem { id: number; name: string; quantity: number; price: number; image: string; color?: string; size?: string; }



@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];


  totalPrice: number = 0;

  private discount = 0;


  private cartUpdate = new BehaviorSubject<CartItem[]>([]);
  cartUpdates$ = this.cartUpdate.asObservable();

  private totalPriceUpdate = new BehaviorSubject<number>(0);
  totalPriceUpdates$ = this.totalPriceUpdate.asObservable();

  private totalItemsUpdate = new BehaviorSubject<number>(0);
  totalItemsUpdates$ = this.totalItemsUpdate.asObservable();





  constructor(private productService: ProductService) { }





  addToCart(productId: number, quantity: number, color?: string, size?: string): string {


    const product = this.productService.getProductById(productId);

    if (!product) return "❌ Item not found.";
    if (quantity > product.stock) {
      return `❌ Sorry, we only have ${product.stock} ${productId}(s) in stock.`;
    }

    const existingItem = this.cart.find(item => item.id === product.id && item.color === color && item.size === size);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ id: product.id, name: product.name, quantity, price: product.price, image: product.image, color, size });
    }

    product.stock -= quantity;
    this.totalPrice += product.price * quantity;

    this.updateCartObservers();
    this.totalPriceUpdate.next(this.totalPrice);

    return `✅ Added ${quantity} ${product.name}(s) - ${color || ''} ${size || ''} to the cart.`;


  }

  updateCart(productId: number, newQuantity: number, color?: string, size?: string) {
    const product = this.productService.getProductById(productId);
    if (!product) return "❌ Item not found.";

    const item = this.cart.find(c => c.id === product.id && c.color === color && c.size === size);
    if (!item) return "❌ Item not found in cart.";

    const difference = newQuantity - item.quantity;

    if (difference > 0) {
      if (difference > product.stock) {
        return `❌ Sorry, only ${product.stock} left in stock.`;
      }
      product.stock -= difference;
      this.totalPrice += product.price * difference;
    } else {
      product.stock += Math.abs(difference);
      this.totalPrice -= product.price * Math.abs(difference);
    }

    item.quantity = newQuantity;
    this.updateCartObservers();

    return `✅ Updated ${product.name} (${color || ''} ${size || ''}) quantity to ${newQuantity}.`;
  }

  removeFromCart(productId: number, color?: string, size?: string) {
    const product = this.productService.getProductById(productId);
    if (!product) return "❌ Item not found.";

    const index = this.cart.findIndex(c => c.id === product.id && c.color === color && c.size === size);
    if (index === -1) return "❌ Item not found in cart.";

    const item = this.cart[index];
    product.stock += item.quantity;
    this.totalPrice -= item.price * item.quantity;

    this.cart.splice(index, 1);
    this.updateCartObservers();

    return `✅ Removed ${product.name} (${color || ''} ${size || ''}) from the cart.`;
  }

  getCart() {
    return this.cart;
  }



  getSubTotalCartPrice() {
    return this.totalPrice;
  }

  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);

    // or
    // let total = 0;
    // let i = 0;
    // while (i < this.cart.length) {
    //   total += this.cart[i].quantity;
    //   i++;
    // }
    // return total;

  }

  private updateCartObservers() {
    this.cartUpdate.next([...this.cart]);
    this.totalPriceUpdate.next(this.totalPrice);
    this.totalItemsUpdate.next(this.getTotalItems());
  }

  getDiscount(): number {
    return this.discount || 0;
  }



}

