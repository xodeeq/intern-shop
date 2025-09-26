import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-search',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ProductService],
  template: `
    <div class="container">
      <form [formGroup]="reactiveForm" (ngSubmit)="onsubmit()">
        <input
          type="text"
          placeholder="Search products..."
          class="form-control"
          formControlName="search"
          pattern="^[a-zA-Z]+$"
          required=""
        />

        <button class="submit" type="submit">Search</button>
        <br />
        @if (search?.dirty || search?.touched) { @if (search?.errors?.['required']) {
        <i><small class="text-danger">*Entering a product is required</small></i>
        } @if (search?.errors?.['pattern']) {
        <i><small class="text-danger">*Only alphabets are allowed</small></i>
        } }
      </form>
    </div>
  `,
  styles: `.form-control {
    width: 300px;
    padding: 10px;
    margin-right: 10px;
    border: 2px solid #d07d18c6;
    border-radius: 4px;
  }

  .form-control::placeholder {
    color: #d07d18c6;
    font-style: italic;

  }

  .text-danger {
    color: #f95656ff;
    padding-left: 10px;
  }

  .submit {
    padding: 10px 20px;
    background-color: #d07d18c6;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .submit:hover {
    background-color: #b06b16;
  }
    `,
})
export class ProductSearch {
  reactiveForm: FormGroup;

  @Output() productsearched = new EventEmitter<{ name: string; valid: boolean }>();

  constructor(private productService: ProductService) {
    this.reactiveForm = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    });
  }

  get search() {
    return this.reactiveForm.get('search');
  }

  findProduct() {
    const productKey = this.reactiveForm.value.search;
    const product = this.productService.getProductByName(productKey);
    console.log('Found product:', product);
  }

  onsubmit() {
    const searchValue = this.reactiveForm.value.search;
    console.log(this.reactiveForm.value);
    let valid = false;
    if (searchValue && typeof searchValue === 'string') {
      valid = this.productService
        .getProduct()
        .some((p) => p.name.toLowerCase() === searchValue.toLowerCase());
    }
    this.productsearched.emit({ name: searchValue, valid });
    if (!searchValue) {
      alert('Please enter a product name to search.');
      return;
    } else if (valid) {
      this.findProduct();
      alert(`Product "${searchValue}" found! Check the console for details.`);
    } else {
      alert(`Product "${searchValue}" not found. Please try again.`);
    }
  }
}
