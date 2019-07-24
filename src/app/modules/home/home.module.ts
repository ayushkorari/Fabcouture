import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SingleProductModule } from '../single-product/single-product.module';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
const routes: Routes = [
  { path: '', component: HomeComponent }
]
@NgModule({
  imports: [
    CommonModule,
    SingleProductModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatIconModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
