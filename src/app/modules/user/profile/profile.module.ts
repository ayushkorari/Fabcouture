import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatCardModule, MatTabsModule, MatIconModule, MatRadioModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { routing } from './profile.routing';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, SharedModule,
    MatCardModule, MatTabsModule, MatIconModule, MatRadioModule, MatButtonModule,
    routing
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
