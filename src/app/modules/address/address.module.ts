import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './address.routing';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule, MatIconModule, MatRadioModule, MatSlideToggleModule } from '@angular/material';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule,MatCardModule,
        MatIconModule,MatRadioModule,GooglePlaceModule,
        MatSlideToggleModule,ReactiveFormsModule,HttpModule
    ],
    declarations:[AddressComponent],
    exports: []
  })
  export class AddressModule {
   
  }
  