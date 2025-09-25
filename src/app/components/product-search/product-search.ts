import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.services';


@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  providers: [ProductService],
  template: `
    <div class = "container">
      <form [formGroup]="reactiveForm" (ngSubmit)="onsubmit()">
        <input type="text" placeholder="Search products..." class="form-control" formControlName = "search" pattern="^[a-zA-Z]+$" required=""/>

        <button class= "submit" type="submit">Search</button>
        <br>
        @if (search?.dirty || search?.touched) {
        @if (search?.errors?.['required']) {
          <i><small class="text-danger">*Entering a product is required</small></i>
        }
        @if (search?.errors?.['pattern']) {
          <i><small class="text-danger">*Only alphabets are allowed</small></i>
        }
        }
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
    `
})
export class ProductSearch {
  reactiveForm: FormGroup;

  @Output() productsearched = new EventEmitter<string>();

  constructor(private productService: ProductService) {
    this.reactiveForm = new FormGroup({
      search: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+$")])
    });
  }

  get search() {
    return this.reactiveForm.get('search');
  }

  findProduct() {
    // Logic to find product

    const productKey = this.reactiveForm.value.search;
    const product = this.productService.getProductByName(productKey);
    console.log("Found product:", product);
  };

  onsubmit() {
    // Handle form submission

    console.log(this.reactiveForm.value);

    this.productsearched.emit(this.reactiveForm.value.search);
    if (this.reactiveForm.value.search === '') { alert('Please enter a product name to search.'); return; }
    else {
      alert(`Searching for: ${this.reactiveForm.value.search}.....`)
      if (this.productService.getProduct().some(p => p.name.toLowerCase() === this.reactiveForm.value.search.toLowerCase())) {
        {
          this.findProduct();
          alert(`Product "${this.reactiveForm.value.search}" found! Check the console for details.`);
        }
      }
      else { alert(`Product "${this.reactiveForm.value.search}" not found. Please try again.`); }
    };

  }

}
