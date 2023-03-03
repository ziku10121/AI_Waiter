import { Component, Inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgwWowService } from 'ngx-wow';
import { Constants } from 'src/models/contants.models';
import { MyEvent } from 'src/services/myevent.services';
import { AppConfig, APP_CONFIG } from './app.config';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hungerz-counter';
  rtlSide = "left";
  showHeader: boolean = true;
  constructor(
    @Inject(APP_CONFIG) public config: AppConfig, private router: Router, private wowService: NgwWowService,
    private translate: TranslateService, private myEvent: MyEvent) {
    this.initializeApp();
    // console.log(this.router)
    this.wowService.init();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        console.log(event.url);
        if (event.url == "/" || event.url == "/login"|| event.url == "/ai_home" || event.url == "/ai_order") this.showHeader = false; else this.showHeader = true;
      }
    });
    this.myEvent.getLanguageObservable().subscribe(value => {
      this.router.navigateByUrl('login');
      this.globalize(value);
    });
  }
  // ngAfterViewInit(){
  //   $("#menu").on("click", function () {
  //     $("#header").toggleClass("active");
  //   });
  // }

  initializeApp() {
    let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    // this.router.navigateByUrl('login');
    this.showHeader = true;
    this.globalize(defaultLang);

  }

  globalize(languagePriority) {
    this.translate.setDefaultLang("en");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case 'ar': {
        this.rtlSide = "rtl";
        break;
      }
      default: {
        this.rtlSide = "ltr";
        break;
      }
    }
  }
  menu() {
    $("#header").toggleClass("active");
  }
  dashboard() {
    this.router.navigateByUrl('dashboard');
  }
  home() {
    this.router.navigateByUrl('home');
  }
  transactions() {
    this.router.navigateByUrl('transactions');
  }
  booking() {
    this.router.navigateByUrl('booking');
  }
  orders_status() {
    this.router.navigateByUrl('orders_status');
  }
  people() {
    this.menu();
    this.router.navigateByUrl('people');
  }
  wallet() {
    this.menu();
    this.router.navigateByUrl('wallet');
  }
  items() {
    this.menu();
    this.router.navigateByUrl('items');
  }
  reviews() {
    this.menu();
    this.router.navigateByUrl('reviews');
  }
  authentication() {
    this.menu();
    this.router.navigateByUrl('authentication');
  }
  setting() {
    this.menu();
    this.router.navigateByUrl('setting');
  }
  support() {
    this.menu();
    this.router.navigateByUrl('support');
  }
  terms_conditions() {
    this.menu();
    this.router.navigateByUrl('terms_conditions');
  }
  login() {
    this.router.navigateByUrl('login');
  }
  change_language(){
    this.menu();
    this.router.navigateByUrl('change_language');
  }
}
