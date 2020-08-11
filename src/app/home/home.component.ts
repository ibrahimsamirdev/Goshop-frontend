import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products;
  errorMessage;
  constructor(private productService: ProductService) { }

  getPublishedProducts() {
    this.productService.getPublishedProducts().subscribe(data => {
      this.products = data;
      if (this.products == null) {
        this.products = [];
      }

    },
      (error) => {
        this.errorMessage = error;
      });
  }

  ngOnInit(): void {
    this.getPublishedProducts();
  }

}
