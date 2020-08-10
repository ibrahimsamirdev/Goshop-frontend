import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../categotry/category.service';

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

  }
  openEditCategtoryModal(index, category){}

  confirmBox(index,categoryId ){}

}
