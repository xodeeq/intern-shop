import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.services';

export interface LikeItem { id: number; name: string; quantity: number; stock: number; price: number; image: string; color?: string; size?: string; }

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  likes: LikeItem[] = [];

  private likesUpdate = new BehaviorSubject<LikeItem[]>([])
  likesUpdates$ = this.likesUpdate.asObservable();

  constructor(private productservice: ProductService) { }


  addToLikes(productId: number, quantity: number = 1, color?: string, size?: string): string {
    const product = this.productservice.getProductById(productId);

    if (!product) return "❌ Item not found.";

    const existingItem = this.likes.find(
      item => item.id === product.id && item.color === color && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      this.updateLikesObservers();
      return `💖 Updated quantity of ${product.name} in your likes.`;
    }


    this.likes.push({
      id: product.id,
      name: product.name,
      quantity,
      price: product.price,
      image: product.image,
      stock: product.stock,
      color,
      size
    });

    this.updateLikesObservers();
    return `💖 ${product.name} added to your likes.`;
  }


  removeFromLikes(productId: number, color?: string, size?: string): string {
    const index = this.likes.findIndex(
      item => item.id === productId && item.color === color && item.size === size
    );

    if (index === -1) return "❌ Item not found in likes.";

    const product = this.likes[index];
    this.likes.splice(index, 1);

    this.updateLikesObservers();
    return `❌ ${product.name} removed from likes.`;
  }


  clearLikes(): string {
    this.likes = [];
    this.updateLikesObservers();
    return "🗑️ All liked items cleared.";
  }


  getLikes(): LikeItem[] {
    return [...this.likes];
  }


  isInLikes(productId: number, color?: string, size?: string): boolean {
    return this.likes.some(
      item => item.id === productId && item.color === color && item.size === size
    );
  }


  getTotalLikes(): number {
    return this.likes.reduce((total, item) => total + item.quantity, 0);
  }


  private updateLikesObservers() {
    this.likesUpdate.next([...this.likes]);
  }
}