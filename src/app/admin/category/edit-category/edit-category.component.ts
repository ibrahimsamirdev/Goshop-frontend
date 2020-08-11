import { Component, OnInit,Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../categotryService/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  errorMessage;
  submitted=false;
  CategoryToUpdate;
  constructor(private categoryService:CategoryService,private formBuilder:FormBuilder,public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
     this.CategoryToUpdate = data.category;
     }

  ngOnInit(): void {
    this.categoryForm= this.formBuilder.group({
      name:new FormControl(this.CategoryToUpdate.name,Validators.required),
      description:new FormControl(this.CategoryToUpdate.description,Validators.required)
    })
  }

  editCategory(){
    this.submitted=true;
    if(!this.CategoryToUpdate.invalid){
      this.CategoryToUpdate.name= this.categoryForm.value.name;
      this.CategoryToUpdate.description= this.categoryForm.value.description;
     this.categoryService.updateCategory(this.CategoryToUpdate).subscribe(updatedCategory => {
        this.closeDialog(updatedCategory);
      },
      (error)=>{
        this.errorMessage = error;
      })

    }
  }

  closeDialog(CategoryToUpdate) {
    this.dialogRef.close({ event: 'close', CategoryToUpdate: CategoryToUpdate });
  }
    
  public hasError = (controlName: string, errorName: string) =>{
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.categoryForm.controls;
  }

}
