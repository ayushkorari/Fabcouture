import { NgModule } from '@angular/core';
import { routing } from './order.routing';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule, MatCardModule } from '@angular/material';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule,MatExpansionModule,MatCardModule
    ],
    declarations:[OrderComponent],
    exports: []
  })
  export class OrderModule {
   
  }
  