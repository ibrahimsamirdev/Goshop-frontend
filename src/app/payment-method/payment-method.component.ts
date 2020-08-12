import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  paymentForm: FormGroup;
  currentUser;
  currentPaymentMethod;
  submitted;
  errorMessage;
  isNewCard = true;


  
  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private cartService: CartService) { }

  ngOnInit(): void {
   
    this.createEmptyForm();
    this.getCurrentUser();
    this.getPaymentMethod();
  }

  newCardForm(){
    this.createEmptyForm();
    this.isNewCard = true;
  }
  createEmptyForm(){
    this.paymentForm = this.formBuilder.group({
      cardNo: new FormControl('',Validators.required),
      csv: new FormControl('',[Validators.required]),
      expireDate: new FormControl('',Validators.required),
      nameOnCard: new FormControl('', Validators.required),
      type: new FormControl(null, Validators.required),
    }
    );
  }
  fillPaymentForm (payment){
    this.paymentForm = this.formBuilder.group({
      cardNo: new FormControl(payment.cardNo,Validators.required),
      csv: new FormControl(payment.csv,[Validators.required]),
      expireDate: new FormControl(payment.expireDate,Validators.required),
      nameOnCard: new FormControl(payment.nameOnCard, Validators.required),
      type: new FormControl(payment.type, Validators.required)
    });
    this.paymentForm.disable();
  }

  getCurrentUser() {
    this.currentUser=this.userService.getCurrentUser();
  }


  getPaymentMethod() {
    this.cartService.getPaymentMethodByUserId(this.currentUser.id).subscribe(data =>{
      
      if(data == null){
        this.isNewCard = true;
      }else{
        this.currentPaymentMethod = data;
        this.isNewCard = false;
        this.fillPaymentForm(this.currentPaymentMethod);
        
      }
    }, 
    (error) => {
      this.errorMessage = error;
    })
  }

  confirmPayment(){
    if(this.isNewCard){
      console.log(">>> create new card><<<<<<")
      
    let p = this.paymentForm.value;
    p.user = this.currentUser;
    if(this.currentPaymentMethod != null){
      p.id = this.currentPaymentMethod.id;
    }
      this.cartService.addPaymentMethod(p).subscribe(data =>{
        this.currentPaymentMethod = data;
        localStorage.setItem('paymentId',this.currentPaymentMethod.id);
      }, 
      (error) => {
        this.errorMessage = error;
      })

    }else{
      console.log(">>>>>> use current card <<<")
      localStorage.setItem('paymentId',this.currentPaymentMethod.id);
    }
  }
  public get formControls(){
    return this.paymentForm.controls;
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.paymentForm.controls[controlName].hasError(errorName);
  }
  

}
