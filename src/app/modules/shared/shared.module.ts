import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './services/http.service';
import { TokenInterceptor } from '../../Interceptors/token.interceptor';
import { HomeGuard } from '../../guards/home.guard';
import { AccountGuard } from '../../guards/account.guard';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ConfirmationModalComponent,
    FooterComponent
  ],
  exports : [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    FooterComponent,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  providers: [
    HttpService,
    HomeGuard,
    AccountGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
