import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private getCategoriesURL: string =environment.productService+'/category/';

  constructor(private http:HttpClient) { }
  getAllCategory(){
    return this.http.get<any>(this.getCategoriesURL)
  }
}
