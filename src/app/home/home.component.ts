import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products;
  errorMessage;
  searchForm: FormGroup;

  constructor(private productService: ProductService, private cartService: CartService, private formBuilder: FormBuilder) { }

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

    this.searchForm = this.formBuilder.group({
      keyword: new FormControl(''),
      minprice: new FormControl(''),
      maxprice: new FormControl('')
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  doSearch() {
    let fields = this.searchForm.controls;
    console.log(fields);

    this.productService.searchProducts(fields.keyword.value, '', fields.minprice.value, fields.maxprice.value).subscribe(data => {
      console.log(data);

      this.products = data;
      if (this.products == null) {
        this.products = [];
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }
}
