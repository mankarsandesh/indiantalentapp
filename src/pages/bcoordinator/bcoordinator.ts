import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-bcoordinator',
  templateUrl: 'bcoordinator.html',
})
export class BcoordinatorPage {

  name:any;
  email:any;
  mobile :any;
  type:any;
  pincode :any;
  address :any;
  city :any;
  taluka :any;
  state :any;
  becomecoordinator:any;
  responseData : any;
  messages : string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private toast: ToastController,private loadingCtrl:LoadingController) {
    this.name = navParams.get('name');
    this.email= navParams.get('email');
    this.mobile = navParams.get('mobile');
    this.type= navParams.get('type');
    this.pincode = navParams.get('pincode');
    this.address = navParams.get('address');
    this.city = navParams.get('city');
    this.taluka = navParams.get('taluka');
    this.state = navParams.get('state');

    this.becomecoordinator = {"name": this.name,"email": this.email,"mobile": this.mobile,"type": this.type,"pincode": this.pincode,"address": this.address,"city": this.city,"taluka": this.taluka,"state": this.state};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BcoordinatorPage');
  }

  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }

  coordinator(pass:NgForm){
    if(this.becomecoordinator.name != undefined  && this.becomecoordinator.email != undefined && this.becomecoordinator.mobile != undefined && this.becomecoordinator.type != undefined && this.becomecoordinator.pincode != undefined && this.becomecoordinator.address != "select" && this.becomecoordinator.city != undefined && this.becomecoordinator.taluka != undefined && this.becomecoordinator.state != undefined){  
       let loader = this.loadingCtrl.create({
         content: "Please Wait..."
       });
       loader.present();
     this.authService.coordinator(this.becomecoordinator).then((result) => {
       if(result['status'] == 'true'){
         console.log(this.becomecoordinator);
         this.responseData = result;
         localStorage.setItem('becomecoordinator', JSON.stringify(this.responseData));
         this.messages  = result['message'];
         loader.dismiss();
         this.Toast("Successfully Registered");
        console.log(this.messages);
        pass.reset();
       }else{
         loader.dismiss();
         this.messages  = result['message'];
         this.Toast(this.messages);
       }
     }, (err) => {
       loader.dismiss();
       this.Toast('Somthing Wrong Please Try Again.');
       console.log("Error",err);
     });
     }else{
      this.Toast('Please Fill all Fields.');
     }
  }

    errors(){
      console.log("error");
      this.Toast('Please Fill Valid Info.');
    }

}
