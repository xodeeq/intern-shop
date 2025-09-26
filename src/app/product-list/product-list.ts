import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  template: `
    <div class="shop"><h2>SHOP</h2></div>
    <div class="product-list">
      <div class="product-card" *ngFor="let product of products">
        <h3>{{ product.name }}</h3>
        <div class="img1"><img src="/assets/laptop.jpg" alt="laptop" /></div>
        <p class="price">Price: ₦{{ product.price }}</p>
        <button (click)="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  `,
  styles: ` 
.shop{
    text-align: center;
    color: #000000;
    font-family: Arial, sans-serif;
}
    
  
  .product-list h2{
    text-align: center;
    color: #000000;
    font-family: Arial, sans-serif;
  }
  .product-list{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    
  }
  .product-card{
    display:flex;
    flex-direction: column;
    border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  margin: 10px;
  width: 200px;
  height: 350px;
  

}
    
  
  button{
    padding: 10px 20px;
    background-color: #1753e2c6;
    color: white;
    font-weight: bold;
    width: 200px;
    height: 50px;
    font-size: 12px
    border-radius: 200px;
    border: none;
    cursor: pointer;
  }
   button:hover{
    background-color: #0f3ea6;
  }

  
  .img1 img{
    width: 150px;
    height: 150px;
  }
  
  
  `,
})
export class ProductList {
  products = [
    { id: 1, name: 'Laptop', price: 150000 },
    { id: 2, name: 'Smartphone', price: 50000 },
    { id: 3, name: 'Tablet', price: 30000 },
    { id: 4, name: 'Headphones', price: 5000 },
    { id: 5, name: 'Camera', price: 45000 },
    { id: 5, name: 'Printer', price: 12000 },
    { id: 7, name: 'Monitor', price: 25000 },
    { id: 8, name: 'Keyboard', price: 3000 },
  ];
  addToCart(product: { name: string; price: number }) {
    console.log(`${product.name} added to cart!`);
  }
}
