import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { UserService } from '../services/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { VendorAddUserComponent } from '../vendor-add-user/vendor-add-user.component';
import { VendorEditUserComponent } from '../vendor-edit-user/vendor-edit-user.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
  
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

  openAddUserModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "adduser-modal-component";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(VendorAddUserComponent, dialogConfig);
    
    modalDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.users.push(result.createdUser);
    });
  }

  openEditUserModal(index, user){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "edituser-modal-component";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    dialogConfig.data = {user: user};

    const modalDialog = this.matDialog.open(VendorEditUserComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result=>{
      console.log('The dialog was closed', result);
      if(result != null){
        this.users[index] = result.updatedUser;
      }
      
    });
  }


  confirmBox(index, userId){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteUser(index, userId);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text:'Your employee is safe :)',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        }
        )
      }
    })
  }

  deleteUser(index, userId){
    console.log('>>> delete user: ',userId);
    this.userService.deleteUser(userId).subscribe(data =>{
      this.users.splice(index, 1);
      Swal.fire({
        title: 'Deleted!',
        text:'Your employee has been deleted.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }
      )
    },
    (error) => {
      Swal.fire({
        title: 'Somthing went wrong',
        text:error,
        icon: 'error'
      }
      )
      this.errorMessage = error;
    })
  }

}
