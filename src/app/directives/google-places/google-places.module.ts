import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesDirective } from './google-places.directive';

@NgModule({
  declarations: [GooglePlacesDirective],
  imports: [CommonModule],
  exports: [GooglePlacesDirective]
})
export class GooglePlacesModule {}
