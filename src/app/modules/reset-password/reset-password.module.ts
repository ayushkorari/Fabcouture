import { NgModule } from '@angular/core';
import { routing } from './reset-password.routing';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule, MatTabsModule, MatIconModule, MatRadioModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports:
        [
            CommonModule, routing, SharedModule, MatCardModule, MatButtonModule,
            MatTabsModule, MatIconModule, MatRadioModule, ReactiveFormsModule,
        ],
    declarations: [ResetPasswordComponent],
})
export class ResetPasswordModule {

}
