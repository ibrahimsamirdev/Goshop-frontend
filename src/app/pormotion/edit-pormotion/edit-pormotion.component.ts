import { Component, OnInit,Optional,Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { PormotionService } from '../pormotion.service';

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
  constructor(private pormotionService:PormotionService,private formBuilder:FormBuilder,public dialogRef: MatDialogRef<EditPormotionComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.PormotionToUpdate = data.pormotion;
      }

  ngOnInit(): void {
    this.pormotionForm=this.formBuilder.group({
      startDate:new FormControl(this.PormotionToUpdate.startDate,Validators.required),
      endDate: new FormControl(this.PormotionToUpdate.endDate,Validators.required),
      discount: new FormControl(this.PormotionToUpdate.discount,Validators.required)
    });
  }
  editPormotion(){
    this.submitted=true;
    if(!this.PormotionToUpdate.invalid){
      this.PormotionToUpdate.startDate= this.pormotionForm.value.startDate;
      this.PormotionToUpdate.endDate= this.pormotionForm.value.endDate;
      this.PormotionToUpdate.discount= this.pormotionForm.value.discount;
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
