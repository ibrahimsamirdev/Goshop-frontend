import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PormotionService } from '../pormotion.service';
 
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-pormotion',
  templateUrl: './add-pormotion.component.html',
  styleUrls: ['./add-pormotion.component.css']
})
export class AddPormotionComponent   {
  pormotionForm: FormGroup;
  errorMessage;
  submitted = false;
  createdPormotion;
  constructor(  private PormotionService: PormotionService,private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPormotionComponent>) { }

        ngOnInit(): void {
      this.pormotionForm = this.formBuilder.group({
        title: new FormControl('',Validators.required),
        startDate: new FormControl('',Validators.required),
        endDate: new FormControl('',Validators.required),
        discount: new FormControl('',Validators.required),
       
      },{
        validator: ConfirmedValidator('pass', 'confirmPass')
      });
      
    }
    
  public hasError = (controlName: string, errorName: string) =>{
    return this.pormotionForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.pormotionForm.controls;
  }

  
  addPormotion(){
    let pormotion = this.pormotionForm.value;
    this.submitted = true;
    if(this.pormotionForm.valid ){
 
      this.PormotionService.createdPormotion(pormotion).subscribe(data => {
          this.  createdPormotion = data;
          this.closeDialog(this.createdPormotion);
      })
    }
    
  }
  closeDialog(createdPormotion) {
    this.dialogRef.close({ event: 'close', createdPormotion: createdPormotion });
  }

}