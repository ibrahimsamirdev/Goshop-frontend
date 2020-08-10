import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VendorEditProductComponent } from 'src/app/vendor-edit-product/vendor-edit-product.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { VendorAddProductComponent } from 'src/app/vendor-add-product/vendor-add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products;
  errorMessage;
  productsType="allProducts";
  constructor(public matDialog: MatDialog, private productService: ProductService
    ,private userService: UserService) { }

  ngOnInit(): void {

    let currentUser = this.userService.getCurrentUser();
    
    if(currentUser != null){
     
      this.getNonDeletedProducts();
    }else{
      this.errorMessage= "please login first"
    }
  }

  fetchProductsBy(event){
    let value = event.target.value;
    console.log(">>change products: ",value);
    if(value != this.productsType){
      this.productsType = value;
     
      if(value == 'allProducts'){
        this.getNonDeletedProducts();
      }else if(value == 'published'){
        this.getPublishedProducts();
      }else if(value == 'nonPublished'){
        this.getNonPublishedProducts();
      }else if(value == 'deleted'){
        this.getDeletedProducts();
      }

    }

  }
  getNonDeletedProducts(){
    this.productService.getNonDeletedProducts().subscribe(data => {
      this.products = data;
      if(this.products == null){
        this.products =[];
      }

    },
    (error) => {
      this.errorMessage = error;
    });
  }

  getDeletedProducts(){
    this.productService.getDeletedProducts().subscribe(data => {
      this.products = data;
      if(this.products == null){
        this.products =[];
      }

    },
    (error) => {
      this.errorMessage = error;
    });
  }

  getPublishedProducts(){
    this.productService.getPublishedProducts().subscribe(data => {
      this.products = data;
      if(this.products == null){
        this.products =[];
      }

    },
    (error) => {
      this.errorMessage = error;
    });
  }

  getNonPublishedProducts(){
    this.productService.getNonPublishedProducts().subscribe(data => {
      this.products = data;
      if(this.products == null){
        this.products =[];
      }

    },
    (error) => {
      this.errorMessage = error;
    });
  }


  openAddProductModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "addproduct-modal-component";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(VendorAddProductComponent, dialogConfig);
    
    modalDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(this.productsType != 'published' )
      this.products.push(result.createdProduct);
    });
  }

  openEditUserModal(index, product){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "edit-product-modal-component";
    dialogConfig.maxHeight = "800px";
    dialogConfig.width = "600px";
    dialogConfig.data = {productToUpdate: product};

    const modalDialog = this.matDialog.open(VendorEditProductComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result=>{
      console.log('The dialog was closed', result);
      if(result != null){
        this.products[index] = result.updatedProduct;
      }
      
    });
  }


  confirmBox(index, productId){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this Product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteProduct(index, productId);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text:'Your product is safe',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        }
        )
      }
    })
  }

  deleteProduct(index, productId){
    console.log('>>> delete product: ',productId);
    this.productService.deleteProduct(productId).subscribe(data =>{
      this.products.splice(index, 1);
      Swal.fire({
        title: 'Deleted!',
        text:'Your product has been deleted.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }
      )
    },
    (error) => {
      this.showErrorMessage(error);
      
      this.errorMessage = error;
    })
  }

  showErrorMessage(message){
    Swal.fire({
      title: 'Somthing went wrong',
      text:message,
      icon: 'error'
    })
  }

}
