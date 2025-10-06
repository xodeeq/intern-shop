import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="product">
      <form #quantityForm="ngForm" (ngSubmit)="addToCart(quantityForm)">
        <div class="quantity-box">
          <button type="button" class="minus" (click)="decrease()" [disabled]="disabled">−</button>
          <input
            type="text"
            name="quantity"
            [(ngModel)]="quantity"
            class="quantity-control"
            required
            #quantityField="ngModel"
            [disabled]="disabled"
          />
          <button type="button" class="plus" (click)="increase()" [disabled]="disabled">+</button>
        </div>

        <div *ngIf="quantityField.invalid && (quantityField.dirty || quantityField.touched)">
          <small *ngIf="quantityField.errors?.['required']" class="text-danger">
            *Quantity is required
          </small>
        </div>
        <div *ngIf="quantityExceedsStock" class="text-danger">
          *Quantity exceeds available stock ({{ currentStock }})
        </div>

        <button class="add" type="submit" [disabled]="disabled || quantityExceedsStock">
          Add to Cart
        </button>
        <p *ngIf="errorMessage" style="color:red">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [
    `
      .quantity-box {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .minus,
      .plus {
        padding: 12px;
        background-color: #d07d18c6;
        border: none;
        border-radius: 4px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        margin: 5px;
      }
      .minus:hover,
      .plus:hover {
        background-color: #b06b16;
      }
      .quantity-control {
        width: 60px;
        text-align: center;
        margin: 0 8px;
        border: 2px solid #d07d18c6;
        border-radius: 4px;
        padding: 6px;
        margin-bottom: 5px;
      }
      .text-danger {
        color: #f95656ff;
        font-size: 12px;
        padding-left: 5px;
      }
      .add {
        padding: 10px 20px;
        background-color: #d07d18c6;
        font-weight: bold;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 10px;
      }
      .add:hover {
        background-color: #b06b16;
      }
    `,
  ],
})
export class QuantityComponent {
  @Input() productName: string = '';
  @Input() disabled: boolean = false;
  quantity: number | null = null;
  errorMessage: string = '';
  quantityExceedsStock: boolean = false;
  currentStock: number | null = null;

  constructor(private productService: ProductService) {}

  increase() {
    if (this.disabled) return;
    if (this.quantity === null || isNaN(this.quantity)) {
      this.quantity = 1;
    } else {
      this.quantity++;
    }
    this.checkStock();
  }

  decrease() {
    if (this.disabled) return;
    if (this.quantity && this.quantity > 1) {
      this.quantity--;
    }
    this.checkStock();
  }

  ngOnChanges() {
    this.checkStock();
  }

  checkStock() {
    const product = this.productService
      .getProduct()
      .find((p) => p.name.trim().toLowerCase().includes(this.productName.trim().toLowerCase()));
    if (product) {
      this.currentStock = product.stock;
      this.quantityExceedsStock = this.quantity !== null && this.quantity > product.stock;
    } else {
      this.currentStock = null;
      this.quantityExceedsStock = false;
    }
  }

  addToCart(form: NgForm) {
    if (this.disabled) return;
    if (form.invalid || this.quantity === null || this.quantity <= 0) {
      this.errorMessage = 'Please enter a valid quantity!';
      return;
    }

    const product = this.productService
      .getProduct()
      .find((p) => p.name.trim().toLowerCase().includes(this.productName.trim().toLowerCase()));

    if (!product) {
      this.errorMessage = 'No product selected from search!';
      return;
    }

    if (this.quantity > product.stock) {
      this.errorMessage = `Quantity exceeds available stock (${product.stock})!`;
      this.quantityExceedsStock = true;
      return;
    }

    this.errorMessage = '';
    this.quantityExceedsStock = false;
    console.log(`Added ${this.quantity} of ${product.name} to cart!`);
  }

  ngDoCheck() {
    this.checkStock();
  }
}
