import { Component,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';

import { AuthService } from '../../providers/getdata/authService';
import { FormsModule, ReactiveFormsModule, FormGroup,Validators,FormBuilder,FormControl} from '@angular/forms';
import { EbookLoginPage } from '../ebook-login/ebook-login';

@IonicPage()
@Component({
  selector: 'page-ebook-register',
  templateUrl: 'ebook-register.html',
})
export class EbookRegisterPage {
  userForm:any;
  responseData:any;
  messages:any;
  deviceName:string;
  platform:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _fb:FormBuilder,public toastCtrl: ToastController,private loadingCtrl: LoadingController, private authService: AuthService) {
   
    this.userForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.minLength(10), Validators.maxLength(10)]], 
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],    
      state: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],
      city: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)]],
      address: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(500)]],
      repPassword: ['', Validators.required]}, {validator: this.matchingPasswords('password', 'repPassword')    
    })
  }

  matchingPasswords(passwordKey: any, repPasswordKey: any) {
    
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let repPassword = group.controls[repPasswordKey];

      if (password.value !== repPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  Toast(Message: string) {
    let toast = this.toastCtrl.create({
      message: Message,
      duration: 2000,
      position: 'bottom',
      cssClass: "toastAfterHeader"
    });
    toast.present(toast);
  }

  userregister(value:any) {
   
    value = {'firstName':this.userForm.value.firstName,'lastName': this.userForm.value.lastName,'email':this.userForm.value.email,'password':this.userForm.value.password,'mobile':this.userForm.value.mobile,'repPassword':this.userForm.value.repPassword,
    'state':this.userForm.value.state,'city':this.userForm.value.city,'pincode':this.userForm.value.pincode,'address':this.userForm.value.address,'device':"ios"}
   
    if (this.userForm.value.firstName && this.userForm.value.lastName && this.userForm.value.email && this.userForm.value.password && this.userForm.value.repPassword && this.userForm.value.mobile  && this.userForm.value.state && this.userForm.value.city) {

      if(this.userForm.value.password == this.userForm.value.repPassword){
          let loader = this.loadingCtrl.create({
            content: "Please Wait..."
          });
          loader.present();
          this.authService.eBookRegister(value).then((result) => {
            if (result['status'] == 'true') {
              this.responseData = result;
              localStorage.setItem('value', JSON.stringify(this.responseData));
              this.messages = result['message'];
              loader.dismiss();
              this.navCtrl.push(EbookLoginPage);
              this.userForm.reset()
              this.Toast("Successfully Registered");
             
            } else {
              loader.dismiss();
              this.messages = result['message'];
              this.Toast(this.messages);
            }
          }, (err) => {
            loader.dismiss();
            console.log(err);
            this.Toast('Somthing Wrong Please Try Again.');
            console.log("Error", err);
          });
        } else {
          this.Toast('Password Does Not Match');
        }     
    }else{
      this.Toast('Please Fill All Mandatory Fields.');
    }
  }




  

  


}
