// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { CartService } from '../../services/cart.service';
// import { Product } from '../../services/product.services';
// import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';
// import { RouterLink } from '@angular/router';
// import { LikesService } from '../../services/likes.service';


// @Component({
//   selector: 'app-product-card',
//   standalone: true,
//   imports: [CommonModule, CapitalizeAndSpacePipe, RouterLink],
//   template: `
//     <div class="product-card">
//       <h3>{{ product.name | capitalizeAndSpace }}</h3>
//       <img [src]="product.image" alt="{{ product.name }}" />
      
//        <div class= "details">
//         <p>Brand: {{ product.brand }}</p>
//         <p>Price: {{ product.price | currency:'NGN' }}</p>
//         <p>Stock: {{ product.stock }}</p>
//        </div>
//       <button (click)="addToCart()">Add to Cart</button>

//       <div class="favourite">
//         <a [routerLink]="['/product', product.category, product.name, product.id]"
//           [queryParams]="{rating: product.rating, reviews: product.review}" class="product-details">View Details</a>
//         <i 
//           class="fa-heart love-icon"
//           [class.fa-solid]="likesService.isInLikes(product.id)"
//           [class.fa-regular]="!likesService.isInLikes(product.id)"
//           (click)="toggleLike(product)">
//         </i>
//       </div>

//     </div>
//   `,
//   styles: [
//     `
//       .product-card {
//         background: white;
//         border: 1px solid #eee;
//         border-radius: 8px;
//         padding: 16px;
//         text-align: center;
//         box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//       }

      

//       .product-card img {
//         width: 100%;
//         height: 200px;
//         object-fit: cover;
//         border-radius: 6px;
//         margin: 12px 0;
//       }

//       .product-card h3 {
//         font-size: 20px;
//         margin: 0 0 10px;
//         font-weight: 600;
//       }


//       .price {
//         font-size: 20px;
//         font-weight: bold;
//         margin: 10px 0 15px;
//         color: #333;
//       }

//       .product-card button {
//         background-color: #007bff;
//         color: white;
//         border: none;
//         padding: 10px 16px;
//         border-radius: 4px;
//         cursor: pointer;
//         font-size: 14px;
//         width: 100%;
//       }

//       .product-card button:hover {
//         background-color: #0056b3;
//       }

//       .favourite{
//         display: flex;
//         gap: 100px;
//         align-items: center;
//         justify-items: space-between;
//         margin-top: 5px;
//         margin-left: 20px
//       }

//       .product-details{
//         text-decoration: none;
//         transition: 0.3s all ease;
//       }

//       .product-details:hover{
//         color: #e91e63;
//       }

//       .love-icon{
//         font-size: 17px;
//         color: #bbb;
//         cursor: pointer;
//         transition: color 0.3s ease, transform 0.2s ease;
//       }
//       .love-icon:hover {
//         color: #ff4d6d;
//         transform: scale(1.2);
//       }
//       .love-icon.active {
//         color: #ff4d6d;
//       }
//     `,
//   ],
// })
// export class ProductCard {
//   @Input() product!: Product;

//   constructor(private cartService: CartService
//     , public likesService: LikesService
//   ) { }

//   addToCart() {
//     const result = this.cartService.addToCart(this.product.id, 1);
//     console.log(result);
//     alert(result);
//   }

//   toggleLike(product: any) {
//     if (this.likesService.isInLikes(product.id)) {
//       this.likesService.removeFromLikes(product.id);
//     } else {
//       this.likesService.addToLikes(product.id, 1);
//     }
//   }
// }
      


import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.services';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../services/likes.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CapitalizeAndSpacePipe, RouterLink],
  template: `
    <div class="product-card" [class.list-mode]="viewMode === 'list'">
      <div class="image-container">
        <img [src]="product.image" [alt]="product.name" class="product-image" />
        <div class="stock-badge" [class.low-stock]="product.stock < 10">
          {{ product.stock }} in stock
        </div>
      </div>

      <div class="product-info">
        <h3 class="product-name">{{ product.name | capitalizeAndSpace }}</h3>
        
        <div class="brand-category">
          <span class="brand">{{ product.brand }}</span>
          <span class="category">{{ product.category | capitalizeAndSpace }}</span>
        </div>

        <div class="rating" *ngIf="product.rating">
          <i class="fa fa-star"></i>
          <span>{{ product.rating }}</span>
          <span class="reviews" *ngIf="product.review">({{ product.review }})</span>
        </div>

        <p class="description" *ngIf="viewMode === 'list'">
          {{ product.description | slice:0:150 }}{{ product.description && product.description.length > 150 ? '...' : '' }}
        </p>

        <div class="price-section">
          <span class="price">{{ product.price | currency:'NGN':'symbol-narrow':'1.2-2' }}</span>
        </div>

        <div class="actions">
          <button class="add-to-cart-btn" (click)="addToCart()" [disabled]="product.stock === 0">
            <i class="fa fa-shopping-cart"></i>
            <span>{{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}</span>
          </button>

          <div class="secondary-actions">
            <a 
              [routerLink]="['/product', product.category, product.name, product.id]"
              [queryParams]="{rating: product.rating, reviews: product.review}" 
              class="details-link"
              title="View Details">
              <i class="fa fa-eye"></i>
              <span *ngIf="viewMode === 'list'">Details</span>
            </a>
            
            <button
              class="like-btn"
              [class.liked]="likesService.isInLikes(product.id)"
              (click)="toggleLike(product)"
              title="Add to Wishlist">
              <i 
                class="fa-heart"
                [class.fa-solid]="likesService.isInLikes(product.id)"
                [class.fa-regular]="!likesService.isInLikes(product.id)">
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Grid View (Default) */
    .product-card {
      background: white;
      border: 1px solid #eee;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    /* List View */
    .product-card.list-mode {
      flex-direction: row;
      height: auto;
    }

    /* Image Container */
    .image-container {
      position: relative;
      width: 100%;
      padding-top: 75%; /* 4:3 Aspect Ratio */
      overflow: hidden;
      background: #f5f5f5;
    }

    .list-mode .image-container {
      width: 200px;
      padding-top: 0;
      height: 200px;
      flex-shrink: 0;
    }

    .product-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image {
      transform: scale(1.05);
    }

    /* Stock Badge */
    .stock-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 123, 255, 0.9);
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .stock-badge.low-stock {
      background: rgba(255, 152, 0, 0.9);
    }

    /* Product Info */
    .product-info {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .list-mode .product-info {
      padding: 20px;
      justify-content: space-between;
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .list-mode .product-name {
      font-size: 20px;
      -webkit-line-clamp: 1;
    }

    /* Brand and Category */
    .brand-category {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .brand, .category {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      background: #f0f0f0;
      color: #666;
    }

    .brand {
      background: #e3f2fd;
      color: #1976d2;
    }

    /* Rating */
    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 14px;
      color: #666;
    }

    .rating i {
      color: #ffc107;
      font-size: 14px;
    }

    .reviews {
      color: #999;
      font-size: 12px;
    }

    /* Description (List View Only) */
    .description {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin: 0;
    }

    /* Price Section */
    .price-section {
      margin-top: auto;
    }

    .price {
      font-size: 22px;
      font-weight: 700;
      color: #e91e63;
    }

    .list-mode .price {
      font-size: 24px;
    }

    /* Actions */
    .actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .list-mode .actions {
      flex-direction: row;
      align-items: center;
      gap: 15px;
    }

    .add-to-cart-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background 0.3s ease;
      width: 100%;
    }

    .add-to-cart-btn:hover:not(:disabled) {
      background: #0056b3;
    }

    .add-to-cart-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .list-mode .add-to-cart-btn {
      width: auto;
      padding: 10px 24px;
    }

    .secondary-actions {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }

    .list-mode .secondary-actions {
      gap: 15px;
    }

    .details-link, .like-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      transition: all 0.3s ease;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      text-decoration: none;
      color: #666;
    }

    .list-mode .details-link,
    .list-mode .like-btn {
      flex: 0;
      padding: 10px 20px;
    }

    .details-link:hover {
      background: #f5f5f5;
      color: #007bff;
      border-color: #007bff;
    }

    .like-btn:hover {
      background: #fff0f5;
      color: #e91e63;
      border-color: #e91e63;
    }

    .like-btn.liked {
      background: #fff0f5;
      color: #e91e63;
      border-color: #e91e63;
    }

    .like-btn i {
      font-size: 16px;
    }

    /* Tablet Styles (768px - 1024px) */
    @media (max-width: 1024px) {
      .list-mode .image-container {
        width: 180px;
        height: 180px;
      }

      .list-mode .product-info {
        padding: 16px;
      }

      .list-mode .actions {
        flex-direction: column;
        gap: 10px;
      }

      .list-mode .add-to-cart-btn {
        width: 100%;
      }
    }

    /* Mobile Styles (< 768px) */
    @media (max-width: 768px) {
      .product-card.list-mode {
        flex-direction: column;
      }

      .list-mode .image-container {
        width: 100%;
        padding-top: 75%;
        height: auto;
      }

      .product-name {
        font-size: 16px;
      }

      .list-mode .product-name {
        font-size: 18px;
      }

      .price {
        font-size: 20px;
      }

      .add-to-cart-btn {
        padding: 10px 12px;
        font-size: 13px;
      }

      .list-mode .add-to-cart-btn {
        width: 100%;
      }

      .details-link span,
      .list-mode .details-link span {
        display: none;
      }

      .list-mode .secondary-actions {
        justify-content: space-between;
      }
    }

    /* Small Mobile (< 480px) */
    @media (max-width: 480px) {
      .product-info {
        padding: 12px;
        gap: 8px;
      }

      .product-name {
        font-size: 14px;
      }

      .price {
        font-size: 18px;
      }

      .add-to-cart-btn {
        padding: 8px 10px;
        font-size: 12px;
      }

      .add-to-cart-btn span {
        display: none;
      }

      .add-to-cart-btn i {
        margin: 0;
      }

      .brand, .category {
        font-size: 11px;
        padding: 3px 6px;
      }

      .stock-badge {
        font-size: 10px;
        padding: 3px 8px;
      }
    }
  `]
})
export class ProductCard {
  @Input() product!: Product;
  @Input() viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private cartService: CartService,
    public likesService: LikesService
  ) {}

  isAddingToCart = false;

  async addToCart() {
    if (this.isAddingToCart) return;
    
    this.isAddingToCart = true;
    try {
      const result = await this.cartService.addToCart(this.product.id, 1);
      alert(result);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('❌ Failed to add to cart');
    } finally {
      this.isAddingToCart = false;
    }
  }

  async toggleLike(product: Product) {
    try {
      if (this.likesService.isInLikes(product.id)) {
        await this.likesService.removeFromLikes(product.id);
      } else {
        await this.likesService.addToLikes(product.id, 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }
}