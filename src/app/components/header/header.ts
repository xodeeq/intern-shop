import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../notification/notification';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Notification, RouterLink],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <footer class="footer">
    <header class="navbar">
      <div class="logo">E<span>-shop</span></div>

      <nav class="nav-links">
        <a [routerLink]="['/']
        "><i class="fa-regular fa-house" style="font-size:22px;"></i> Home</a>
        <a href="#"> <i class="fa-solid fa-basket-shopping" style="font-size:22px;"></i> Products</a>
        <a href="#"> <i class="fa-solid fa-gear" style=" font-size:22px;"></i> Service</a>
        <a href="#"> <i class="fa-solid fa-comment-dots"  style=" font-size:22px;"></i> Contact</a>
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
      transition: 0.3s all ease;
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