import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EbookCartPage } from './ebook-cart';

@NgModule({
  declarations: [
    EbookCartPage,
  ],
  imports: [
    IonicPageModule.forChild(EbookCartPage),
  ],
})
export class EbookCartPageModule {}
