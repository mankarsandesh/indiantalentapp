import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logout:string;
  dis:boolean = true;
  appversion: any;
  constructor(public navCtrl: NavController,private toast: ToastController,private appVersion: AppVersion,private navparams:NavParams) {
    this.logout = navparams.get('back');

    console.log(this.logout);
    if (this.logout) {
      this.dis = true;    
      console.log("true");
    } else {
      this.dis = false;
      console.log("false");
    }


    this.appVersion.getVersionNumber().then((version)=>{
      this.appversion = version;
    });
  }

  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
}

  schoolLogin(){
    this.navCtrl.push("SchoolLoginPage");
  }
  inviteschool(){
    this.navCtrl.push("InviteSchoolPage");
  }
  bcoordintor(){
    this.navCtrl.push("BcoordinatorPage");
  }
  sudentResult(){
    this.navCtrl.push("ResultPage");
  }
  news(){
    this.navCtrl.push("NewsPage");
  }

  

}
