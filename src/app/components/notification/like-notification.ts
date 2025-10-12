import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LikesService } from '../../services/likes.service';

@Component({
  selector: 'app-like-notification',
  imports: [NgIf],
  template: `
    <div class="like-notification">
      <span class="badge" *ngIf="totalLikes() > 0">{{totalLikes()}}</span>
    </div>
  `,
  styles: `
      .like-notification {
  position: relative;
  display: inline-block;
}
.badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #ff3b3b;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 6px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


  `
})
export class LikeNotification {

  constructor(private likeservice: LikesService) { }

  totalLikes() {
    return this.likeservice.getTotalLikes();
  }
}
