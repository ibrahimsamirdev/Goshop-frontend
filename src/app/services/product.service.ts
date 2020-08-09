import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getVendorProducts(vendorId){
    return this.httpClient.get(environment.productService+"/product/vendor/"+vendorId).pipe(
      catchError(this.errorHandl)
    );
  }

  deleteProduct(productId){
    return this.httpClient.delete(environment.userManagement+"/api/product/"+productId, {responseType:'text' as 'json'}).pipe(
     catchError(this.errorHandl)
   );
  }

  getSubCategories(){
    return this.httpClient.get(environment.productService+"/category/subCategories")
    .pipe(catchError(this.errorHandl));
  }

  createProduct(product, image) {
    // const options = { responseType: 'text' as 'json', headers };
    let body = new FormData();
    // for (let image of images) {
    //   body.append('images', image);
    // }

    body.append('image', image);
    body.append("product", new Blob([JSON.stringify(product)],
      {
        type: "application/json"
      }));

    return this.httpClient.post(environment.productService + '/product/uploadProduct', body)
    .pipe(catchError(this.errorHandl));
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
