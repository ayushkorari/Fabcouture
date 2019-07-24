import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchPipe,
  ],
  exports: [
    SearchPipe,
  ]

})
export class SearchPipeModule { }
