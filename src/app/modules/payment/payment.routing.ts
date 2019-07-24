

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentComponent } from './payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);