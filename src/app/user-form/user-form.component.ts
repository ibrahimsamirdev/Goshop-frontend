import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { error } from 'protractor';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  vendors;
  roles;
  errorMessage;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      mobile: new FormControl(''),
      pass: new FormControl('',Validators.required),
      confirmPass: new FormControl('', Validators.required),
      role: new FormControl(null, Validators.required),
      vendor: new FormControl(null, Validators.required)
    });
    this.getAllRoles();
    this.getAllVendors();
  }

  getAllRoles(){
    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
    }, 
    (error)=>{
      this.errorMessage = error;
    });
  }

  getAllVendors(){
    this.userService.getAllVendors().subscribe(data => {
      this.vendors = data;
    }, 
    (error)=>{
      this.errorMessage = error;
    });
  }

  addEmployee(){
    console.log('>> new Emplyee: ',this.userForm.value);
  }
}
