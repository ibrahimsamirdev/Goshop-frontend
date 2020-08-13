import { Component, OnInit,Optional,Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { PormotionService } from '../pormotion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-pormotion',
  templateUrl: './edit-pormotion.component.html',
  styleUrls: ['./edit-pormotion.component.css']
})
export class EditPormotionComponent implements OnInit {
pormotionForm: FormGroup;
errorMessage;
submitted=false;
PormotionToUpdate;
vendors;
isAdmin;

  constructor(private pormotionService:PormotionService,
    private userService:UserService,
    private formBuilder:FormBuilder,public dialogRef: MatDialogRef<EditPormotionComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.PormotionToUpdate = data.pormotion;
      }

  ngOnInit(): void {
  
    let currentUser = this.userService.getCurrentUser();
   
    if(currentUser.role.role == 'admin'){
      this.isAdmin = true;
      this.getAllVendors();
    } else {
      this.isAdmin = false;
    }

    this.createForm();
  }

  createForm(){
    this.pormotionForm=this.formBuilder.group({
      title: new FormControl(this.PormotionToUpdate.title, Validators.required),
      startDate:new FormControl(this.PormotionToUpdate.startDate,Validators.required),
      endDate: new FormControl(this.PormotionToUpdate.endDate,Validators.required),
      discount: new FormControl(this.PormotionToUpdate.discount,Validators.required),
      vendorId: new FormControl(this.PormotionToUpdate.vendorId)
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

  editPormotion(){
    this.submitted=true;
    if(!this.PormotionToUpdate.invalid){
      this.PormotionToUpdate.title= this.pormotionForm.value.title;
      this.PormotionToUpdate.startDate= this.pormotionForm.value.startDate;
      this.PormotionToUpdate.endDate= this.pormotionForm.value.endDate;
      this.PormotionToUpdate.discount= this.pormotionForm.value.discount;
      this.PormotionToUpdate.vendorId= this.pormotionForm.value.vendorId;
      this.pormotionService.updatePormotion(this.PormotionToUpdate).subscribe(updatedPormotion => {
        this.closeDialog(updatedPormotion);
      },
      (error)=>{
        this.errorMessage = error;
      })

    }
  }
  closeDialog(updatedPormotion) {
    this.dialogRef.close({ event: 'close', updatedPormotion: updatedPormotion });
  }
    
  public hasError = (controlName: string, errorName: string) =>{
    return this.pormotionForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.pormotionForm.controls;
  }

}
