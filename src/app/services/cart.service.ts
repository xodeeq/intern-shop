// import { Injectable } from '@angular/core';
// import { ProductService } from './product.services';
// import { BehaviorSubject } from 'rxjs';
// import { CapitalizeAndSpacePipe } from '../pipes/capitalize-and-space-pipe';



// export interface CartItem { id: number; name: string; quantity: number; price: number; image: string; color?: string; size?: string; }



// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cart: CartItem[] = [];


//   totalPrice: number = 0;

//   private discount = 0;


//   private cartUpdate = new BehaviorSubject<CartItem[]>([]);
//   cartUpdates$ = this.cartUpdate.asObservable();

//   private totalPriceUpdate = new BehaviorSubject<number>(0);
//   totalPriceUpdates$ = this.totalPriceUpdate.asObservable();

//   private totalItemsUpdate = new BehaviorSubject<number>(0);
//   totalItemsUpdates$ = this.totalItemsUpdate.asObservable();





//   constructor(private productService: ProductService) { }





//   addToCart(productId: number, quantity: number, color?: string, size?: string): string {


//     const product = this.productService.getProductById(productId);

//     if (!product) return "❌ Item not found.";
//     if (quantity > product.stock) {
//       return `❌ Sorry, we only have ${product.stock} ${productId}(s) in stock.`;
//     }

//     const existingItem = this.cart.find(item => item.id === product.id && item.color === color && item.size === size);

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       this.cart.push({ id: product.id, name: product.name, quantity, price: product.price, image: product.image, color, size });
//     }

//     product.stock -= quantity;
//     this.totalPrice += product.price * quantity;

//     this.updateCartObservers();
//     this.totalPriceUpdate.next(this.totalPrice);

//     return `✅ Added ${quantity} ${product.name}(s) - ${color || ''} ${size || ''} to the cart.`;


//   }

//   updateCart(productId: number, newQuantity: number, color?: string, size?: string) {
//     const product = this.productService.getProductById(productId);
//     if (!product) return "❌ Item not found.";

//     const item = this.cart.find(c => c.id === product.id && c.color === color && c.size === size);
//     if (!item) return "❌ Item not found in cart.";

//     const difference = newQuantity - item.quantity;

//     if (difference > 0) {
//       if (difference > product.stock) {
//         return `❌ Sorry, only ${product.stock} left in stock.`;
//       }
//       product.stock -= difference;
//       this.totalPrice += product.price * difference;
//     } else {
//       product.stock += Math.abs(difference);
//       this.totalPrice -= product.price * Math.abs(difference);
//     }

//     item.quantity = newQuantity;
//     this.updateCartObservers();

//     return `✅ Updated ${product.name} (${color || ''} ${size || ''}) quantity to ${newQuantity}.`;
//   }

//   removeFromCart(productId: number, color?: string, size?: string) {
//     const product = this.productService.getProductById(productId);
//     if (!product) return "❌ Item not found.";

//     const index = this.cart.findIndex(c => c.id === product.id && c.color === color && c.size === size);
//     if (index === -1) return "❌ Item not found in cart.";

//     const item = this.cart[index];
//     product.stock += item.quantity;
//     this.totalPrice -= item.price * item.quantity;

//     this.cart.splice(index, 1);
//     this.updateCartObservers();

//     return `✅ Removed ${product.name} (${color || ''} ${size || ''}) from the cart.`;
//   }

//   getCart() {
//     return this.cart;
//   }



//   getSubTotalCartPrice() {
//     return this.totalPrice;
//   }

//   getTotalItems() {
//     return this.cart.reduce((sum, item) => sum + item.quantity, 0);

//     // or
//     // let total = 0;
//     // let i = 0;
//     // while (i < this.cart.length) {
//     //   total += this.cart[i].quantity;
//     //   i++;
//     // }
//     // return total;

//   }

//   private updateCartObservers() {
//     this.cartUpdate.next([...this.cart]);
//     this.totalPriceUpdate.next(this.totalPrice);
//     this.totalItemsUpdate.next(this.getTotalItems());
//   }

//   getDiscount(): number {
//     return this.discount || 0;
//   }



// }


import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ProductService } from './product.services';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id?: number;
  user_id?: string;
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  color?: string;
  size?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private totalPrice: number = 0;
  private discount = 0;
  private userId: string | null = null;

  private cartUpdate = new BehaviorSubject<CartItem[]>([]);
  cartUpdates$ = this.cartUpdate.asObservable();

  private totalPriceUpdate = new BehaviorSubject<number>(0);
  totalPriceUpdates$ = this.totalPriceUpdate.asObservable();

  private totalItemsUpdate = new BehaviorSubject<number>(0);
  totalItemsUpdates$ = this.totalItemsUpdate.asObservable();

  constructor(
    private supabase: SupabaseService,
    private productService: ProductService
  ) {
    console.log('🛒 CartService initialized');
    this.initializeCart();
  }

  private async initializeCart() {
    console.log('🔧 Initializing cart...');
    
    // Get current user
    const { data: { user } } = await this.supabase.client.auth.getUser();
    this.userId = user?.id || null;

    if (this.userId) {
      console.log(`👤 User logged in: ${user?.email || 'Unknown'}`);
      console.log(`🆔 User ID: ${this.userId}`);
      await this.loadCartFromSupabase();
    } else {
      console.log('👤 Guest user - using localStorage');
      this.loadCartFromLocalStorage();
    }

    // Listen for auth changes
    this.supabase.client.auth.onAuthStateChange(async (event, session) => {
      console.log(`🔐 Auth state changed: ${event}`);
      
      const newUserId = session?.user?.id || null;
      
      if (newUserId && newUserId !== this.userId) {
        console.log('✅ User logged in - migrating cart to Supabase');
        const localCart = [...this.cart];
        this.userId = newUserId;
        await this.loadCartFromSupabase();
        
        // Merge local cart with user's cart
        for (const item of localCart) {
          await this.addToCart(item.product_id, item.quantity, item.color, item.size);
        }
      } else if (!newUserId && this.userId) {
        console.log('👋 User logged out - switching to localStorage');
        this.userId = null;
        this.saveCartToLocalStorage();
      }
    });
  }

  private async loadCartFromSupabase() {
    if (!this.userId) return;

    console.log('📥 Loading cart from Supabase...');
    
    try {
      const { data, error } = await this.supabase.client
        .from('cart_items')
        .select(`
          *,
          products (name, price, image, stock)
        `)
        .eq('user_id', this.userId);

      if (error) {
        console.error('❌ Failed to load cart:', error);
        throw error;
      }

      console.log(`✅ Cart loaded: ${data?.length || 0} items`);

      this.cart = data.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.products.name,
        quantity: item.quantity,
        price: item.products.price,
        image: item.products.image,
        color: item.color,
        size: item.size
      }));

      this.calculateTotalPrice();
      this.updateCartObservers();
      
      console.log(`💰 Cart total: ₦${this.totalPrice.toFixed(2)}`);
    } catch (error) {
      console.error('Error loading cart from Supabase:', error);
    }
  }

  private loadCartFromLocalStorage() {
    console.log('📥 Loading cart from localStorage...');
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      console.log(`✅ Found ${this.cart.length} items in localStorage`);
      this.calculateTotalPrice();
      this.updateCartObservers();
    } else {
      console.log('📭 No saved cart found in localStorage');
    }
  }

  private saveCartToLocalStorage() {
    console.log(`💾 Saving ${this.cart.length} items to localStorage`);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  async addToCart(productId: number, quantity: number, color?: string, size?: string): Promise<string> {
    console.log(`➕ Adding to cart: Product ${productId}, Qty: ${quantity}, Color: ${color}, Size: ${size}`);
    
    const product = await this.productService.getProductById(productId);
    
    if (!product) {
      console.error(`❌ Product ${productId} not found`);
      return "❌ Item not found.";
    }
    
    if (quantity > product.stock) {
      console.warn(`⚠️ Insufficient stock: requested ${quantity}, available ${product.stock}`);
      return `❌ Sorry, we only have ${product.stock} ${product.name}(s) in stock.`;
    }

    if (this.userId) {
      console.log('💾 Adding to Supabase cart...');
      
      try {
        const existingItem = this.cart.find(
          item => item.product_id === productId && item.color === color && item.size === size
        );

        if (existingItem) {
          console.log(`🔄 Updating existing cart item (current qty: ${existingItem.quantity})`);
          const newQuantity = existingItem.quantity + quantity;
          
          const { error } = await this.supabase.client
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('id', existingItem.id!);

          if (error) throw error;
          
          existingItem.quantity = newQuantity;
          console.log(`✅ Updated quantity to ${newQuantity}`);
        } else {
          console.log('📝 Creating new cart item...');
          
          const { data, error } = await this.supabase.client
            .from('cart_items')
            .insert([{
              user_id: this.userId,
              product_id: productId,
              quantity,
              color,
              size
            }])
            .select()
            .single();

          if (error) throw error;

          this.cart.push({
            id: data.id,
            product_id: productId,
            name: product.name,
            quantity,
            price: product.price,
            image: product.image,
            color,
            size
          });
          
          console.log(`✅ New cart item created with ID: ${data.id}`);
        }

        // Update product stock
        await this.productService.updateStock(productId, product.stock - quantity);
        
        this.totalPrice += product.price * quantity;
        this.updateCartObservers();

        console.log(`✅ Cart updated successfully. Total: ₦${this.totalPrice.toFixed(2)}`);
        return `✅ Added ${quantity} ${product.name}(s) to the cart.`;
      } catch (error) {
        console.error('❌ Error adding to cart:', error);
        return "❌ Failed to add item to cart.";
      }
    } else {
      console.log('💾 Adding to localStorage cart...');
      
      const existingItem = this.cart.find(
        item => item.product_id === product.id && item.color === color && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        console.log(`✅ Updated quantity to ${existingItem.quantity}`);
      } else {
        this.cart.push({
          product_id: product.id,
          name: product.name,
          quantity,
          price: product.price,
          image: product.image,
          color,
          size
        });
        console.log(`✅ Added new item to cart`);
      }

      this.totalPrice += product.price * quantity;
      this.saveCartToLocalStorage();
      this.updateCartObservers();

      console.log(`✅ Cart updated. Total: ₦${this.totalPrice.toFixed(2)}`);
      return `✅ Added ${quantity} ${product.name}(s) to the cart.`;
    }
  }

  async updateCart(productId: number, newQuantity: number, color?: string, size?: string): Promise<string> {
    console.log(`🔄 Updating cart: Product ${productId}, New Qty: ${newQuantity}, Color: ${color}, Size: ${size}`);
    
    const product = await this.productService.getProductById(productId);
    if (!product) {
      console.error(`❌ Product ${productId} not found`);
      return "❌ Item not found.";
    }

    const item = this.cart.find(
      c => c.product_id === productId && c.color === color && c.size === size
    );
    
    if (!item) {
      console.warn('⚠️ Item not found in cart');
      return "❌ Item not found in cart.";
    }

    const difference = newQuantity - item.quantity;
    console.log(`📊 Quantity change: ${item.quantity} → ${newQuantity} (${difference > 0 ? '+' : ''}${difference})`);

    if (difference > 0 && difference > product.stock) {
      console.warn(`⚠️ Insufficient stock: need ${difference}, available ${product.stock}`);
      return `❌ Sorry, only ${product.stock} left in stock.`;
    }

    if (this.userId && item.id) {
      try {
        console.log('💾 Updating quantity in Supabase...');
        const { error } = await this.supabase.client
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', item.id);

        if (error) throw error;
        console.log('✅ Quantity updated in Supabase');
      } catch (error) {
        console.error('❌ Error updating cart:', error);
        return "❌ Failed to update cart.";
      }
    }

    // Update stock
    if (difference > 0) {
      await this.productService.updateStock(productId, product.stock - difference);
      this.totalPrice += product.price * difference;
      console.log(`📦 Stock decreased by ${difference}`);
    } else {
      await this.productService.updateStock(productId, product.stock + Math.abs(difference));
      this.totalPrice -= product.price * Math.abs(difference);
      console.log(`📦 Stock increased by ${Math.abs(difference)}`);
    }

    item.quantity = newQuantity;
    
    if (!this.userId) {
      this.saveCartToLocalStorage();
    }
    
    this.updateCartObservers();
    console.log(`✅ Cart updated. New total: ₦${this.totalPrice.toFixed(2)}`);
    return `✅ Updated ${product.name} quantity to ${newQuantity}.`;
  }

  async removeFromCart(productId: number, color?: string, size?: string): Promise<string> {
    console.log(`🗑️ Removing from cart: Product ${productId}, Color: ${color}, Size: ${size}`);
    
    const index = this.cart.findIndex(
      c => c.product_id === productId && c.color === color && c.size === size
    );
    
    if (index === -1) {
      console.warn('⚠️ Item not found in cart');
      return "❌ Item not found in cart.";
    }

    const item = this.cart[index];
    console.log(`📦 Removing: ${item.name} (${item.quantity} items)`);

    if (this.userId && item.id) {
      try {
        const { error } = await this.supabase.client
          .from('cart_items')
          .delete()
          .eq('id', item.id);

        if (error) throw error;
        console.log('✅ Item deleted from Supabase');
      } catch (error) {
        console.error('❌ Error removing from cart:', error);
        return "❌ Failed to remove item.";
      }
    }

    const product = await this.productService.getProductById(productId);
    if (product) {
      await this.productService.updateStock(productId, product.stock + item.quantity);
    }
    
    this.totalPrice -= item.price * item.quantity;
    this.cart.splice(index, 1);

    if (!this.userId) {
      this.saveCartToLocalStorage();
    }
    
    this.updateCartObservers();
    console.log(`✅ Item removed. New total: ₦${this.totalPrice.toFixed(2)}`);
    return `✅ Removed ${item.name} from the cart.`;
  }

  async clearCart(): Promise<void> {
    console.log('🗑️ Clearing entire cart...');
    
    if (this.userId) {
      try {
        const { error } = await this.supabase.client
          .from('cart_items')
          .delete()
          .eq('user_id', this.userId);

        if (error) throw error;
        console.log('✅ Cart cleared from Supabase');
      } catch (error) {
        console.error('❌ Error clearing cart:', error);
      }
    } else {
      localStorage.removeItem('cart');
      console.log('✅ Cart cleared from localStorage');
    }

    this.cart = [];
    this.totalPrice = 0;
    this.updateCartObservers();
    console.log('✅ Cart is now empty');
  }

  getCart(): CartItem[] {
    console.log(`📋 getCart() called - ${this.cart.length} items`);
    return [...this.cart];
  }

  getSubTotalCartPrice(): number {
    console.log(`💰 Subtotal: ₦${this.totalPrice.toFixed(2)}`);
    return this.totalPrice;
  }

  getTotalItems(): number {
    const total = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log(`📊 Total items: ${total}`);
    return total;
  }

  private calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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