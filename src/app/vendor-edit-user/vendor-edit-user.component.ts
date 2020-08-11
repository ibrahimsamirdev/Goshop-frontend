import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ConfirmedValidator } from '../confirmed.validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-edit-user',
  templateUrl: './vendor-edit-user.component.html',
  styleUrls: ['./vendor-edit-user.component.css']
})
export class VendorEditUserComponent implements OnInit {

  userForm: FormGroup;
  vendors;
  roles;
  errorMessage;
  submitted = false;
  userToUpdate;
  isAdmin = false;
  needVendor = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VendorEditUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.userToUpdate = data.user;
     }


  ngOnInit(): void {
    let vendorId =0;
    if(this.userToUpdate.vendor != null){
       vendorId = this.userToUpdate.vendor.id;  
    }
    
    this.userForm = this.formBuilder.group({
      name: new FormControl(this.userToUpdate.name,Validators.required),
      email: new FormControl(this.userToUpdate.email,[Validators.required, Validators.email]),
      mobile: new FormControl(this.userToUpdate.mobile),
      role: new FormControl(this.userToUpdate.role.id, Validators.required),
      vendor: new FormControl(vendorId)
    });
    this.getVendorEmployeesRoles();

    let currentUser = this.userService.getCurrentUser();
    if (currentUser.role.role == 'admin') {
      this.isAdmin = true;
      this.getAllRoles();
      this.getAllVendors();
    } else {
      this.getVendorEmployeesRoles();
    }

       
    if (this.userToUpdate.role.role == 'financial' || this.userToUpdate.role.role == 'contentCreator') {
      this.needVendor = true;
    } else {
      this.needVendor = false;
    }

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
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


  getVendorEmployeesRoles(){
    this.userService.getVendorEmployeesRoles().subscribe(data => {
      this.roles = data;
   
    }, 
    (error)=>{
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

  editEmployee(){
    this.submitted = true;
    if(!this.userForm.invalid ){
      this.userToUpdate.name = this.userForm.value.name;
      this.userToUpdate.email = this.userForm.value.email;
      this.userToUpdate.mobile = this.userForm.value.mobile;
      if(this.userToUpdate.role.id != this.userForm.value.role){
        this.userToUpdate.role.id = this.userForm.value.role;
      }

      if(this.userForm.value.vendor != null && this.userForm.value.vendor !=0){
        this.userToUpdate.vendor.id = this.userForm.value.vendor;
      }else{
        this.userToUpdate.vendor= null;
      }
      
      if(this.isAdmin && this.needVendor && (this.userToUpdate.vendor == null|| this.userToUpdate.vendor ==0)){
        this.errorMessage = "Vendor is required";
      }else{
      this.userService.updateUser(this.userToUpdate).subscribe(data => {
        this.closeDialog(data);
      },
      (error)=>{
        this.errorMessage = error;
      })
    }
    }
    // console.log('>> edit Emplyee: ',this.userForm.value);
  }

  closeDialog(updatedUser) {
    this.dialogRef.close({ event: 'close', updatedUser: updatedUser });
  }
}