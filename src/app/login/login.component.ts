import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from 'protractor';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage;
  private loggedUser;
  constructor(private dataService: DataService, private router: Router) { }

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
      this.dataService.login(this.form.value.username, this.form.value.password).subscribe(data => {
        this.loggedUser = data;
        localStorage.setItem('token', this.loggedUser.token);
        localStorage.setItem('currentUser', JSON.stringify(this.loggedUser.user));
        if(this.loggedUser.user.role.role == 'admin'){
          this.router.navigate(['admin/users']);
        }else if(this.loggedUser.user.role.role != 'registeredUser'){}
        this.router.navigate(['vendor/employees']);
      },
      (error) => {
        this.errorMessage = error;
      });
    }else{
      console.log(" error>>>")
    }
  
  }

}
