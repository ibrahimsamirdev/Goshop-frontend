import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VendorEmployeesComponent } from './vendor-employees/vendor-employees.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { VendorAddUserComponent } from './vendor-add-user/vendor-add-user.component';
import { VendorEditUserComponent } from './vendor-edit-user/vendor-edit-user.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { VendorAddProductComponent } from './vendor-add-product/vendor-add-product.component';
import { VendorEditProductComponent } from './vendor-edit-product/vendor-edit-product.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { ProductComponent } from './product/product.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { ChartsModule } from 'ng2-charts';


import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderHistoryDetailsComponent } from './order-history-details/order-history-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    SidenavComponent,
    VendorEmployeesComponent,
    VendorAddUserComponent,
    VendorEditUserComponent,
    VendorProductsComponent,
    VendorAddProductComponent,
    VendorEditProductComponent,
    CartItemsComponent,
    DashboardComponent,
    VendorDashboardComponent,
    
    ProductComponent,
    CheckoutComponent,
    ShippingDetailsComponent,
    BillingDetailsComponent,
    ConfirmOrderComponent,
    PaymentMethodComponent,
    OrderHistoryComponent,
    OrderHistoryDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialModule,
    HttpClientModule,
    AdminModule,
    RouterModule.forRoot([
      { path: 'pormotion', loadChildren: () => import('./pormotion/pormotion.module').then(m => m.PormotionModule) }

    ])
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
