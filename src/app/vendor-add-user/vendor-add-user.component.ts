import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { error } from 'protractor';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { retry } from 'rxjs/operators';
import { ConfirmedValidator } from '../confirmed.validator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-add-user',
  templateUrl: './vendor-add-user.component.html',
  styleUrls: ['./vendor-add-user.component.css']
})
export class VendorAddUserComponent implements OnInit {

  userForm: FormGroup;
  vendors;
  roles;
  errorMessage;
  submitted = false;
  createdUser;
  isAdmin = false;
  needVendor = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VendorAddUserComponent>) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl(''),
      pass: new FormControl('', Validators.required),
      confirmPass: new FormControl('', Validators.required),
      role: new FormControl(null, Validators.required),
      vendor: new FormControl(null)
    }, {
      validator: ConfirmedValidator('pass', 'confirmPass')
    });

    let currentUser = this.userService.getCurrentUser();
    if (currentUser.role.role == 'admin') {
      this.isAdmin = true;
      this.getAllRoles();
      this.getAllVendors();
    } else {
      this.getVendorEmployeesRoles();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public get formControls() {
    return this.userForm.controls;
  }

  changeRole(event) {
    console.log(">>>> change Role <<<<<<<")
    if (this.isAdmin) {
      let roleType = this.userForm.value.role.role;
      
      if (roleType == 'financial' || roleType == 'contentCreator') {
        this.needVendor = true;
      } else {
        this.needVendor = false;
      }
    }
  }


  getVendorEmployeesRoles() {
    this.userService.getVendorEmployeesRoles().subscribe(data => {
      this.roles = data;
    },
      (error) => {
        this.errorMessage = error;
      });
  }


  getAllRoles() {
    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  getAllVendors() {
    this.userService.getAllVendors().subscribe(data => {
      this.vendors = data;
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  addEmployee() {
    let user = this.userForm.value;
    this.submitted = true;
    if (this.userForm.valid) {
      if(!this.isAdmin){
        user.vendor = this.userService.getCurrentUser();
      }
      if(this.isAdmin && this.needVendor && user.vendor == null){
        this.errorMessage = "Vendor is required";
      }else{
        
        this.userService.createUser(user).subscribe(data => {
          this.createdUser = data;
          this.closeDialog(this.createdUser);
        })
      }
   
    }

  }

  closeDialog(createdUser) {
    this.dialogRef.close({ event: 'close', createdUser: createdUser });
  }
}
