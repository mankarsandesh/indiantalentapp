import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EbookRegisterPage } from './ebook-register';

@NgModule({
  declarations: [
    EbookRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(EbookRegisterPage),
  ],
})
export class EbookRegisterPageModule {}
