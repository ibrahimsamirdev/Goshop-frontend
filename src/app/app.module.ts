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
import { SidenavComponent } from './sidenav/sidenav.component';
import { VendorEmployeesComponent } from './vendor-employees/vendor-employees.component';
import { VendorAddUserComponent } from './vendor-add-user/vendor-add-user.component';
import { VendorEditUserComponent } from './vendor-edit-user/vendor-edit-user.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { VendorAddProductComponent } from './vendor-add-product/vendor-add-product.component';
import { VendorEditProductComponent } from './vendor-edit-product/vendor-edit-product.component';




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
    VendorEditProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
