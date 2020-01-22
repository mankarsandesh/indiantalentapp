import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import {EbookCartPage} from '../../pages/ebook-cart/ebook-cart';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  name:string;
  CNAME:string;
  product:any;
  data:any;
  productID:any;
  cartTotal:number;
  subject:any;
  class1:any;
  FooterS : boolean = false;
  userId:number;
  firstName:string;
  subjectData:any;
  constructor(public navCtrl: NavController,private authService:AuthService, public navParams: NavParams,private toast: ToastController,private loadingCtrl:LoadingController) {
    this.data = JSON.parse(localStorage.getItem('LoginuserData'));
    this.userId = this.data['data'][0]['id'];
    this.firstName = this.data['data'][0]['firstName'];
    this.cartTotal = this.data['cartTotal'];
    
    console.log(this.cartTotal);
 console.log(this.subjectData);

  this.name = navParams.get("name");

    if(this.name == "PYQP"){
      this.FooterS = false;
      this.CNAME = "Previous Year Question Paper";
      this.subjectData = [
        {"id":1,"name":"English"},
        {"id":2,"name":"Mathematics"},
        {"id":3,"name":"Science"},
        {"id":4,"name":"General Knowledge"}                   
        ];
        
    }else if(this.name == "WRBS"){
      this.FooterS = false;
      this.CNAME = "Workbooks";

      this.subjectData = [
        {"id":1,"name":"English"},
        {"id":2,"name":"Mathematics"},
        {"id":3,"name":"Science"},
        {"id":4,"name":"General Knowledge"},
        {"id":12,"name":"Reasoning"},
        {"id":5,"name":"Cyber"},
        {"id":9,"name":"Drawing"},
        {"id":11,"name":"Essay"},
        ];


    }else if(this.name == "PYQPC"){
      this.FooterS = true;
      this.CNAME = "Previous Year Question Paper Combo Pack";
    }else{
       this.CNAME = "Workbooks";
       this.subjectData = [
        {"id":1,"name":"English"},
        {"id":2,"name":"Mathematics"},
        {"id":3,"name":"Science"},
        {"id":4,"name":"General Knowledge"},
        {"id":12,"name":"Reasoning"},
        {"id":5,"name":"Cyber"},
        {"id":9,"name":"Drawing"},
        {"id":11,"name":"Essay"},
        ];
        
    }
    this.data = {"type": this.name,"subject":this.subject,"class":this.class1};
    console.log(this.name);
  }

  ionViewDidLoad() {
    this.result(this.data,this.subject,this.class1);
  }

  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }
  eBookCart(){
    this.navCtrl.push(EbookCartPage);
  }
  
  addCart(productID){    
      this.Toast("Product Added in Cart.");
      this.data = {"userId": this.userId,"productId":productID};
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();
      this.authService.eBookCart(this.data).then((result) => { 
        console.log(result['status']);
      if(result['status'] == true){
          loader.dismiss();           
          this.cartTotal = this.cartTotal + 1; 
          console.log(result['count']);
      }
      },(err) => {
          loader.dismiss();      
      });      
  }

  result(type:string,subject:string,class1:string){    
    console.log(this.data);
    this.data = {"type": this.name,"subject":this.subject,"class":this.class1};
    let loader = this.loadingCtrl.create({
        content: "Loading..."
    });
    loader.present();
    this.authService.product(this.data).then((result) => { 
    if(result['status'] == 'true'){
        loader.dismiss();  
        this.product = result['product'];
        console.log(result['count']);
    }else{
        loader.dismiss();
        this.Toast('No Data were found');    
    } 
    },(err) => {
        loader.dismiss();      
    });
   }



}
