import { Component, OnInit } from '@angular/core';
import { VendorAddProductComponent } from '../vendor-add-product/vendor-add-product.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { VendorEditProductComponent } from '../vendor-edit-product/vendor-edit-product.component';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.css']
})
export class VendorProductsComponent implements OnInit {

  products;
  errorMessage;
  productsType="allProducts";
  constructor(public matDialog: MatDialog, private productService: ProductService
    ,private userService: UserService) { }

  ngOnInit(): void {

    let currentUser = this.userService.getCurrentUser();
    
    if(currentUser != null){
      let vendorId = currentUser.id;
      this.getVendorProducts(vendorId);
    }else{
      this.errorMessage= "please login first"
    }
  }

  fetchProductsBy(event){
    let value = event.target.value;
    console.log(">>change products: ",value);
    if(value != this.productsType){
      this.productsType = value;
      let vendorId = this.userService.getCurrentUser().id;
      if(value == 'allProducts'){
        this.getVendorProducts(vendorId);
      }else if(value == 'published'){
        this.getVendorPublishedProducts(vendorId);
      }else{
        this.getVendorNonPublishedProducts(vendorId);
      }
    }

  }
  getVendorProducts(vendorId){
    this.productService.getVendorProducts(vendorId).subscribe(data => {
      this.products = data;
      if(this.products == null){
        this.products =[];
      }

    },
    (error) => {
      this.errorMessage = error;
    });
  }

  getVendorPublishedProducts(vendorId){
    this.productService.getVendorPublishedProducts(vendorId).subscribe(data => {
      this.products = data;
      if(this.products == null){
        this.products =[];
      }

    },
    (error) => {
      this.errorMessage = error;
    });
  }

  getVendorNonPublishedProducts(vendorId){
    this.productService.getVendorNonPublishedProducts(vendorId).subscribe(data => {
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
