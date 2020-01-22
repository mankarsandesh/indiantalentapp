import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import {OrderDetailsPage} from '../../pages/order-details/order-details';


@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
  data:any;
  myorder:any;
  order:any[] = [];
  userId:number;
  count:number;
  myOrdernew:any;
  myOrdernew2:any;
  sumTotal:number;
  deliveryCharges:number;
  status:boolean;
  orerData:any;
  totalPrice:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService:AuthService,private loadingCtrl:LoadingController,private toast: ToastController) {
    this.data = JSON.parse(localStorage.getItem('LoginuserData'));
    this.userId = this.data['data'][0]['id'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderPage');
    this.orderDetails(this.userId);
  }
  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }

  orderviewDetails(orderID:number){
    this.orerData = {"orderID": orderID};
    this.navCtrl.push(OrderDetailsPage,{orderID:orderID});  
  }

  orderDetails(userId:number){ 
    this.data = {"userId": userId};
    let loader = this.loadingCtrl.create({
        content: "Loading..."
    });
    loader.present();
    this.authService.eBookOrderview(this.data).then((result) => { 
     console.log(result['status']);
    if(result['status'] == true){
        loader.dismiss();  
        this.myorder = result['MyorderDetails'];
        this.status = result['status'];
        
        console.log(this.myorder.length);
        for(var i=0;i<this.myorder.length;i++){
          console.log(this.myorder[i].length);
          console.log("one");        
              if(this.myorder[i].length == 1){          
                if(this.myorder[i][0].quantity < 9){
                  this.deliveryCharges = 40;
                }else{
                  this.deliveryCharges = 0;
                }
                this.totalPrice =  Number(this.myorder[i][0].price) * Number(this.myorder[i][0].quantity) + this.deliveryCharges;      
                
                this.myOrdernew = {'order_id': this.myorder[i][0].order_id,'order_date': this.myorder[i][0].order_date,'payment_status': this.myorder[i][0].payment_status,'price': this.totalPrice};  
                this.order.push(this.myOrdernew);
              
              }else if(this.myorder[i].length > 1){             
                      this.sumTotal = 0;
                  for(var j=0;j<this.myorder[i].length;j++){
                      this.sumTotal +=   Number(this.myorder[i][j].price);               
                  }   
                  if(this.myorder[i][0].quantity < 9){
                    this.deliveryCharges = 40;
                  }else{
                    this.deliveryCharges = 0;
                  }
                  
                  this.totalPrice =  Number(this.myorder[i][0].price) * Number(this.myorder[i][0].quantity) + this.deliveryCharges;      
                          
                  this.myOrdernew2 = {'order_id': this.myorder[i][0].order_id,'order_date': this.myorder[i][0].order_date,'payment_status': this.myorder[i][0].payment_status,'price': this.totalPrice};  
                  this.order.push(this.myOrdernew2);
              }else{
                this.status = true;
              }
        }        

        console.log(status);
    }else{
      this.status = result['status'];
      console.log(this.status);
      loader.dismiss();
      this.Toast('No Data were found');   
    } 
    },(err) => {
        loader.dismiss();      
    });
   }

}
