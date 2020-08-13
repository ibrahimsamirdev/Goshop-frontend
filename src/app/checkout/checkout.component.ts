import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products;
  totalPrice =0;

  constructor(private cartService:CartService, private router:Router) { }

  ngOnInit(): void {
    this.products=this.cartService.getLocalCartProducts();
    console.log(">>>>>>>>>>>>List products: " , this.products);
    this.calcTotal();
    console.log(">>>>>>>>>>> total " + this.totalPrice)
  }

  calcTotal(){
    this.totalPrice = 0 ;
    this.products.forEach(product => {
      this.totalPrice +=product.price;
      
    });
  }
}
