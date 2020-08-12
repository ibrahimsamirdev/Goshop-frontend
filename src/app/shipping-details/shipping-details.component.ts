import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { states } from '../shared/states';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {

  shippingAddressForm: FormGroup;
  currentUser;
  currentAdress;
  submitted;
  errorMessage;
  isNewAddress = true;
  states;
  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private cartService: CartService,private router: Router) { }

  ngOnInit(): void {
    this.states = states.states;
    console.log(">>>> states : ",states)
    this.createEmptyForm();
    this.getCurrentUser();
    this.getShippingAddress();
  }

  newAdressForm(){
    this.createEmptyForm();
    this.isNewAddress = true;
  }
  createEmptyForm(){
    this.shippingAddressForm = this.formBuilder.group({
      city: new FormControl('',Validators.required),
      zipcode: new FormControl('',[Validators.required]),
      country: new FormControl('',Validators.required),
      street: new FormControl('', Validators.required),
      state: new FormControl(null, Validators.required),
    }
    );
  }

  fillShippingAdressForm (address){
    this.shippingAddressForm = this.formBuilder.group({
      city: new FormControl(address.city,Validators.required),
      zipcode: new FormControl(address.zipcode,[Validators.required]),
      country: new FormControl(address.country,Validators.required),
      street: new FormControl(address.street, Validators.required),
      state: new FormControl(address.state, Validators.required)
    }
    );
    this.shippingAddressForm.disable();
  }

  getCurrentUser() {
    this.currentUser=this.userService.getCurrentUser();
  }


  getShippingAddress() {
    this.cartService.getShippingAddressByUserId(this.currentUser.id).subscribe(data =>{
      
      if(data == null){
        this.isNewAddress = true;
      }else{
        this.currentAdress = data;
        this.isNewAddress = false;
        console.log(">>>>>>>>>>>>>>> state " + this.currentAdress.state)
        this.fillShippingAdressForm(this.currentAdress);
        
      }
    }, 
    (error) => {
      this.errorMessage = error;
    })
  }

  confirmShipping(){
    if(this.isNewAddress){
      console.log(">>> create new Address><<<<<<")
      
    let A = this.shippingAddressForm.value;
    A.user = this.currentUser;
    if(this.currentAdress != null){
      A.id = this.currentAdress.id;
     
    }
     A.type="shipping";
      this.cartService.addShippingAddress(A).subscribe(data =>{
        this.currentAdress = data;
        localStorage.setItem('shippingAddressId',this.currentAdress.id);
        this.router.navigate(["confirm-order"]);
      }, 
      (error) => {
        this.errorMessage = error;
      })

    }else{
      console.log(">>>>>> use current card <<<")
      localStorage.setItem('shippingAddressId',this.currentAdress.id);
      this.router.navigate(["confirm-order"]);
    }
  }

  public get formControls(){
    return this.shippingAddressForm.controls;
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.shippingAddressForm.controls[controlName].hasError(errorName);
  }

}
