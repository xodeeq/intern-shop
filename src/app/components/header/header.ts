// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Notification } from '../notification/notification';
// import { RouterLink } from '@angular/router';
// import { LikeNotification } from '../notification/like-notification';



// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule, Notification, RouterLink, LikeNotification],
//   template: `
//   <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
//     <footer class="footer">
//     <header class="navbar">
//       <div class="logo">E<span>-shop</span></div>

//       <nav class="nav-links">
//         <a [routerLink]="['/']
//         "><i class="fa-regular fa-house" style="font-size:22px;"></i> Home</a>
//         <a href="#"> <i class="fa-solid fa-basket-shopping" style="font-size:22px;"></i> Products</a>
//         <a href="#"> <i class="fa-solid fa-gear" style=" font-size:22px;"></i> Service</a>
//         <a href="#"> <i class="fa-solid fa-comment-dots"  style=" font-size:22px;"></i> Contact</a>
//       </nav>

//       <div class="icons">
//         <input type="text" placeholder="Search Products..." class="search-input" />
//         <i class="fa fa-search"></i>
    
//         <i class="fa fa-heart" [routerLink]= "['/likes']">
//           <app-like-notification></app-like-notification>
//         </i>
//         <div class="cart-icon">
//           <i class="fa fa-shopping-cart" [routerLink]="['/cart']">

//           </i>
//           <app-notification></app-notification>
//         </div>
//       </div>
//     </header>
//   `,
//   styles: [
//     `
//       .navbar {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 15px 50px;
//       background: #fff;
//       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//       font-family: 'Poppins', sans-serif;
//     }
//     .logo {
//       font-size: 26px;
//       font-weight: bold;
//       color: #000;
//     }
//     .logo span { color: #a9b5ebff; }
//     .nav-links {
//       display: flex;
//       gap: 30px;
//     }
//     .nav-links a {
//       text-decoration: none;
//       color: #333;
//       font-weight: 600;
//       transition: 0.3s all ease;
//     }
//     .nav-links a:hover { color: #e91e63; }
//     .icons i {
//       margin-left: 20px;
//       font-size: 18px;
//       color: #333;
//       cursor: pointer;
//     }
//     .icons i:hover { color: #e91e63; }
//     .cart-icon {
//       position: relative;
//       display: inline-block;
//       cursor: pointer;
//     }
//     .search-input {
//       padding: 8px 12px;
//       border: 2px solid #ccc; 
//       border-radius: 4px;
//       font-size: 14px;
//       width: 200px;
//       transition: width 0.3s ease;
//     }
//     .search-input:focus {
//       width: 300px;
//       outline: none;
//       border-color: #007bff;
//       border-radius: 4px;
//     }
//     .search-input::placeholder { 
//       color: #999;
//       font-size: 14px;
//       font-style: italic;
//     }
    
    
//     `,
//   ],
// })
// export class HeaderComponent { }



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../notification/notification';
import { RouterLink } from '@angular/router';
import { LikeNotification } from '../notification/like-notification';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Notification, RouterLink, LikeNotification],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <header class="navbar">
      <!-- Logo -->
      <div class="logo">E<span>-shop</span></div>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" (click)="toggleMobileMenu()" [class.active]="isMobileMenuOpen">
        <i class="fa" [class.fa-bars]="!isMobileMenuOpen" [class.fa-times]="isMobileMenuOpen"></i>
      </button>

      <!-- Navigation Links -->
      <nav class="nav-links" [class.mobile-open]="isMobileMenuOpen">
        <a [routerLink]="['/']" (click)="closeMobileMenu()">
          <i class="fa-regular fa-house"></i> 
          <span>Home</span>
        </a>
        <a href="#" (click)="closeMobileMenu()">
          <i class="fa-solid fa-basket-shopping"></i> 
          <span>Products</span>
        </a>
        <a href="#" (click)="closeMobileMenu()">
          <i class="fa-solid fa-gear"></i> 
          <span>Service</span>
        </a>
        <a href="#" (click)="closeMobileMenu()">
          <i class="fa-solid fa-comment-dots"></i> 
          <span>Contact</span>
        </a>
      </nav>

      <!-- Icons Section -->
      <div class="icons" [class.mobile-open]="isMobileMenuOpen">
        <div class="search-container">
          <input type="text" placeholder="Search Products..." class="search-input" />
          <i class="fa fa-search search-icon"></i>
        </div>
    
        <i class="fa fa-heart icon-btn" [routerLink]="['/likes']" (click)="closeMobileMenu()">
          <app-like-notification></app-like-notification>
        </i>
        
        <div class="cart-icon">
          <i class="fa fa-shopping-cart icon-btn" [routerLink]="['/cart']" (click)="closeMobileMenu()"></i>
          <app-notification></app-notification>
        </div>
      </div>
    </header>
  `,
  styles: [`
    /* Base Styles */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 50px;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: 'Poppins', sans-serif;
      position: relative;
      z-index: 1000;
    }

    .logo {
      font-size: 26px;
      font-weight: bold;
      color: #000;
      z-index: 1001;
    }

    .logo span {
      color: #a9b5ebff;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      color: #333;
      z-index: 1001;
    }

    .mobile-menu-toggle:hover {
      color: #e91e63;
    }

    /* Navigation Links */
    .nav-links {
      display: flex;
      gap: 30px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: #333;
      font-weight: 600;
      transition: 0.3s all ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-links a i {
      font-size: 18px;
    }

    .nav-links a:hover {
      color: #e91e63;
    }

    /* Icons Section */
    .icons {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .icon-btn {
      font-size: 20px;
      color: #333;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .icon-btn:hover {
      color: #e91e63;
    }

    .cart-icon {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    /* Search Container */
    .search-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      padding: 8px 35px 8px 12px;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      width: 200px;
      transition: width 0.3s ease, border-color 0.3s ease;
    }

    .search-input:focus {
      width: 250px;
      outline: none;
      border-color: #007bff;
    }

    .search-input::placeholder {
      color: #999;
      font-size: 14px;
      font-style: italic;
    }

    .search-icon {
      position: absolute;
      right: 10px;
      color: #666;
      pointer-events: none;
    }

    /* Tablet Styles (768px - 1024px) */
    @media (max-width: 1024px) {
      .navbar {
        padding: 15px 30px;
      }

      .nav-links {
        gap: 20px;
      }

      .nav-links a span {
        display: none;
      }

      .search-input {
        width: 150px;
      }

      .search-input:focus {
        width: 200px;
      }
    }

    /* Mobile Styles (< 768px) */
    @media (max-width: 768px) {
      .navbar {
        padding: 15px 20px;
        flex-wrap: wrap;
      }

      .mobile-menu-toggle {
        display: block;
      }

      /* Hide nav and icons by default on mobile */
      .nav-links {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 80%;
        max-width: 300px;
        height: calc(100vh - 70px);
        background: #fff;
        flex-direction: column;
        align-items: flex-start;
        padding: 30px 20px;
        gap: 20px;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        transition: left 0.3s ease;
        z-index: 999;
      }

      .nav-links.mobile-open {
        left: 0;
      }

      .nav-links a {
        width: 100%;
        padding: 12px 0;
        font-size: 16px;
        border-bottom: 1px solid #eee;
      }

      .nav-links a span {
        display: inline;
      }

      /* Icons for mobile */
      .icons {
        position: fixed;
        bottom: -100%;
        left: 0;
        right: 0;
        background: #fff;
        padding: 15px 20px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        justify-content: space-around;
        transition: bottom 0.3s ease;
        z-index: 999;
        flex-wrap: wrap;
        gap: 15px;
      }

      .icons.mobile-open {
        bottom: 0;
      }

      .search-container {
        width: 100%;
        order: -1;
      }

      .search-input {
        width: 100%;
      }

      .search-input:focus {
        width: 100%;
      }

      /* Overlay when menu is open */
      .navbar::before {
        content: '';
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 998;
      }

      .mobile-menu-toggle.active ~ .nav-links::before {
        opacity: 1;
        visibility: visible;
      }
    }

    /* Small Mobile (< 480px) */
    @media (max-width: 480px) {
      .logo {
        font-size: 22px;
      }

      .navbar {
        padding: 12px 15px;
      }

      .nav-links {
        width: 85%;
        padding: 20px 15px;
      }

      .icon-btn {
        font-size: 18px;
      }
    }
  `]
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}