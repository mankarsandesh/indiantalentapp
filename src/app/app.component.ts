import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController , } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { EbookLoginPage } from '../pages/ebook-login/ebook-login';
import {EbookRegisterPage} from '../pages/ebook-register/ebook-register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,logo: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public menuCtl:MenuController, public sBar:StatusBar) {
    console.log(localStorage.getItem('LoginuserData'));
    
    this.initializeApp();
    sBar.overlaysWebView(true);
    sBar.show();
    sBar.backgroundColorByHexString('#2868cc'); 
    sBar.styleLightContent();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage  ,logo:'home'},     
      { title: 'eBook', component: EbookLoginPage ,logo:'copy'},     
      // { title: 'News', component: "NewsPage" ,logo:'lock'},
      { title: 'School Login', component: "SchoolLoginPage" ,logo:'lock'},
      { title: 'Student Result', component: "ResultPage" ,logo:'paper'},
      { title: 'Become Coordinator', component: "BcoordinatorPage" ,logo:'person'},
      { title: 'Exam Pattern', component: "ExampatternPage" ,logo:'paper'},
      { title: 'Study Material', component: "StudymaterialPage" ,logo:'paper'},
      { title: 'Refer a School', component: "InviteSchoolPage" ,logo:'person'},
      { title: 'Contact', component: "ContactPage" ,logo:'contact'}
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  

  openPage(page) {
    this.menuCtl.close();
    this.nav.setRoot(page.component);
  }

}
