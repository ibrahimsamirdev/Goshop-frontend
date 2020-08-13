import { Component, OnInit } from '@angular/core';
import { PormotionService } from '../pormotion.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPormotionComponent } from '../add-pormotion/add-pormotion.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EditPormotionComponent } from '../edit-pormotion/edit-pormotion.component';


@Component({
  selector: 'app-pormotion',
  templateUrl: './pormotion.component.html',
  styleUrls: ['./pormotion.component.css']
})

export class PormotionComponent implements OnInit {
  errorMessage;
  pormotions;
  isAdmin = false;
  currentUser;
  pormotionsType="allPormotions";

  constructor(private pormationService: PormotionService,
    private userService: UserService, public matDialog: MatDialog) { }


  ngOnInit(): void {

    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser.role.role == 'admin') {
      this.isAdmin = true;
      this.getAllPormotion();
    } else {
      this.isAdmin = false;
      this.getVendorPormotion(this.currentUser.id);
    }
  }


  fetchPormotionssBy(event){
    let value = event.target.value;
    console.log(">>change products: ",value);
    if(value != this.pormotionsType){
      this.pormotionsType = value;
     
      if(value == 'allPormotions'){
        this.getAllPormotion();
      }else if(value == 'deleted'){
        this.getDeletedPormotion();
      }else if(value == 'nonDeleted'){
        this.getNonDeletedPormotion();
      }

    }

  }

  getAllPormotion() {
    this.pormationService.getAllPormotion().subscribe(data => {

      this.pormotions = data
    }
      ,
      error => this.errorMessage = error

    )
  }

  getDeletedPormotion() {
    this.pormationService.getDeletedPormotion().subscribe(data => {

      this.pormotions = data
    }
      ,
      error => this.errorMessage = error

    )
  }

  getNonDeletedPormotion() {
    this.pormationService.getNonDeletedPormotion().subscribe(data => {

      this.pormotions = data
    }
      ,
      error => this.errorMessage = error

    )
  }

  getVendorPormotion(vendorId) {
    this.pormationService.getVendorPormotion(vendorId).subscribe(data => {

      this.pormotions = data
    }
      ,
      error => this.errorMessage = error

    )
  }

  openAddPormotionModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "app-add-pormotion";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AddPormotionComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.pormotions.push(result.createdPormotion);
    });
  }

  confirmBox(index, promotionId, action) {
    Swal.fire({
      title: 'Are you sure want to'+action+'?',
      text: 'You will not see this again on '+action+' list',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
       
        this.deletePormotion(index, promotionId);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your pormotion is safe :)',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        }
        )
      }
    })
  }
  deletePormotion(index, userId) {
    console.log('>>> delete user: ', userId);
    this.pormationService.deletePormotion(userId).subscribe(data => {
      this.pormotions[index].deleted = !this.pormotions[index].deleted ;
      if(this.pormotionsType != 'allPormotions'){
        this.pormotions.splice(index, 1);
      }
      
      Swal.fire({
        title: 'Deleted!',
        text: 'Your pormotion has been deleted.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }
      )
    },
      (error) => {
        Swal.fire({
          title: 'Somthing went wrong',
          text: error,
          icon: 'error'
        }
        )
        this.errorMessage = error;
      })
  }


  openEditPormotionModal(index, pormotion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "app-edit-pormotion";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    dialogConfig.data = { pormotion: pormotion };

    const modalDialog = this.matDialog.open(EditPormotionComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != null) {
        this.pormotions[index] = result.updatedPormotion;
      }

    });
  }
}
