import { Component, OnInit } from '@angular/core';
import { LikeItem, LikesService } from '../../services/likes.service';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';
@Component({
  selector: 'app-likes',
  imports: [NgForOf, CurrencyPipe, CapitalizeAndSpacePipe],
  template: `
    <div class="likeItem-section">
      <h2 class="like-header">Liked Products</h2>
      <div *ngFor="let item of likedProducts" class="liked-item">
        <img [src]="item.image" alt="{{item.name}}" class="liked-image" />

        <div class="liked-details">
          <h3 class="liked-name">Name: {{ item.name | capitalizeAndSpace}}</h3>
          <p class="liked-price">Price: {{ item.price | currency:'NGN':'symbol-narrow':'1.2-2' }}</p>
          <p class="liked-stock"> Stock : {{ item.stock }}</p>
          <button (click)="remove(item)" class="remove-button">Remove</button>
        </div>
      </div>

    </div>
  `,
  styles: `
    .likeItem-section {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .like-header {
      text-align: center;
      margin-bottom: 20px;
      font-size: 24px;
      color: #333;
    }
    .liked-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;  
      padding: 15px 0;
    }
    .liked-image {  
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
      margin-right: 20px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    .liked-details {
      flex: 1;
    }
    .liked-name {
      font-size: 20px;
      margin: 0 0 10px;
      color: #333;
    }
    .liked-price {
      font-size: 18px;
      color: #e91e63;
      margin: 0 0 8px;
      font-weight: bold;
    }
    .liked-quantity {
      font-size: 16px;
      color: #666;
      margin: 0 0 12px;
    }
    .remove-button {
      background-color: #ff4d4f;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .remove-button:hover {
      background-color: #d9363e;
    }
    

  `
})
export class LikedProduct implements OnInit {
  likedProducts: LikeItem[] = [];

  constructor(public likeService: LikesService) { }

  ngOnInit(): void {
    this.likeService.likesUpdates$.subscribe(likes => {
      this.likedProducts = likes;
    });
  }

  remove(item: LikeItem) {
  if (item.id === undefined) return;   // <-- avoids crash
  this.likeService.removeFromLikes(item.id, item.color, item.size);
}

}
