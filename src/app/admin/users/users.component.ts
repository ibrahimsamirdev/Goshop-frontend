import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VendorAddUserComponent } from 'src/app/vendor-add-user/vendor-add-user.component';
import { VendorEditUserComponent } from 'src/app/vendor-edit-user/vendor-edit-user.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  errorMessage;
  usersType ='allUsers';

  constructor(private userService: UserService,
    private adminService:AdminService, public matDialog: MatDialog) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser != null){
      // let vendorId = currentUser.id;
      this.getAllEmployees();
    }else{
      this.errorMessage= "please login first"
    }
  
    
  }

  getAllEmployees(){
    this.adminService.getAllEmployees().subscribe(data => {
      this.users = data;
    },
    (error) => {
      this.errorMessage = error;
    });
  }

  getActiveEmployees(){
    this.adminService.getActiveEmployees().subscribe(data => {
      this.users = data;
    },
    (error) => {
      this.errorMessage = error;
    });
  }

  getNonActiveEmployees(){
    this.adminService.getNonActiveEmployees().subscribe(data => {
      this.users = data;
    },
    (error) => {
      this.errorMessage = error;
    });
  }

  fetchUsersBy(event){
    let value = event.target.value;
    // console.log(">>change products: ",value);
    if(value != this.usersType){
      this.usersType = value;
     
      if(value == 'allUsers'){
        this.getAllEmployees();
      }else if(value == 'active'){
        this.getActiveEmployees();
      }else if(value == 'notActive'){
        this.getNonActiveEmployees();
      }

    }

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


  confirmBox(index, userId, action){
    Swal.fire({
      title: 'Are you sure want to '+action+'?',
      text: 'User will not be available at this list!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it!',
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
      // this.users.splice(index, 1);
      this.users[index].deleted = !this.users[index].deleted ;
      if(this.usersType != 'allUsers'){
        this.users.splice(index, 1);
      }
      Swal.fire({
        title: 'Done!',
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
