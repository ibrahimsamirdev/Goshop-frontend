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
  constructor(private userService: UserService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VendorEditUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.userToUpdate = data.user;
     }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: new FormControl(this.userToUpdate.name,Validators.required),
      email: new FormControl(this.userToUpdate.email,[Validators.required, Validators.email]),
      mobile: new FormControl(this.userToUpdate.mobile),
      role: new FormControl(this.userToUpdate.role.id, Validators.required)
    });
    this.getVendorEmployeesRoles();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.userForm.controls;
  }

  
  getVendorEmployeesRoles(){
    this.userService.getVendorEmployeesRoles().subscribe(data => {
      this.roles = data;
   
    }, 
    (error)=>{
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
      console.log(' userToUpdate: ', this.userToUpdate);
      console.log(' userToUpdate Form: ', this.userForm.value);
      this.userService.updateUser(this.userToUpdate).subscribe(data => {
        this.closeDialog(data);
      },
      (error)=>{
        this.errorMessage = error;
      })
    }
    // console.log('>> edit Emplyee: ',this.userForm.value);
  }

  closeDialog(updatedUser) {
    this.dialogRef.close({ event: 'close', updatedUser: updatedUser });
  }
}