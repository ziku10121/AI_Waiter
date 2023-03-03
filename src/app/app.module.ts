import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { APP_CONFIG, BaseAppConfig } from './app.config';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BookingComponent } from './booking/booking.component';
import { ItemsComponent } from './items/items.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';
import { PeopleComponent } from './people/people.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SettingComponent } from './setting/setting.component';
import { SupportComponent } from './support/support.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UploadItemComponent } from './upload-item/upload-item.component';
import { WalletComponent } from './wallet/wallet.component';
import { NgwWowModule } from 'ngx-wow';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AiHomeComponent } from './ai-home/ai-home.component';
import { AiOrderComponent } from './ai-order/ai-order.component';
import { AiCheckComponent } from './ai-check/ai-check.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    AuthenticationComponent,
    BookingComponent,
    ItemsComponent,
    OrdersStatusComponent,
    PeopleComponent,
    ReviewsComponent,
    SettingComponent,
    SupportComponent,
    TermsConditionsComponent,
    TransactionsComponent,
    UploadItemComponent,
    WalletComponent,
    ChangeLanguageComponent,
    AiHomeComponent,
    AiOrderComponent,
    AiCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgwWowModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: APP_CONFIG, useValue: BaseAppConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
