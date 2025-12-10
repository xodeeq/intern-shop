import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.services';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, CapitalizeAndSpacePipe, RouterLink],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <footer class="footer">
      <div class="footer-container">
        
        <!-- Brand Section -->
        <div class="footer-section footer-brand">
          <h2 class="brand-name"><span class="highlight">E</span>-shop</h2>
          <p class="description">Your one-stop shop for quality products at amazing prices.</p>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#" (click)="scrollToSection('about')">About us</a></li>
            <li><a href="#" (click)="scrollToSection('products')">Products</a></li>
            <li><a href="#" (click)="scrollToSection('contact')">Contact</a></li>
            <li><a href="#" (click)="scrollToSection('faq')">FAQ</a></li>
            <li><a [routerLink]="['/cart']">Shopping Cart</a></li>
          </ul>
        </div>

        <!-- Categories Section -->
        <div class="footer-section">
          <h3>Categories</h3>
          <ul>
            <li *ngFor="let category of categories">
              <a href="#" (click)="onCategoryClick($event, category)">
                {{ category | capitalizeAndSpace }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Customer Service Section -->
        <div class="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="footer-section">
          <h3>Contact Us</h3>
          <div class="contact-info">
            <p><i class="fa fa-phone"></i> +234 812 345 6789</p>
            <p><i class="fa fa-envelope"></i> eshop@gmail.com</p>
            <p><i class="fa fa-map-marker-alt"></i> 123 Main Street, Lagos, Nigeria</p>
          </div>
        </div>

      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 E-shop. All rights reserved. | Designed by Opakunle Kingsley Gboyega</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2b2d42 0%, #1a1b2e 100%);
      color: #eee;
      padding: 50px 20px 20px;
      font-family: 'Poppins', sans-serif;
      margin-top: 50px;
    }

    .footer-container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 30px;
      max-width: 1400px;
      margin: 0 auto;
      padding-bottom: 30px;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .brand-name {
      font-size: 26px;
      margin: 0 0 8px 0;
      font-weight: 700;
      color: #fff;
    }

    .highlight {
      color: #e63946;
    }

    .description {
      color: #b8b9be;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }

    .social-icons {
      display: flex;
      gap: 10px;
      margin-top: 8px;
    }

    .social-icons a {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      font-size: 16px;
    }

    .social-icons a:hover {
      background: #e63946;
      transform: translateY(-3px);
    }

    .footer-section h3 {
      font-size: 16px;
      margin-bottom: 15px;
      color: #fff;
      font-weight: 600;
      position: relative;
      padding-bottom: 8px;
    }

    .footer-section h3::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 35px;
      height: 2px;
      background: #e63946;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section li {
      margin-bottom: 10px;
    }

    .footer-section a {
      color: #b8b9be;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .footer-section a:hover {
      color: #e63946;
      padding-left: 5px;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .contact-info p {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #b8b9be;
      font-size: 13px;
      margin: 0;
      line-height: 1.5;
    }

    .contact-info i {
      color: #e63946;
      margin-top: 2px;
      font-size: 14px;
      min-width: 14px;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 25px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #888;
      font-size: 13px;
      max-width: 1400px;
      margin: 0 auto;
    }

    /* Responsive Styles */
    @media (max-width: 1200px) {
      .footer-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
      }

      .footer-brand {
        grid-column: span 3;
        text-align: center;
        align-items: center;
      }

      .footer-section h3::after {
        left: 50%;
        transform: translateX(-50%);
      }

      .footer-section {
        text-align: center;
      }

      .social-icons {
        justify-content: center;
      }

      .contact-info p {
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding: 40px 15px 20px;
      }

      .footer-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
      }

      .footer-brand {
        grid-column: span 2;
      }
    }

    @media (max-width: 480px) {
      .footer-container {
        grid-template-columns: 1fr;
        gap: 25px;
      }

      .footer-brand,
      .footer-section {
        grid-column: span 1;
      }

      .brand-name {
        font-size: 22px;
      }

      .footer-section h3 {
        font-size: 15px;
      }

      .footer-section a,
      .contact-info p {
        font-size: 12px;
      }

      .footer-bottom {
        font-size: 12px;
      }
    }
  `]
})
export class Footer implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    // Subscribe to products to get categories
    this.productService.products$.subscribe(products => {
      if (products.length > 0) {
        this.categories = this.productService.getCategories();
        console.log('📂 Footer categories loaded:', this.categories);
      }
    });
    
    // Also trigger initial load if products are already available
    if (this.productService.getProduct().length > 0) {
      this.categories = this.productService.getCategories();
    }
  }

  onCategoryClick(event: Event, category: string) {
    event.preventDefault();
    
    console.log('Footer category clicked:', category);
    
    // Navigate to home with category filter
    this.router.navigate(['/'], {
      queryParams: { category: category }
    }).then(() => {
      // Emit the category for the product list component
      this.categorySelected.emit(category);
      
      // Scroll to products section
      setTimeout(() => {
        this.scrollToSection('products');
      }, 100);
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If section doesn't exist, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}