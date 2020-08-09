import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(username,password){
    let data= new FormData();
    data.append('email', username);
    data.append('password', password);
    return this.httpClient.post(environment.apiGateway+'/api/signin',data, {responseType: 'text' as 'json'})
    .pipe(
      catchError(this.errorHandl)
    );
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isLoggedin(){
    return (localStorage.getItem('token') ==null)? false:true;
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

 getAllRoles(){
   return this.httpClient.get(environment.userManagement+"/api/role");
 }

 getVendorEmployeesRoles(){
  return this.httpClient.get(environment.userManagement+"/api/role/vendor/employees");
}

 getAllVendors(){
    return this.httpClient.get(environment.userManagement+"/api/user/vendors");
 }

 createUser(user){
  return this.httpClient.post(environment.userManagement+"/api/user",user);
 }

 deleteUser(userId){
   return this.httpClient.delete(environment.userManagement+"/api/user/"+userId, {responseType:'text' as 'json'});
 }

 updateUser(user){
   return this.httpClient.put(environment.userManagement+"/api/user",user);
 }
}

