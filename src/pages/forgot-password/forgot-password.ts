import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import {EbookLoginPage} from '../../pages/ebook-login/ebook-login';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  loginId :any;
  LoginuserData:any;
  responseData:any;
  messages:any;
  msg:boolean = true;
    constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, private loadingCtrl:LoadingController,private authService:AuthService) {
    this.LoginuserData = {"loginId": this.loginId};
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  Toast(Message : string){
    let toast = this.toastCtrl.create({
      message: Message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present(toast);
  }

  signin(){
    this.navCtrl.push(EbookLoginPage);
  }
  ebookForgot(pass: NgForm){ 
    if(this.LoginuserData.loginId != undefined)
    {
      let loader = this.loadingCtrl.create({
        content: "Sending...."
      });
      loader.present();
     this.authService.eBookForgot(this.LoginuserData).then((result) => {
      if(result['status'] == 'true')
      {
        this.responseData = result;       
        this.messages  = result['message'];
        loader.dismiss();
        console.log(result['data']);
        this.Toast(result['message']);    
        this.msg = false;  
        this.LoginuserData.loginId = "";
       // this.navCtrl.push(EbookPage);
      }else
      {
        loader.dismiss();
        this.messages  = result['message'];
        this.Toast(this.messages);
        this.msg = true;  
      }
    }, (err) => {
      loader.dismiss();
      console.log(err,'Error');
      this.Toast('Somthing Wrong Please Try Again.');      
    });
    }else
    {      
      this.Toast('Please Fill All Fields.');
    }
  }
  


}
