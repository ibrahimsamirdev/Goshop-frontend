import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmedValidator } from './../confirmed.validator';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage;
  form: FormGroup;
  constructor(private formBuider: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuider.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      mobile: new FormControl('',),
      pass: new FormControl('',Validators.required),
      confirmPass: new FormControl('', Validators.required),
    },{
      validator: ConfirmedValidator('pass', 'confirmPass')
    });
  
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }



  register() {
    if (this.form.valid) {
      // this.submitEM.emit(this.form.value);
      
      console.log(this.form.value)
      this.dataService.register(this.form.value).subscribe(data => {
        console.log('>>> register response: ',data);
        this.router.navigate(['/login']);
      },
      (error) => {       
        console.log('>> error in register com: ',error)
        //Error callback
        this.errorMessage = error;
      });
    }else{
      console.log(" error>>>", this.form)
    }
   ;
  }

}
