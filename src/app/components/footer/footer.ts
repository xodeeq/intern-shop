import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.services';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, CapitalizeAndSpacePipe],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <footer class="footer">
      <div class="footer-container">

        
        <div class="footer-brand">
          <h2 class="brand-name"><span class="highlight">E</span>-shop</h2>
          <div class="social-icons">
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
          <p>Designed © Kingsley Opakunle</p>
        </div>


        <div class="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Location</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        
        <div class="footer-section">
          <h3>Categories</h3>
          <ul>
            <li *ngFor="let category of categories">
              <a href="#"  (click)="onCategoryClick(category)">{{ category | capitalizeAndSpace }}</a>
            </li>
          </ul>
        </div>

        
        <div class="footer-section">
          <h3>Contact</h3>
          <p>📞 +234 812 345 6789</p>
          <p>📧 eshop@gmail.com</p>
          <p>🏠 123 Main Street, Lagos, Nigeria</p>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #2b2d42;
      color: #eee;
      padding: 50px 20px;
      font-family: 'Poppins', sans-serif;
    }

    .footer-container {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      max-width: 1100px;
      margin: 0 auto;
    }

    .footer-brand {
      text-align: left;
      max-width: 250px;
    }

    .brand-name {
      font-size: 24px;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .highlight {
      color: #e63946;
    }

    .social-icons {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }

    .social-icons a {
      background: transparent;
      color: #fff;
      padding: 8px;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      text-align: center;
      align-self: center;
      line-height: 14px;
      cursor: pointer;
      transition: background 0.3s;
    }
    

    .social-icons a:hover {
      background: #e63946;
    }

    .footer-section {
      min-width: 180px;
    }

    .footer-section h3 {
      font-size: 16px;
      margin-bottom: 15px;
      color: #fff;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section li {
      margin-bottom: 8px;
    }

    .footer-section a {
      color: #ddd;
      text-decoration: none;
      font-size: 14px;
    }

    .footer-section a:hover {
      color: #e63946;
    }

    @media (max-width: 768px) {
      .footer-container {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .footer-section {
        margin-top: 20px;
      }
    }
  `]
})
export class Footer implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();
  categories: string[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.categories = this.productService.getCategories();
  }

  onCategoryClick(category: string) {
    this.categorySelected.emit(category);
  }
}
