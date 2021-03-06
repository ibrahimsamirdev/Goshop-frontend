import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }


  getAllProducts(){
    return this.httpClient.get(environment.productService+"/product/").pipe(
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

  publishProduct(productId){
    return this.httpClient.get(environment.productService+"/product/publish/"+productId).pipe(
      catchError(this.errorHandl)
    );
  }

  unPublishProduct(productId){
    return this.httpClient.get(environment.productService+"/product/unPublish/"+productId).pipe(
      catchError(this.errorHandl)
    );
  }
  getAllEmployees(){
    return this.httpClient.get(environment.userManagement+"/api/user").pipe(
      catchError(this.errorHandl)
    );
  }

  getActiveEmployees(){
    return this.httpClient.get(environment.userManagement+"/api/user/active").pipe(
      catchError(this.errorHandl)
    );
  }
  getNonActiveEmployees(){
    return this.httpClient.get(environment.userManagement+"/api/user/nonActive").pipe(
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
