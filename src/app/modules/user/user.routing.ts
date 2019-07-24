import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: 'wishlist', loadChildren: './wishlist/wishlist.module#WishlistModule' },
            { path: 'orders', loadChildren: './order/order.module#OrderModule' },
            { path: 'profile/:action', loadChildren: './profile/profile.module#ProfileModule' },
        ]
    }
];

export const userRouting: ModuleWithProviders = RouterModule.forChild(routes);