import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VendorEmployeesComponent } from './vendor-employees/vendor-employees.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { CartItemsComponent} from './cart-items/cart-items.component'
import { AuthGuardGuard } from './services/auth-guard.guard';
import { PormotionComponent } from './pormotion/pormotion/pormotion.component';
import { ProductsComponent } from './admin/products/products.component';
import { UsersComponent } from './admin/users/users.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "vendor/employees", component:VendorEmployeesComponent},
  {path: "vendor/products", component:VendorProductsComponent},
  {path:"cart/cart-items", 
  component:CartItemsComponent,
  canActivate: [AuthGuardGuard]
},
  {path: "pormotion", component:PormotionComponent},
  {path: "admin/products", component:ProductsComponent},
  {path: "admin/users", component:UsersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
