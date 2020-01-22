import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import {PaymentPage} from '../../pages/payment/payment';
import {ProductPage} from '../../pages/product/product';
import {EbookPage} from '../../pages/ebook/ebook';

@IonicPage()
@Component({
  selector: 'page-ebook-cart',
  templateUrl: 'ebook-cart.html',
})
export class EbookCartPage {
  data:any;
  userId:number;
  product:any;
  cartTotal:number;
  productCount:number;
  productLength:number;
  sumTotal:any;  
  total:any;
  cartID:number;
  productData:any;
  productadd:any;
  orderID:number;
  price:number;
  status:boolean;
  TotalQuntity:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private loadingCtrl:LoadingController,private toast: ToastController) {
    this.data = JSON.parse(localStorage.getItem('LoginuserData'));
    this.userId = this.data['data'][0]['id'];
    this.cartTotal = this.data['cartTotal'];
  }

  ionViewDidLoad() {
    this.viewCart(this.userId);
  }

  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }

  home(){
    this.navCtrl.push(EbookPage);
   }



  payment(product:any,TotalQuntity:number){
    if(TotalQuntity >= 9){
      this.total = this.sumTotal;
    }else{
      this.total = this.sumTotal + 40;
    }
    this.navCtrl.push(PaymentPage,{product:product,price:this.total});
   }


  deleteItem(cartID:number){  
    
    this.data = {"userID": this.userId,"cartId":cartID};
    let loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();
    this.authService.deleteCart(this.data).then((result) => { 
      console.log(result);
    if(result['status'] == true){
        loader.dismiss();
        result['message'];
        console.log(this.data);
        this.Toast(result['message']);
        this.navCtrl.push(ProductPage);
    }
    },(err) => {
        loader.dismiss();      
    });      
  }


  viewCart(userId:number){ 
    this.data = {"userId": userId};
    let loader = this.loadingCtrl.create({
        content: "Loading..."
    });
    loader.present();
    this.authService.eBookCartview(this.data).then((result) => { 
     
    if(result['status'] == true){
          this.status = result['status'];
        loader.dismiss();  
        this.product = result['product'];
        this.productCount = result['productCount'];
        this.productLength = this.product.length;
     
        
        this.sumTotal = 0;
        this.TotalQuntity = 0;
        for (var i = 0; i < this.productLength; i++){
          console.log(this.product[i].product_price);
          this.sumTotal += this.product[i].quntity * this.product[i].product_price;
          this.TotalQuntity  += Number(this.product[i].quntity);
        }
        return (this.sumTotal,this.TotalQuntity);
          
    }else{
        loader.dismiss();
        this.status = result['status'];
        this.Toast('There are no Data Found.');    
    } 
    },(err) => {
        loader.dismiss();      
    });
   }

}
