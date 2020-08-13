import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public cartService:CartService, private router: Router) { 
   
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('avct_item');
    localStorage.removeItem('shippingAddressId');
    localStorage.removeItem('paymentId');
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }

  isLoggedin(){
    return (localStorage.getItem('token') ==null)? false:true;
  }
}
