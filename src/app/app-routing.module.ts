import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { AccountGuard } from './guards/account.guard';

const routes: Routes = [
  { path:'' , redirectTo:'home',pathMatch:'full' },
  { path:'home',loadChildren:'./modules/home/home.module#HomeModule'},
  { path:'login',loadChildren:'./modules/login/login.module#LoginModule',canLoad:[AccountGuard],canActivate:[AccountGuard] },
  { path:'reset-password/:token',loadChildren:'./modules/reset-password/reset-password.module#ResetPasswordModule',canLoad:[AccountGuard],canActivate:[AccountGuard] },
  { path:'user',loadChildren:'./modules/user/user.module#UserModule',canLoad:[HomeGuard],canActivate:[HomeGuard] },
  { path:'cart',loadChildren:'./modules/cart/cart.module#CartModule' },
  { path:'address',loadChildren:'./modules/address/address.module#AddressModule',canLoad:[HomeGuard],canActivate:[HomeGuard] },
  { path:'payment',loadChildren:'./modules/payment/payment.module#PaymentModule',canLoad:[HomeGuard],canActivate:[HomeGuard] },
  { path: 'product-page/:data', loadChildren: './modules/product-page/product-page.module#ProductPageModule' },
  { path:'product-detail/:id',loadChildren:'./modules/product-detail/product-detail.module#ProductDetailModule' },
  { path:'faq',loadChildren:'./modules/faq/faq.module#FaqModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
