import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryService } from '../categotryService/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
  
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'isDeleted', 'partentCaregory','deleted'];
  errorMessage;
  categories;
  constructor( private categoryService:CategoryService ,  public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
      this.categoryService.getAllCategory().subscribe(data=> {
        this.categories=data;
           }, 
        (error)=>{
          this.errorMessage=error;
        });
  }
  openAddCategoryModal(){
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.id="addCategory-model-component";
    dialogConfig.maxHeight="800px";
    dialogConfig.width="600px";

    const modalDialog= this.matDialog.open(AddCategoryComponent,dialogConfig);

    modalDialog.afterClosed().subscribe(result=>{
      console.log("the dailog was closed",result);
      this.categories.push(result.createdCategory);
    })


  }
  openEditCategtoryModal(index, category){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "editcategtory-modal-component";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    dialogConfig.data = {category: category};

    const modalDialog = this.matDialog.open(EditCategoryComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result=>{
      console.log('The dialog was closed', result);
      if(result != null){
        this.categories[index] = result.CategoryToUpdate;
      }
      
    });
  }

  confirmBox(index,categoryId ){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteCategory(index, categoryId);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text:'Your category is safe :)',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        }
        )
      }
    })   
  }
  deleteCategory(index: any, categoryId: any) {
    console.log('>>> delete user: ',categoryId);
    this.categoryService.deleteCategory(categoryId).subscribe(data =>{
      this.categories.splice(index, 1);
      Swal.fire({
        title: 'Deleted!',
        text:'Your category has been deleted.',
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
