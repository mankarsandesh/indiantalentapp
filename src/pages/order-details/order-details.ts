import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  orderID:number;
  data:any;
  product:any;
  productCount:any;
  productLength:number;
  sumTotal:number;
  dilvry:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private loadingCtrl:LoadingController,private toast: ToastController) {
  
    this.orderID = navParams.get("orderID");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
    this.orderDetails(this.orderID);
  }

  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }

  orderDetails(orderID:number){ 
    this.data = {"orderID": orderID};
    let loader = this.loadingCtrl.create({
        content: "Loading..."
    });
    loader.present();
    this.authService.eBookOrderDetails(this.data).then((result) => { 
      console.log(result);
    if(result['status'] == true){
        loader.dismiss();  
        this.product = result['product'];
        this.productCount = result['productCount'];
        this.productLength = this.product.length;
        console.log(this.product);
        console.log(this.productLength);
        this.sumTotal = 0;
        for (var i = 0; i < this.productLength; i++){
          console.log(this.product[i].price);
          if(this.product[i].quantity < 9){
            this.dilvry = false;
            this.sumTotal += this.product[i].quantity * this.product[i].price + 40;
          }
          else{
            this.dilvry = true;
            this.sumTotal += this.product[i].quantity * this.product[i].price;
          }
        }
        return this.sumTotal;
     
    }else{
        loader.dismiss();
        this.Toast('No Data were found');    
    } 
    },(err) => {
        loader.dismiss();      
    });
   }


}
