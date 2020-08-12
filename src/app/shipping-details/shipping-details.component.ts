import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  updateUserDetails(form: NgForm) {
    
    this.router.navigate(["billing-details"]);
    
  }

  confirmShipping(form: NgForm){
    console.log(form);
  }
}
