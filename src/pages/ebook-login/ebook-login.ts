import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import { ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { EbookRegisterPage } from '../ebook-register/ebook-register';
import { EbookPage } from '../ebook/ebook';
import {ForgotPasswordPage} from '../../pages/forgot-password/forgot-password';


@IonicPage()
@Component({
  selector: 'page-ebook-login',
  templateUrl: 'ebook-login.html',
})
export class EbookLoginPage {
  loginId :any;
  password :any;
  responseData : any;
  messages : string = '';
  constructor(public navCtrl: NavController,private authService:AuthService,public toastCtrl: ToastController, public navParams: NavParams, private loadingCtrl:LoadingController) {
  }

  LoginuserData = {"loginId": this.loginId,"password": this.password};
  ionViewDidLoad() {
    console.log('ionViewDidLoad EbookLoginPage');
  }

 Toast(Message : string){
    let toast = this.toastCtrl.create({
      message: Message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present(toast);
  }
  signup(){
    this.navCtrl.push(EbookRegisterPage);
  }
  forgotpassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }
  ebooklogin(pass: NgForm){ 
    if(this.LoginuserData.loginId != undefined && this.LoginuserData.password != undefined)
    {
      let loader = this.loadingCtrl.create({
        content: "Sign in..."
      });
      loader.present();
     this.authService.eBookLogin(this.LoginuserData).then((result) => {
      if(result['status'] == 'true')
      {
        this.responseData = result;
        localStorage.setItem('LoginuserData', JSON.stringify(this.responseData));
        this.messages  = result['message'];
        loader.dismiss();
        this.Toast("SignIn Successfully");
      
        this.navCtrl.push(EbookPage);
      }else
      {
        loader.dismiss();
        this.messages  = result['message'];
        this.Toast(this.messages);
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
