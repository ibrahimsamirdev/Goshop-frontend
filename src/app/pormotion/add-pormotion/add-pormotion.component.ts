import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PormotionService } from '../pormotion.service';

import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-pormotion',
  templateUrl: './add-pormotion.component.html',
  styleUrls: ['./add-pormotion.component.css']
})
export class AddPormotionComponent {
  pormotionForm: FormGroup;
  errorMessage;
  submitted = false;
  createdPormotion;
  isAdmin = false;
  vendorId;
  vendors;

  constructor(private PormotionService: PormotionService,
    private userService: UserService, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPormotionComponent>) { }

  ngOnInit(): void {

    let currentUser = this.userService.getCurrentUser();
    console.log('>> current User: ',currentUser);
    if(currentUser.role.role == 'vendor'){
      this.isAdmin = false;
      this.vendorId = currentUser.id;
    }else if (currentUser.role.role != 'admin' && currentUser.role.role != 'registedUser') {
      this.isAdmin = false;
      this.vendorId = currentUser.vendor.id;
    }else if(currentUser.role.role =='admin'){
      this.getAllVendors();
      this.isAdmin = true;
    }

    this.createForm();
  }

  createForm() {
    this.pormotionForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      discount: new FormControl('', Validators.required),
      vendorId: new FormControl('')

    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.pormotionForm.controls[controlName].hasError(errorName);
  }

  public get formControls() {
    return this.pormotionForm.controls;
  }

   getAllVendors() {
    this.userService.getAllVendors().subscribe(data => {
      this.vendors = data;
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  addPormotion() {
    this.submitted = true;
    let pormotion = this.pormotionForm.value;
    if ( this.isAdmin && pormotion.value.vendorId == null ) {
      this.errorMessage = "vendor is required";
    } else {
   
      pormotion.vendorId = this.vendorId;
      if (this.pormotionForm.valid) {

        this.PormotionService.createdPormotion(pormotion).subscribe(data => {
          this.createdPormotion = data;
          this.closeDialog(this.createdPormotion);
        })
      }
    }
  }
  closeDialog(createdPormotion) {
    this.dialogRef.close({ event: 'close', createdPormotion: createdPormotion });
  }

}