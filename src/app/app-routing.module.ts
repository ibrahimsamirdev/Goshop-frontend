import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VendorEmployeesComponent } from './vendor-employees/vendor-employees.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { CartItemsComponent } from './cart-items/cart-items.component'
import { AuthGuardGuard } from './services/auth-guard.guard';
import { PormotionComponent } from './pormotion/pormotion/pormotion.component';
import { ProductsComponent } from './admin/products/products.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { UsersComponent } from './admin/users/users.component';
import { CategoryComponent } from './admin/category/category/category.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ProductComponent } from './product/product.component';



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "vendor/employees", component: VendorEmployeesComponent },
  { path: "vendor/products", component: VendorProductsComponent },

  {
    path: "cart/cart-items", component: CartItemsComponent
    // , canActivate: [AuthGuardGuard]
  },
  { path: "pormotion", component: PormotionComponent },
  { path: "admin/products", component: ProductsComponent },
  { path: "vendor/dashboard", component: VendorDashboardComponent },

  { path: "checkouts", component: CheckoutComponent },
  { path: "payment-method", component: PaymentMethodComponent },
  { path: "shipping-details", component: ShippingDetailsComponent },
  { path: "billing-details", component: BillingDetailsComponent },
  { path: "confirm-order", component: ConfirmOrderComponent },
  { path: "category", component: CategoryComponent },
  { path: "admin/users", component: UsersComponent },

  { path: "product/:id", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
