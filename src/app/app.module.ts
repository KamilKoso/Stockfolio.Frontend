import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FeaturesModule } from './features/features.module';
import { MainModule } from './main/main.module';
import { HttpAuthInterceptor } from './shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/http-error-interceptor';
import { HttpRetryInterceptor } from './shared/interceptors/http-retry.interceptor';
import { UserService } from './shared/services/user/user.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    FeaturesModule,
    SharedModule,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true, deps: [UserService] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [UserService] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true, deps: [UserService] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
