import { NgModule, ModuleWithProviders } from '@angular/core';
import { routing } from './faq.routing';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule, MatCardModule } from '@angular/material';
@NgModule({
    imports: 
    [
        CommonModule,routing,SharedModule,MatExpansionModule,MatCardModule
    ],
    declarations:[FaqComponent],
    exports: []
  })
  export class FaqModule {
   
  }
  