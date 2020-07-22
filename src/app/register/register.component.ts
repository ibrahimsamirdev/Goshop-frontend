import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmedValidator } from './../confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuider: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuider.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },{
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }



  submit() {
    if (this.form.valid) {
      // this.submitEM.emit(this.form.value);
      
      console.log(this.form.value)
    }else{
      console.log(" error>>>", this.form)
    }
   ;
  }

}
