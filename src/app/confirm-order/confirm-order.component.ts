import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  products;
  totalPrice =0;
  currentUser;
  currentAdderss;
  todayDate : Date = new Date();
  order;
  orderDetails=[] ;


  constructor(private cartService:CartService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.currentUser=this.userService.getCurrentUser();
    this.products=this.cartService.getLocalCartProducts();
    this.currentAdderss=this.cartService.getLocalShippingAddress();
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

  confirmOrder(){
    console.log("--------------> User ID ",this.currentUser.id);
    this.order ={};
     this.order.userId=this.currentUser.id;
     this.order.totalAmount=this.totalPrice;
     this.order.addressId=this.getAddressId();
     this.order.paymentId=this.getPaymentId();
     this.order.orderDetails=this.getorderDetails();
     console.log(">>>>>>>>>>> order object", this.order);
     this.cartService.confirmOrder(this.order).subscribe( data =>{
      console.log("after Confirm");
      localStorage.removeItem('avct_item');
      localStorage.removeItem('shippingAddressId');
      localStorage.removeItem('paymentId');
      this.router.navigate(['orders']);
     }
       
     );
  }

  getAddressId(){
   return localStorage.getItem("shippingAddressId");
  }

  getPaymentId(){
     return localStorage.getItem("paymentId");
  }

  getorderDetails(){
    this.products.forEach(product => {
      let obj = {"productId": product.id,"price":product.price,"quantity":1};
      this.orderDetails.push(obj);
    });
    return this.orderDetails;
  }

}
