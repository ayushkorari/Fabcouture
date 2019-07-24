import { NgModule } from '@angular/core';
import { routing } from './login.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule, MatTabsModule, MatIconModule, MatRadioModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("426219765571-i3j939uipq8t4k7ooiagbrr37dhj03qr.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("264268624108431")
    }
]);

export function provideConfig() {
    return config;
}
@NgModule({
    imports:
        [
            CommonModule, routing, SharedModule, MatCardModule, MatButtonModule,
            MatTabsModule, MatIconModule, MatRadioModule, ReactiveFormsModule,
            SocialLoginModule
        ],
    declarations: [LoginComponent],
    exports: [],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ]
})
export class LoginModule {

}
