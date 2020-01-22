import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EbookLoginPage } from './ebook-login';

@NgModule({
  declarations: [
    EbookLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(EbookLoginPage),
  ],
})
export class EbookLoginPageModule {}
