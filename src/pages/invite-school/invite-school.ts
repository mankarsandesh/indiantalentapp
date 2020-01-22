import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import { ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-invite-school',
  templateUrl: 'invite-school.html',
})
export class InviteSchoolPage {

  name:any;
  schoolName:any;
  email:any;
  mobile :any;
  type:any;
  pincode :any;
  address :any;
  city :any;
  taluka :any;
  state :any;
  schoolinfo:any;
  responseData : any;
  messages : string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private toast: ToastController,private loadingCtrl:LoadingController) {
    this.name = navParams.get('name');
    this.schoolName = navParams.get('schoolName');
    this.email= navParams.get('email');
    this.mobile = navParams.get('mobile');
    this.type= navParams.get('type');
    this.pincode = navParams.get('pincode');
    this.address = navParams.get('address');
    this.city = navParams.get('city');
    this.taluka = navParams.get('taluka');
    this.state = navParams.get('state');

    this.schoolinfo = {"name": this.name,"schoolName":this.schoolName, "email": this.email,"mobile": this.mobile,"type": this.type,"pincode": this.pincode,"address": this.address,"city": this.city,"taluka": this.taluka,"state": this.state};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteSchoolPage');
  }

  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }

  inviteschool(pass:NgForm){
    if(this.schoolinfo.name != undefined && this.schoolinfo.schoolName != undefined && this.schoolinfo.email != undefined && this.schoolinfo.mobile != undefined && this.schoolinfo.type != undefined && this.schoolinfo.pincode != undefined && this.schoolinfo.address != "select" && this.schoolinfo.city != undefined && this.schoolinfo.taluka != undefined && this.schoolinfo.state != undefined){  
       let loader = this.loadingCtrl.create({
         content: "Please Wait..."
       });
       loader.present();
     this.authService.inviteschool(this.schoolinfo).then((result) => {
       if(result['status'] == 'true'){
          console.log(this.schoolinfo);
          this.responseData = result;
          localStorage.setItem('schoolinfo', JSON.stringify(this.responseData));
          this.messages  = result['message'];
          loader.dismiss();
          this.Toast(this.messages);         
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


