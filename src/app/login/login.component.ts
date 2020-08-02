import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
  
  login() {
    if (this.form.valid) {
      // this.submitEM.emit(this.form.value);
      this.errorMessage = '';
      console.log(this.form);
      console.log(this.form.value);
      this.dataService.login(this.form.value.username, this.form.value.password).subscribe(data => {
        console.log('>>>> login response: ',data);
      },
      (error) => {                              //Error callback
        this.errorMessage = error;
      });
    }else{
      console.log(" error>>>")
    }
  
  }
  // @Input() error: string | null;

  // @Output() submitEM = new EventEmitter();
}
