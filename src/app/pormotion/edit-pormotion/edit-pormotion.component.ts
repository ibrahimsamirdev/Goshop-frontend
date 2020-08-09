import { Component, OnInit,Optional,Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmedValidator } from 'src/app/confirmed.validator';

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
  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<EditPormotionComponent>,
     @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.PormotionToUpdate = data.pormotion;
      }

  ngOnInit(): void {
    this.pormotionForm=this.formBuilder.group({
      startDate:new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required),
      discount: new FormControl('',Validators.required)
    });
  }
  editPormotion(){
    this.submitted=true;
  }
    
  public hasError = (controlName: string, errorName: string) =>{
    return this.pormotionForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.pormotionForm.controls;
  }

}
