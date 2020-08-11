import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { EditPormotionComponent } from './edit-pormotion/edit-pormotion.component';
import { AddPormotionComponent } from './add-pormotion/add-pormotion.component';
import { PormotionComponent } from './pormotion/pormotion.component';
import { PormotionSidenavComponent } from './pormotion-sidenav/pormotion-sidenav.component';





@NgModule({
  declarations: [AddPormotionComponent,
     PormotionComponent,
     EditPormotionComponent,
     PormotionSidenavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {path:'',component:PormotionComponent}
    ])
    
  ]
})
export class PormotionModule { }
