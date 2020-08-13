import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

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

  confirmBox(index, productId){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this Product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteProduct(index, productId);
        this.calcTotal();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text:'Your product is safe',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        }
        )
      }
    })
  }

  deleteProduct(index, productId){
    console.log('>>> delete product: ',productId);
    // this.cartService.removeLocalCartProduct(productId);
      this.products.splice(index, 1);
      this.cartService.updateCart(this.products);
      Swal.fire({
        title: 'Deleted!',
        text:'Your product has been deleted.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }
      );
  
  }

  showErrorMessage(message){
    Swal.fire({
      title: 'Somthing went wrong',
      text:message,
      icon: 'error'
    })

  }
}
