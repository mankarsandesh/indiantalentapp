import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  newsData:any;
  newscount:any;
  show:boolean= true;
  show1:boolean= true;
  constructor(public navCtrl: NavController,private authService:AuthService, public navParams: NavParams,private toast: ToastController,private loadingCtrl:LoadingController) {
  }


  ionViewDidLoad() {
    this.notification();
  }


  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }

  notification(){    
    let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();
     this.authService.news().then((result) => { 
      if(result['status'] == 'true'){
        loader.dismiss();      
        if(this.newscount == 0){
          this.show = true;
          this.show1 = false;
        }else{
          this.newsData = result['news'];
          this.newscount = result['count'];
          this.show = false;
          this.show1 = true;
        }
        console.log( this.newscount);
    }else{
        loader.dismiss();
        this.Toast('No Data were found');
     
    } 
    }, (err) => {
        loader.dismiss();      
    }); 
   
  }

  

}
