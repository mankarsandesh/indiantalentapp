import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule, FormGroup,Validators,FormBuilder,FormControl} from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AuthService } from '../../providers/getdata/authService';
import { e } from '@angular/core/src/render3';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  data:any;
  userId:number;
  firstName:string;
  lastName:string;
  email:any;
  state:string;
  city:string;
  address:string;
  pincode:number;
  mobile:number;
  code:string;
  product:number;
  orderID:number;
  price:number;
  productData:any;
  userForm:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private theInAppBrowser:InAppBrowser,private _fb:FormBuilder,private toast: ToastController,private loadingCtrl:LoadingController,private authService:AuthService){
    this.data = JSON.parse(localStorage.getItem('LoginuserData'));
    this.userId = this.data['data'][0]['id'];
    this.firstName = this.data['data'][0]['firstname'];
    this.lastName = this.data['data'][0]['lastname'];
    this.mobile = this.data['data'][0]['mobile_num'];
    this.email = this.data['data'][0]['email_id'];
    this.state = this.data['data'][0]['state'];
    this.city = this.data['data'][0]['city_town'];
    this.address = this.data['data'][0]['address'];
    this.pincode = this.data['data'][0]['pin_code'];
    this.code = this.data['data'][0]['code'];

    this.product = navParams.get("product");
    this.price = navParams.get("price");
    //this.price = 1;
    console.log(this.address);

    this.userForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],      
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],     
      state: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],
      city: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(15)]],
      pincode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)]],
      address: ['', [Validators.required, Validators.pattern('[A-Za-z]{1,32}'), Validators.minLength(2), Validators.maxLength(500)]]     
    })



  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad PaymentPage');
  }

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  Toast(Message : string){
    let toast = this.toast.create({ 
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }


  public payment(product:any) {  
    
    if (this.userForm.value.firstName && this.userForm.value.lastName && this.userForm.value.email && this.userForm.value.state && this.userForm.value.city && this.userForm.value.pincode && this.userForm.value.address) {


    this.productData = {"product": product};  
    let loader = this.loadingCtrl.create({
        content: "Loading..."
    });
    loader.present();
    this.authService.eBookpayment(this.productData).then((result) => { 
    console.log(result);
      if(result['status'] == true){
          loader.dismiss();  
          this.orderID = result['orderID'];
           //console.log(this.firstName);
          let target = "_blank";
          let url: string = "https://ebook.indiantalent.org//apppay/ccavRequestHandler.php?billing_name="+this.userForm.value.firstName+"&billing_zip="+this.userForm.value.pincode+"&billing_city="+this.userForm.value.city+"&billing_state="+this.state+"&billing_address="+this.userForm.value.address+"&billing_country=India&"+"billing_tel="+this.userForm.value.mobile+"&billing_email="+this.userForm.value.email+"&merchant_id=55877&"+"amount="+this.price+"&order_id="+this.orderID+"&currency=INR&"+"redirect_url=https://ebook.indiantalent.org/apppay/ccavResponseHandler.php&"+"cancel_url=https://ebook.indiantalent.org/apppay/ccavResponseHandler.php";
          this.theInAppBrowser.create(url, target, this.options);
    
      }else{
          loader.dismiss();
          this.Toast('Somthing want wrong.');    
      }
    },(err) => {
        loader.dismiss();      
    });
  }else{
    this.Toast('Please Fill All Fileds.');    
  }

}


}
