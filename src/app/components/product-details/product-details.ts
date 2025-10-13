import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.services';
import { CartService } from '../../services/cart.service';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CapitalizeAndSpacePipe],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <div class="product-details" *ngIf="product">
  <div class="image-section">
    <img [src]="product.image" [alt]="product.name" class="main-img" />

    <div class="thumbnail-row">
      <img *ngFor="let img of [product.image, product.image, product.image]"
           [src]="img"
           class="thumb"
           (click)="product.image = img" />
    </div>
  </div>

  <div class="info-section">
    <h2>{{ product.name | capitalizeAndSpace}}</h2>
    <div class="rating">
      <span class="stars"><i class="fa-solid fa-star text-yellow-500"></i> {{product.rating}}</span>
      <small>({{product.review}} Reviews)</small>
    </div>

    <div class="price">
      <span class="current">{{ product.price }}</span>
      <span class="old">$80.00</span>
    </div>

    <p class="desc">
      {{ product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam, purus eget sagittis vulputate...' }}
    </p>

    <div class="options">
      <p><strong>Available Options</strong></p>

      <div class="colors">
        <span *ngFor="let color of ['#007bff', '#ff5722', '#9c27b0', '#4caf50']"
              [style.background]="color"
              class="color-box"
              [class.active]="selectedColor === color"
              (click)="selectColor(color)"></span>
      </div>

      <div class="sizes">
        <button *ngFor="let size of ['S', 'M', 'L', 'XL', 'XXL']"
                [class.active]="selectedSize === size"
                (click)="selectSize(size)">
          {{ size }}
        </button>
      </div>
    </div>

    <div class="quantity">
      <button (click)="decreaseQty()">−</button>
      <span>{{ quantity }}</span>
      <button (click)="increaseQty()">+</button>
    </div>

    <button class="add-cart" (click)="addToCart()">Add To Cart</button>

    <p class="category"><strong>Category:</strong> {{ product.category }}</p>
    <p class="availability">
      <strong>Availability:</strong> {{ product.stock }} Products In Stock
    </p>

    <p class="message">{{ message }}</p>
  </div>
</div>
  `,
  styles: `
  .product-details {
  display: flex;
  margin: 40px;
  gap: 40px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.image-section {
  flex: 1;
}

.main-img {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}

.thumbnail-row {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.thumb {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumb:hover {
  border-color: #e91e63;
}

.info-section {
  flex: 1;
}

.rating small {
  color: gray;
}

.price {
  margin: 10px 0;
}

.price .current {
  color: #e91e63;
  font-weight: 700;
  font-size: 22px;
}

.price .old {
  text-decoration: line-through;
  color: gray;
  margin-left: 10px;
}

.options {
  margin: 20px 0;
}

.color-box {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-box.active {
  border-color: #000;
}

.sizes button {
  margin-right: 5px;
  border: 1px solid #ddd;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  background: #fff;
}

.sizes button.active {
  border-color: #e91e63;
  background: #fdecef;
}

.quantity {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.quantity button {
  width: 30px;
  height: 30px;
  font-weight: bold;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
}

.quantity span {
  margin: 0 10px;
}

.add-cart {
  padding: 10px 20px;
  background: #e91e63;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.add-cart:hover {
  background: #c2185b;
}

.message {
  margin-top: 10px;
  color: #333;
}


  `
})
export class ProductDetails implements OnInit {

  product: any;
  quantity = 1;
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }

  increaseQty() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: string) {
    this.selectedSize = size;

  }

  addToCart() {
    if (!this.selectedColor || !this.selectedSize) {
      this.message = '❌ Please select color and size.';
      return;
    }
    this.message = this.cartService.addToCart(this.product.id, this.quantity, this.selectedColor, this.selectedSize);
  }

}
