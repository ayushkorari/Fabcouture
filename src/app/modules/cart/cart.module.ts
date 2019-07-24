import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './cart.routing';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule,
        MatIconModule,MatSelectModule,MatOptionModule,
        ReactiveFormsModule,
        MatIconModule
    ],
    declarations:[CartComponent],
    exports: []
  })
  export class CartModule {
   
  }
  