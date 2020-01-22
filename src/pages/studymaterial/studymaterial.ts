import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { EbookLoginPage } from '../ebook-login/ebook-login';

@IonicPage()
@Component({
  selector: 'page-studymaterial',
  templateUrl: 'studymaterial.html',
})
export class StudymaterialPage {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor(public navCtrl: NavController, public navParams: NavParams, private theInAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudymaterialPage');
  }

//   public openWithInAppBrowser(){
//     let target = "_blank";
//     let url:string = "https://ebook.indiantalent.org/";
//     this.theInAppBrowser.create(url,target,this.options); 
// }

loginpage(){
  this.navCtrl.push(EbookLoginPage);
}

// public openWithInAppBrowser3(){
//   let target = "_blank";
//   let url:string = "https://ebook.indiantalent.org/questionpaper.php";
//   this.theInAppBrowser.create(url,target,this.options); 
// }

}
