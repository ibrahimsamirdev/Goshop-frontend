import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorAddUserComponent } from '../vendor-add-user/vendor-add-user.component';

@Component({
  selector: 'app-vendor-edit-product',
  templateUrl: './vendor-edit-product.component.html',
  styleUrls: ['./vendor-edit-product.component.css']
})
export class VendorEditProductComponent implements OnInit {
  productForm: FormGroup;
  categories;
  errorMessage;
  submitted = false;
  updatedProduct;
  productToUpdate;

  uploadedText = 'Choose file';
  images;
  imageView;

  constructor(private productService: ProductService, private userService: UserService,
     private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VendorAddUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.productToUpdate = data.productToUpdate;
      this.createProductForm();
     }

  ngOnInit(): void {

   
    this.getAllSubCategories();

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.productForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.productForm.controls;
  }

  createProductForm(){
    this.imageView = this.productToUpdate.imageUrl;
    this.productForm = this.formBuilder.group({
      title: new FormControl(this.productToUpdate.title,Validators.required),
      description: new FormControl(this.productToUpdate.description,[Validators.required]),
      price: new FormControl(this.productToUpdate.price, Validators.required),
      attributes: new FormControl(this.productToUpdate.attributes,Validators.required),
      stockAmount: new FormControl(this.productToUpdate.stockAmount, Validators.required),
      category: new FormControl(this.productToUpdate.category.id, Validators.required)
    });

  }

  getAllSubCategories(){
    this.productService.getSubCategories().subscribe(data =>{
      this.categories = data;
    }, (error)=>{
      this.errorMessage = error;
    })
  }

  updateProduct(){
    let product = this.productForm.value;
    this.submitted = true;
    if(this.productForm.valid ){
      this.productToUpdate.title = product.title;
      this.productToUpdate.description = product.description;
      this.productToUpdate.price = product.price;
      this.productToUpdate.attributes = product.attributes;
      this.productToUpdate.stockAmount = product.stockAmount;
      this.productToUpdate.category.id = product.category;
      
      if(this.images != null){
        this.productService.updateProductWithImage(this.productToUpdate, this.images[0]).subscribe(data => {
          this.updatedProduct = data;
          this.closeDialog(this.updatedProduct);
      })
      }else{
        this.productService.updateProduct(this.productToUpdate).subscribe(data => {
          this.updatedProduct = data;
          this.closeDialog(this.updatedProduct);
      })
      }
      
    }
  }

  closeDialog(updatedProduct) {
    this.dialogRef.close({ event: 'close', updatedProduct: updatedProduct });
  }

  uploadFile(event) {

    console.log(' >>> upload file: ', event);
    this.uploadedText = '';
    this.images = event.target.files;
    for (let f of event.target.files) {
      this.uploadedText += f.name + ' , ';
    }
    const reader = new FileReader();
    reader.onload = e => this.imageView = reader.result;
    reader.readAsDataURL(this.images[0]);
  }
}