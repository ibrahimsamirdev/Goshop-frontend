import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PormotionService {

 
  addPormotionsURL: string =environment.productService+'/promotion/';
  upadtePormotionsURL: string =environment.productService+'/promotion/';
  getPormotionsURL: string =environment.productService+'/promotion/';

  constructor(private http: HttpClient) { }
  getAllPormotion() {
    return this.http.get<any>(this.getPormotionsURL);
  }
  
  updatePormotion(PormotionToUpdate: any) {
    return this.http.put(this.upadtePormotionsURL+PormotionToUpdate.id,PormotionToUpdate);

  }
  deletePormotion(userId: any) {
    return this.http.delete(this.upadtePormotionsURL+userId);

  }
  createdPormotion(pormotion: any) {
 
   return this.http.post(this.addPormotionsURL,pormotion);

  }

  
}
