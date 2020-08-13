import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {


  getOrderURL: string =environment.orderService+'/order/';
  getOrderProductsURL: string =environment.productService+'/product/findAllProductIn';

  constructor(private Http:HttpClient) { }

  getAllOrders( id) {
    return this.Http.get(this.getOrderURL+"/user/"+id).pipe(
      catchError(this.errorHandl)
    );
  }
  getAllOrderProductData(list )   {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json'); 
    let myParams = new URLSearchParams();
    myParams.append('list', list);
    return this.Http.post(this.getOrderProductsURL,  list)
  }
 

  getAllOrderData(id: any) {
    return this.Http.get(this.getOrderURL+"/"+id).pipe(
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
