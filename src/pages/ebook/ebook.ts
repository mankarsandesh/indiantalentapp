import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { MyorderPage } from '../myorder/myorder';
import {HomePage} from '../../pages/home/home';
import { EbookLoginPage } from '../ebook-login/ebook-login';



@IonicPage()
@Component({
  selector: 'page-ebook',
  templateUrl: 'ebook.html',
})
export class EbookPage {
  name1:string;
  name2:string;
  name3:string;
  data:any;
  firstName:string;
  lastName:string;
  userId:number;
  cartTotal:number;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.data = JSON.parse(localStorage.getItem('LoginuserData'));
    this.userId = this.data['data'][0]['id'];
    this.firstName = this.data['data'][0]['firstname'];
    this.lastName = this.data['data'][0]['lastname'];
    this.cartTotal = this.data['cartTotal'];
    this.name1 = "PYQP";
    this.name2 = "WRBS";
    this.name3 = "PYQPC";
    

  }
  
  productDetails(name:string){   
    this.navCtrl.push(ProductPage,{name:name});
  }

  myOrder(){
    this.navCtrl.push(MyorderPage);
  }
  logout(){   
    localStorage.clear(); 
  //  this.navCtrl.push(HomePage,{back: 'logout'});
    this.navCtrl.setRoot(EbookLoginPage);
}
}
