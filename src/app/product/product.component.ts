import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private subscription: Subscription;
  public product;
  public id;

  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService, public productService: ProductService) {
    this.subscription = activatedRoute.params.subscribe(
      (params: any) => this.id = params['id']
    );
    this.subscription = this.productService.getProduct(this.id).subscribe((product) => {
      this.product = product;
      console.log(this.product);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {

  }

}
