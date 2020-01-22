import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { Market } from '@ionic-native/market';
// import { FileTransfer } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';

import { AuthService  } from '../providers/getdata/authService';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EbookPage } from '../pages/ebook/ebook';
import {EbookLoginPage} from '../pages/ebook-login/ebook-login';
import {EbookRegisterPage} from '../pages/ebook-register/ebook-register';
import {EbookCartPage} from '../pages/ebook-cart/ebook-cart';
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import {PaymentPage} from '../pages/payment/payment';
import {MyorderPage} from '../pages/myorder/myorder';
import {OrderDetailsPage} from '../pages/order-details/order-details';

import { Device } from '@ionic-native/device/ngx';

import { ProductPage } from '../pages/product/product';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';
// import { CallNumber } from '@ionic-native/call-number';


@NgModule({
  declarations: [
    MyApp,
    HomePage,   
    EbookPage,
    ProductPage,
    EbookLoginPage,
    EbookRegisterPage,
    EbookCartPage,
    ForgotPasswordPage,
    PaymentPage,
    MyorderPage,
    OrderDetailsPage
  ],
  imports: [
    BrowserModule,   
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp,{
      menuType:'push'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EbookPage,
    ProductPage,
    EbookLoginPage,
    EbookRegisterPage,
    EbookCartPage,
    ForgotPasswordPage,
    PaymentPage,
    MyorderPage,
    OrderDetailsPage
  ],
  providers: [
    StatusBar,
    AuthService,
    InAppBrowser,
    DocumentViewer,
    Market,
    Device,
    // FileTransfer,
    // File,
    SplashScreen,
    AppVersion,
    // CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
