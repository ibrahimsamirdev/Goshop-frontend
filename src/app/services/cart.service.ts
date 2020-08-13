import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  addToCart(data): void {
    const products = JSON.parse(localStorage.getItem("avct_item")) || [];
    products.push(data);

    // this.toastrService.wait(
    //   "Adding Product to Cart",
    //   "Product Adding to the cart"
    // );
    // setTimeout(() => {
    //   localStorage.setItem("avct_item", JSON.stringify(a));
    // }, 500);

    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  updateCart(products){
    localStorage.setItem("avct_item", JSON.stringify(products));
  }
  // Removing cart from local
  // removeLocalCartProduct(product) {
  //   const products = JSON.parse(localStorage.getItem("avct_item"));

  //   for (let i = 0; i < products.length; i++) {
  //     if (products[i].id === product.id) {
  //       products.splice(i, 1);
  //       break;
  //     }
  //   }
  //   // ReAdding the products after remove
  //   localStorage.setItem("avct_item", JSON.stringify(products));
  // }

  // Fetching Locat CartsProducts
  getLocalCartProducts() {
    const products =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }

  getPaymentMethodByUserId(userId){
    return this.httpClient.get(environment.userManagement+"/api/paymentmethod/user/"+userId).pipe(
      catchError(this.errorHandl)
    );
    
  }

  addPaymentMethod(paymentMethod){
    return this.httpClient.post(environment.userManagement+"/api/paymentmethod", paymentMethod).pipe(
      catchError(this.errorHandl)
    );
  }

  getShippingAddressByUserId(userId){
    return this.httpClient.get(environment.userManagement+"/api/address/user/shipping/"+userId).pipe(
      catchError(this.errorHandl)
    );
    
  }

  addShippingAddress(shippingAddress){
    return this.httpClient.post(environment.userManagement+"/api/address", shippingAddress).pipe(
      catchError(this.errorHandl)
    );
  }

   // Error handling
   errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }else if(error.error instanceof ProgressEvent) {
      // Get client-side error
      errorMessage = error.message;
    }  else {
      // Get server-side error
      errorMessage = error.error;
      // `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('>>> erroe message: ',errorMessage);
    console.log('>>> erroe : ',error);
    return throwError(errorMessage);
 }
}
