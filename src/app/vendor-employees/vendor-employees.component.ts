import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { UserService } from '../services/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
  
@Component({
  selector: 'app-vendor-employees',
  templateUrl: './vendor-employees.component.html',
  styleUrls: ['./vendor-employees.component.css']
})
export class VendorEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  users;
  errorMessage;

  constructor(private userService: UserService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser != null){
      let vendorId = currentUser.id;
      this.getVendorEmployees(vendorId);
    }else{
      this.errorMessage= "please login first"
    }
  
    
  }

  getVendorEmployees(vendorId){
    this.userService.vendorEmployees(vendorId).subscribe(data => {
      this.users = data;
    },
    (error) => {
      this.errorMessage = error;
    });
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UserFormComponent, dialogConfig);
  }

}
