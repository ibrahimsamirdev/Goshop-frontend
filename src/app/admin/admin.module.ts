import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';


import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { HeaderComponent } from '../header/header.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [ProductsComponent, AdminSidenavComponent, UsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {path:'',component:ProductsComponent}
    ])
  ]
})
export class AdminModule { }
