import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.services';
import { SupabaseService } from './supabase.service';

export interface LikeItem { 
  id?: number;
  product_id: number;
  name: string; 
  quantity: number; 
  stock: number; 
  price: number; 
  image: string; 
  color?: string; 
  size?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likes: LikeItem[] = [];
  private userId: string | null = null;

  private likesUpdate = new BehaviorSubject<LikeItem[]>([]);
  likesUpdates$ = this.likesUpdate.asObservable();

  constructor(
    private productService: ProductService,
    private supabase: SupabaseService
  ) {
    this.initializeLikes();
  }

  private async initializeLikes() {
    // Get current user
    const { data: { user } } = await this.supabase.client.auth.getUser();
    this.userId = user?.id || null;

    if (this.userId) {
      await this.loadLikesFromSupabase();
    } else {
      this.loadLikesFromLocalStorage();
    }

    // Listen for auth changes
    this.supabase.client.auth.onAuthStateChange(async (event, session) => {
      const newUserId = session?.user?.id || null;
      
      if (newUserId && newUserId !== this.userId) {
        // User logged in
        const localLikes = [...this.likes];
        this.userId = newUserId;
        await this.loadLikesFromSupabase();
        
        // Merge local likes
        for (const item of localLikes) {
          await this.addToLikes(item.product_id, item.quantity, item.color, item.size);
        }
      } else if (!newUserId && this.userId) {
        // User logged out
        this.userId = null;
        this.saveLikesToLocalStorage();
      }
    });
  }

  private async loadLikesFromSupabase() {
    if (!this.userId) return;

    try {
      const { data, error } = await this.supabase.client
        .from('liked_items')
        .select(`
          *,
          products (name, price, image, stock)
        `)
        .eq('user_id', this.userId);

      if (error) throw error;

      this.likes = data.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.products.name,
        quantity: 1,
        price: item.products.price,
        image: item.products.image,
        stock: item.products.stock
      }));

      this.updateLikesObservers();
    } catch (error) {
      console.error('Error loading likes from Supabase:', error);
    }
  }

  private loadLikesFromLocalStorage() {
    const savedLikes = localStorage.getItem('likes');
    if (savedLikes) {
      this.likes = JSON.parse(savedLikes);
      this.updateLikesObservers();
    }
  }

  private saveLikesToLocalStorage() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  async addToLikes(productId: number, quantity: number = 1, color?: string, size?: string): Promise<string> {
    // Get product - handle both sync and async cases
    let product = this.productService.getProductByIdSync(productId);
    
    if (!product) {
      product = await this.productService.getProductById(productId);
    }

    if (!product) return "❌ Item not found.";

    if (this.userId) {
      // Add to Supabase
      try {
        const existingItem = this.likes.find(
          item => item.product_id === productId
        );

        if (existingItem) {
          this.updateLikesObservers();
          return `💖 ${product.name} is already in your likes.`;
        }

        // Insert new item
        const { data, error } = await this.supabase.client
          .from('liked_items')
          .insert([{
            user_id: this.userId,
            product_id: productId
          }])
          .select()
          .single();

        if (error) throw error;

        this.likes.push({
          id: data.id,
          product_id: productId,
          name: product.name,
          quantity: 1,
          price: product.price,
          image: product.image,
          stock: product.stock
        });

        this.updateLikesObservers();
        return `💖 ${product.name} added to your likes.`;
      } catch (error) {
        console.error('Error adding to likes:', error);
        return "❌ Failed to add to likes.";
      }
    } else {
      // Add to localStorage for guest users
      const existingItem = this.likes.find(
        item => item.product_id === productId
      );

      if (existingItem) {
        return `💖 ${product.name} is already in your likes.`;
      }

      this.likes.push({
        product_id: productId,
        name: product.name,
        quantity: 1,
        price: product.price,
        image: product.image,
        stock: product.stock
      });

      this.saveLikesToLocalStorage();
      this.updateLikesObservers();
      return `💖 ${product.name} added to your likes.`;
    }
  }

  async removeFromLikes(productId: number, color?: string, size?: string): Promise<string> {
    const index = this.likes.findIndex(item => item.product_id === productId);

    if (index === -1) return "❌ Item not found in likes.";

    const item = this.likes[index];

    if (this.userId && item.id) {
      try {
        const { error } = await this.supabase.client
          .from('liked_items')
          .delete()
          .eq('id', item.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error removing from likes:', error);
        return "❌ Failed to remove from likes.";
      }
    }

    this.likes.splice(index, 1);

    if (!this.userId) {
      this.saveLikesToLocalStorage();
    }

    this.updateLikesObservers();
    return `❌ ${item.name} removed from likes.`;
  }

  clearLikes(): string {
    this.likes = [];
    
    if (this.userId) {
      this.supabase.client
        .from('liked_items')
        .delete()
        .eq('user_id', this.userId)
        .then(() => {
          console.log('Likes cleared from Supabase');
        });
    } else {
      localStorage.removeItem('likes');
    }
    
    this.updateLikesObservers();
    return "🗑️ All liked items cleared.";
  }

  getLikes(): LikeItem[] {
    return [...this.likes];
  }

  isInLikes(productId: number, color?: string, size?: string): boolean {
    return this.likes.some(item => item.product_id === productId);
  }

  getTotalLikes(): number {
    return this.likes.reduce((total, item) => total + item.quantity, 0);
  }

  private updateLikesObservers() {
    this.likesUpdate.next([...this.likes]);
  }
}