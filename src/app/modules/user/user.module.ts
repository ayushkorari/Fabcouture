import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { userRouting } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    userRouting,
    SharedModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
