import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { NewOrderPage } from '../pages/new-order/new-order';
import { DistributeOrderPage } from '../pages/distribute-order/distribute-order';
import { ListOrderPage } from '../pages/list-order/list-order';
import { TrackingOrderPage } from '../pages/tracking-order/tracking-order';
import { RegisterPage } from '../pages/register/register';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  pagescs: Array<{title: string, component: any}>;
  pagescsh: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'New Order', component: NewOrderPage },
      { title: 'Distribute Order', component: DistributeOrderPage },
      { title: 'List Order', component: ListOrderPage },
      { title: 'Tracking Order', component: TrackingOrderPage }

    ];

    this.pagescsh = [
      { title: 'Home', component: HomePage },
      { title: 'New Order', component: NewOrderPage },
      { title: 'Distribute Order', component: DistributeOrderPage },
      { title: 'List Order', component: ListOrderPage },
      { title: 'Tracking Order', component: TrackingOrderPage },
      { title: 'Register User', component: RegisterPage }
    ];

    this.pagescs = [
      { title: 'Home', component: HomePage },
      { title: 'New Order', component: NewOrderPage },
      { title: 'List Order', component: ListOrderPage },
      { title: 'Tracking Order', component: TrackingOrderPage }

    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
