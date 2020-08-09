import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { VendorAddUserComponent } from '../vendor-add-user/vendor-add-user.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vendor-add-product',
  templateUrl: './vendor-add-product.component.html',
  styleUrls: ['./vendor-add-product.component.css']
})
export class VendorAddProductComponent implements OnInit {

  productForm: FormGroup;
  categories;
  errorMessage;
  submitted = false;
  createdProduct;

  uploadedText = 'Choose file';
  images;
  imageView;

  constructor(private productService: ProductService, private userService: UserService,
     private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VendorAddUserComponent>) { }

  ngOnInit(): void {

    this.createProductForm();
    this.getAllSubCategories();

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.productForm.controls[controlName].hasError(errorName);
  }

  public get formControls(){
    return this.productForm.controls;
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      title: new FormControl('',Validators.required),
      description: new FormControl('',[Validators.required]),
      price: new FormControl('', Validators.required),
      attributes: new FormControl('',Validators.required),
      stockAmount: new FormControl('', Validators.required),
      category: new FormControl(null, Validators.required)
    });
  }

  getAllSubCategories(){
    this.productService.getSubCategories().subscribe(data =>{
      this.categories = data;
    }, (error)=>{
      this.errorMessage = error;
    })
  }

  addProduct(){
    let product = this.productForm.value;
    this.submitted = true;
    if(this.productForm.valid ){
      product.vendorId = this.userService.getCurrentUser().id;
      this.productService.createProduct(product, this.images[0]).subscribe(data => {
          this.createdProduct = data;
          this.closeDialog(this.createdProduct);
      })
    }
  }

  closeDialog(createdProduct) {
    this.dialogRef.close({ event: 'close', createdProduct: createdProduct });
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
