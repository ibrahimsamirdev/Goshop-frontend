import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
 
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../categotryService/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  errorMessage;
  submitted= false;
  createdCategory;
  ParentCategories;
  constructor(private  categoryService:CategoryService,private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCategoryComponent>) { }

  ngOnInit(): void {
    this.categoryForm= this.formBuilder.group({
      name: new FormControl('',Validators.required),
      description: new FormControl(''),
      partentCaregory:new FormControl(null)
    });

    this.getAllParentCategories();
  }

  getAllParentCategories() {
    this.categoryService.getAllParentCategories().subscribe(data =>{this.ParentCategories=data},
      (error)=>{this.errorMessage=error})
    
  }

  addCategory(){
    let categotry =this.categoryForm.value;
    this.submitted=true;
    if(this.categoryForm.valid){
      this.categoryService.createCategory(categotry).subscribe(data=>{this.createdCategory = data;
        this.closeDialog(this.createdCategory);})
    }
  }
  closeDialog(createdCategory) {
    this.dialogRef.close({ event: 'close', createdCategory: createdCategory });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.categoryForm.controls;
  }

}
