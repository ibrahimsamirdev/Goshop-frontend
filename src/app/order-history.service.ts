import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {


  getPormotionsURL: string =environment.orderService+'/order/';

  constructor(private Http:HttpClient) { }

  getAllOrders( id) {
    return this.Http.get(this.getPormotionsURL+"/user/"+id).pipe(
      catchError(this.errorHandl)
    );
  }
  getAllOrderProductData(list: any[]) {
    return this.Http.get(this.getPormotionsURL+"/user/"+list).pipe(
      catchError(this.errorHandl)
    );
  }
  getAllOrderData(id: any) {
    return this.Http.get(this.getPormotionsURL+"/user/"+id).pipe(
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
