import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  login(username,password){
    let data= new FormData();
    data.append('email', username);
    data.append('password', password);
    return this.httpClient.post(environment.apiGateway+'/api/signin',data)
    .pipe(
      catchError(this.errorHandl)
    );
  }

  register(user){

    return this.httpClient.post(environment.apiGateway+'/api/register',user, {responseType: 'text' as 'json'});
  }

  vendorEmployees(vendorId){
    return this.httpClient.get(environment.userManagement+'/api/user/employees/'+vendorId);
    
  }

  getAllUsers(){
    return this.httpClient.get(environment.userManagement+"/api/user");
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
