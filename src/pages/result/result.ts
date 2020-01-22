import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/getdata/authService';
import { NgForm } from '@angular/forms';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  rollId :any;
  messages : any;
  mess:string = '';
  student:string = '';
  Sround : string= '';
  popup_msg:any;
  student_name:any;
  show:boolean= true;
  show1:boolean= true;
  subject:any;
  srank:any;
  awards:any;
  failsts:boolean=true;
  passsts:boolean=false;
  class:any;
  fail:boolean=false;
  hide:boolean=false;

  popup_msg1:any;
  student_name1:any;
  subject1:any;
  sround:any;
  second_round:any;
  score:any;
  class1:any;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor(public navCtrl: NavController,private authService:AuthService,private theInAppBrowser: InAppBrowser, public navParams: NavParams,private toast: ToastController,private loadingCtrl:LoadingController) {
  }

  userResult = {"rollId": this.rollId};

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
  Toast(Message : string){
    let toast = this.toast.create({
    message: Message,
    duration: 2000,
    position: 'bottom'
    });
    toast.present(toast);
  }

  result(pass:NgForm){ 
    if(this.userResult.rollId != undefined){
        let loader = this.loadingCtrl.create({
            content: "Searching..."
          });
          loader.present();
        this.authService.resullt(this.userResult).then((result) => { 
      if(result['status'] == 'true'){
        loader.dismiss();
        this.mess = result['message'];

        this.popup_msg = result['result1'][0]['popup_msg'];
        this.class = result['result1'][0]['class'];
        this.student_name = result['result1'][0]['student_name'];
        this.subject = result['result1'][0]['subject'];
        this.sround = result['result1'][0]['sround'];
        this.second_round = result['result1'][0]['second_round'];
        this.score = result['result1'][0]['score'];

       

        if(result['result2'][0]){
        this.show1 = false;
        this.popup_msg1 = result['result2'][0]['popup_msg'];
        this.student_name1 = result['result2'][0]['student_name'];
        this.subject1 = result['result2'][0]['subject'];
        this.class1 = result['result2'][0]['class'];
        this.srank = result['result2'][0]['srank'];
        this.awards = result['result2'][0]['awards'];      
        }else{
          this.show1 = true;
          console.log(result['result2'][0]);
        }
      
       this.show = false;
       this.failsts = true;
        
        // this.failsts = true;
        // if(this.awards=="-"){
        // this.fail=true;
        // this.passsts = true;
        // this.class = result['result1'][0]['class'];
        // console.log(this.student_name);
        // this.show = false;
        // this.hide = true;
        // }else{
        //   this.fail=false;
        // }
      
    }else{
        loader.dismiss();
        this.Toast('No users were found');
        this.failsts = false;
        this.show = true;
        this.show1 = true;
        console.log(this.mess);
    } 
    }, (err) => {
        loader.dismiss();      
    }); 
    }else{
       
    this.Toast('Please Fill All Fileds.');
    }
  }

  public openWithInAppBrowser3(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/eBook/";
    this.theInAppBrowser.create(url,target,this.options); 
  }

  public openWithInAppBrowser5(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/eBook/";
    this.theInAppBrowser.create(url,target,this.options); 
  }

  public openWithInAppBrowser6(){
    let target = "_blank";
    let url:string = "https://play.google.com/store/apps/details?id=org.indiantalent.indiantalent";
    this.theInAppBrowser.create(url,target,this.options); 
  }

}
