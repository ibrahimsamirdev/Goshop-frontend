import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  paymentForm: FormGroup;
  currentUser;
  paymentMethod;
  submitted;


  
  constructor(private formBuilder: FormBuilder,private userService: UserService) { }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      cardNo: new FormControl('',Validators.required),
      csv: new FormControl('',[Validators.required]),
      expireDate: new FormControl('',Validators.required),
      nameOnCard: new FormControl('', Validators.required),
      type: new FormControl(null, Validators.required),
    }
    // ,{
    //   validator: ConfirmedValidator('pass', 'confirmPass')
    // }
    );
    this.getCurrentUser();
    this.getPaymentMethod();
  }


  getCurrentUser() {
    this.currentUser=this.userService.getCurrentUser();
  }


  getPaymentMethod() {
    //get from cart service
    this.paymentMethod
  }

  confirmPayment(){

  }
  public get formControls(){
    return this.paymentForm.controls;
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.paymentForm.controls[controlName].hasError(errorName);
  }
  

}
