import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../notification/notification';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Notification, RouterLink],
  template: `
    <header class="navbar">
      <div class="logo">E<span>-shop</span></div>

      <nav class="nav-links">
        <a [routerLink]="['/']
        ">Home</a>
        <a href="#">Products</a>
        <a href="#">Service</a>
        <a href="#">Contact</a>
      </nav>

      <div class="icons">
        <i class="fa fa-search"></i>
        <i class="fa fa-heart"></i>
        <div class="cart-icon">
          <i class="fa fa-shopping-cart" [routerLink]="['/cart']">

          </i>
          <app-notification></app-notification>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 50px;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: 'Poppins', sans-serif;
    }
    .logo {
      font-size: 26px;
      font-weight: bold;
      color: #000;
    }
    .logo span { color: #a9b5ebff; }
    .nav-links {
      display: flex;
      gap: 30px;
    }
    .nav-links a {
      text-decoration: none;
      color: #333;
      font-weight: 600;
    }
    .nav-links a:hover { color: #e91e63; }
    .icons i {
      margin-left: 20px;
      font-size: 18px;
      color: #333;
      cursor: pointer;
    }
    .icons i:hover { color: #e91e63; }
    .cart-icon {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
    `,
  ],
})
export class HeaderComponent { }