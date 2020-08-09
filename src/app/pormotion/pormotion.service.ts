import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PormotionService {

  getPormotionsURL: string =environment.productservice+'/promotion/';

  constructor(private http: HttpClient) { }
  getAllPormotion() {
    return this.http.get<any>(this.getPormotionsURL);
  }
  
 

  createdPormotion(pormotion: any) {
   // need link
    return this.http.delete(environment.userManagement+"/api/user/", {responseType:'text' as 'json'});
  }

  
}
