import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiCheckComponent } from './ai-check/ai-check.component';
import { AiHomeComponent } from './ai-home/ai-home.component';
import { AiOrderComponent } from './ai-order/ai-order.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BookingComponent } from './booking/booking.component';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';
import { PeopleComponent } from './people/people.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SettingComponent } from './setting/setting.component';
import { SupportComponent } from './support/support.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UploadItemComponent } from './upload-item/upload-item.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  { path: "", redirectTo: "ai_home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "home", component: HomeComponent },
  { path: "booking", component: BookingComponent },
  { path: "authentication", component: AuthenticationComponent },
  { path: "items", component: ItemsComponent },
  { path: "orders_status", component: OrdersStatusComponent },
  { path: "people", component: PeopleComponent },
  { path: "reviews", component: ReviewsComponent },
  { path: "setting", component: SettingComponent },
  { path: "support", component: SupportComponent },
  { path: "terms_conditions", component: TermsConditionsComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "upload_item", component: UploadItemComponent },
  { path: "wallet", component: WalletComponent },
  { path: "change_language", component: ChangeLanguageComponent },
  { path: "ai_home", component:AiHomeComponent },
  { path: "ai_order", component:AiOrderComponent },
  { path: "ai_check", component:AiCheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
