import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,LoadingController  } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { Market } from '@ionic-native/market';
import { AuthService } from '../../providers/getdata/authService';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  data: any = [];
  StudentCount:number;
  schoolcode:any;
  schoolname:any;
  schooladd:any;
  durl1:any;
  vurl1:any;
  durl:any;
  vurl:any;
  newsData:number;
  newscount:number;
  result1:any;
  result2:any;
  resultone :boolean = true;
  resulttwo :boolean = true;

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

  constructor(public navCtrl: NavController,private market: Market, 
              public navParams: NavParams,
              private document: DocumentViewer,
              private theInAppBrowser: InAppBrowser,
              private authService:AuthService,
              private platform: Platform,private loadingCtrl:LoadingController) {
    this.data = JSON.parse(localStorage.getItem('LoginuserData'));
    this.schoolcode = this.data['StudentData'][0]['loginID'];
    this.schoolname = this.data['StudentData'][0]['school_name'];
    this.schooladd = this.data['StudentData'][0]['address'];
    this.result1 = this.data['Result1'];
    this.result2 = this.data['Result2'];
    this.StudentCount = this.data['StudentCount'];
    console.log(this.data);

    this.durl1 = "https://www.indiantalent.org/home/download_student_result/round1/download/"+this.schoolcode;
    this.vurl1 = "https://www.indiantalent.org/home/download_student_result/round1/view/"+this.schoolcode;
    this.durl = "https://www.indiantalent.org/home/download_student_result/round2/download/"+this.schoolcode;
    this.vurl = "https://www.indiantalent.org/home/download_student_result/round2/view/"+this.schoolcode;

    if(this.result1 == 0){
      this.resultone = true;
    }else{
      this.resultone = false;
    }
    if(this.result2 == 0){
      this.resulttwo = true;
    }else{
      this.resulttwo = false;
    }

  }

  ionViewDidLoad() {
    this.notification();
  }

  openLocalPdf() {
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('assets/5-tools.pdf', 'application/pdf', options);
  }

  logout(): void { 
    localStorage.removeItem('LoginuserData');
    this.navCtrl.setRoot("SchoolLoginPage");
    this.navCtrl.popToRoot();   
  }

  public openWithSystemBrowser(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/home/download_student_result/round1/view/"+this.schoolcode;
    this.theInAppBrowser.create(url,target,this.options); 
  }

  notification(){    
      let loader = this.loadingCtrl.create({
        content: "Loading..."
      });
      loader.present();
      this.authService.news().then((result) => { 
      if(result['status'] == 'true'){
      loader.dismiss();            
      this.newsData = result['news'];
      this.newscount = result['count'];
      } 
    }, (err) => {
        loader.dismiss();      
    });   
  }


  public openWithInAppBrowser2(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/home/registration";
    this.theInAppBrowser.create(url,target,this.options); 
  }

  public openWithInAppBrowser3(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/eBook/questionpaper.php";
    this.theInAppBrowser.create(url,target,this.options); 
  }

  public openWithInAppBrowser4(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/2ND-ROUND-INSTRUCTION.pdf";
    this.theInAppBrowser.create(url,target,this.options); 
  }

  public openWithInAppBrowser5(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/eBook/";
    this.theInAppBrowser.create(url,target,this.options); 
  }

  public openWithInAppBrowser6(){
    let target = "_blank";
    let url:string = "https://www.indiantalent.org/eBook/";
    this.theInAppBrowser.create(url,target,this.options); 
  }

  appstore(){
    // let target = "_blank";
    // let url:string = "market://details?id=org.indiantalent.indiantalent";
    // this.theInAppBrowser.create(url,target,this.options); 
    this.market.open('org.indiantalent.indiantalent');
  }

}
