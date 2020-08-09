import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VendorEmployeesComponent } from './vendor-employees/vendor-employees.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { PormotionModule } from './pormotion/pormotion.module';
import { AddPormotionComponent } from './pormotion/add-pormotion/add-pormotion.component';
import { PormotionComponent } from './pormotion/pormotion/pormotion.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "vendor/employees", component:VendorEmployeesComponent},
  {path: "vendor/products", component:VendorProductsComponent},
  {path: "pormotion", component:PormotionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
