import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  private getCategoriesURL: string =environment.productService+'/category/';
  private getParentCategoriesURL: string =environment.productService+'/category/parentCategories';
  private postCategoriesURL: string =environment.productService+'/category/';
  private deleteCategoriesURL: string =environment.productService+'/category/';
  private updateCategoriesURL: string =environment.productService+'/category/';

  constructor(private http:HttpClient) { }
  getAllCategory(){
    return this.http.get<any>(this.getCategoriesURL)
  }

  getAllParentCategories(){
    return this.http.get<any>(this.getParentCategoriesURL)
  }

  createCategory(categotry: any) {
  return  this.http.post(this.postCategoriesURL,categotry).pipe( catchError(this.errorHandl))
  }
  deleteCategory(categoryId: any) {
    return  this.http.delete(this.deleteCategoriesURL+categoryId).pipe( catchError(this.errorHandl))
  }

  updateCategory(categotry: any ){
    return this.http.put(this.updateCategoriesURL+categotry.id,categotry);
    
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
