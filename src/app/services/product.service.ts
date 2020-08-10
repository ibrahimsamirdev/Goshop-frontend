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

  getVendorPublishedProducts(vendorId){
    return this.httpClient.get(environment.productService+"/product/published/vendor/"+vendorId).pipe(
      catchError(this.errorHandl)
    );
  }

  getVendorNonPublishedProducts(vendorId){
    return this.httpClient.get(environment.productService+"/product/nonPublished/vendor/"+vendorId).pipe(
      catchError(this.errorHandl)
    );
  }

  deleteProduct(productId){
    return this.httpClient.delete(environment.productService+"/product/"+productId).pipe(
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

  updateProductWithImage(product, image) {
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

    return this.httpClient.put(environment.productService + '/product/updateProductWithImage', body)
    .pipe(catchError(this.errorHandl));
  }

  updateProduct(product) {
   

    return this.httpClient.put(environment.productService + '/product', product)
    .pipe(catchError(this.errorHandl));
  }

  getDeletedProducts(){
    return this.httpClient.get(environment.productService+"/product/deleted").pipe(
      catchError(this.errorHandl)
    );
  }

  getNonDeletedProducts(){
    return this.httpClient.get(environment.productService+"/product/nonDeleted").pipe(
      catchError(this.errorHandl)
    );
  }

  getPublishedProducts(){
    return this.httpClient.get(environment.productService+"/product/published").pipe(
      catchError(this.errorHandl)
    );
  }

  getNonPublishedProducts(){
    return this.httpClient.get(environment.productService+"/product/nonPublished").pipe(
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
