import { Pro } from '@ionic/pro';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { NewOrderPage } from '../pages/new-order/new-order';
import { NewOrderAlamatPage } from '../pages/new-order-alamat/new-order-alamat';
import { NewOrderStrukturPage } from '../pages/new-order-struktur/new-order-struktur';
import { NewOrderKeteranganPage } from '../pages/new-order-keterangan/new-order-keterangan';
import { DistributeOrderPage } from'../pages/distribute-order/distribute-order';
import { DistributeOrderInputPage } from '../pages/distribute-order-input/distribute-order-input';
import { ListOrderPage } from '../pages/list-order/list-order';
import { ListOrderDetailPage } from '../pages/list-order-detail/list-order-detail';
import { TrackingOrderPage } from '../pages/tracking-order/tracking-order';
import { TrackingOrderResultPage } from '../pages/tracking-order-result/tracking-order-result';
import { TrackingOrderDetailPage } from '../pages/tracking-order-detail/tracking-order-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { OrderServiceProvider } from '../providers/order-service/order-service';

Pro.init('a70e6ba7', {
  appVersion: '1.0'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    NewOrderPage,
    NewOrderAlamatPage,
    NewOrderStrukturPage,
    NewOrderKeteranganPage,
    DistributeOrderPage,
    DistributeOrderInputPage,
    ListOrderPage,
    ListOrderDetailPage,
    TrackingOrderPage,
    TrackingOrderResultPage,
    TrackingOrderDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    NewOrderPage,
    NewOrderAlamatPage,
    NewOrderStrukturPage,
    NewOrderKeteranganPage,
    DistributeOrderPage,
    DistributeOrderInputPage,
    ListOrderPage,
    ListOrderDetailPage,
    TrackingOrderPage,
    TrackingOrderResultPage,
    TrackingOrderDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicErrorHandler,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    AuthServiceProvider,
    OrderServiceProvider
  ]
})
export class AppModule {}
