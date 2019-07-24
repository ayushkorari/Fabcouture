import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './payment.routing';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatTabsModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule,HttpModule,
        MatButtonModule,MatTabsModule,MatCardModule,ReactiveFormsModule
    ],
    declarations:[PaymentComponent],
    exports: []
  })
  export class PaymentModule {
   
  }
  