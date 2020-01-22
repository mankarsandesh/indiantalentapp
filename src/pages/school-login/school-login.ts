import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import { ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-school-login',
  templateUrl: 'school-login.html',
})
export class SchoolLoginPage {

  loginId :any;
  password :any;
  responseData : any;
  messages : string = '';

  constructor(public navCtrl: NavController,private authService:AuthService,public toastCtrl: ToastController, public navParams: NavParams, private loadingCtrl:LoadingController) {
  }

  LoginuserData = {"loginId": this.loginId,"password": this.password};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolLoginPage');
  }

  Toast(Message : string){
    let toast = this.toastCtrl.create({
      message: Message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present(toast);
  }
 
  login(pass: NgForm){ 
    if(this.LoginuserData.loginId != undefined && this.LoginuserData.password != undefined)
    {
      let loader = this.loadingCtrl.create({
        content: "Sign in..."
      });
      loader.present();
     this.authService.Login(this.LoginuserData).then((result) => {
      if(result['status'] == 'true')
      {
        this.responseData = result;
        localStorage.setItem('LoginuserData', JSON.stringify(this.responseData));
        this.messages  = result['message'];
        loader.dismiss();
        this.Toast("SignIn Successfully");
        pass.resetForm();
        console.log(this.messages);
        this.navCtrl.push("InfoPage");
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
