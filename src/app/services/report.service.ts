import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }


  getVendorReposrt(vendorId){
   return this.httpClient.get(environment.reportService+"/report/VendorReportSales/"+vendorId).pipe(
    catchError(this.errorHandl)
   );
  }

  getAdminReposrt(){
    return this.httpClient.get(environment.reportService+"/report/AdminReportSales").pipe(
     catchError(this.errorHandl)
    );
   }

   emailAdminReposrt(mailDto){
     return this.httpClient.post(environment.reportService+"/email/emailAdminReport", mailDto).pipe(
       catchError(this.errorHandl)
     );
   }

   emailVendorReposrt(vendorId, mailDto){
    return this.httpClient.post(environment.reportService+"/email/emailVendorReport/"+vendorId, mailDto).pipe(
      catchError(this.errorHandl)
    );
  }
  

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
