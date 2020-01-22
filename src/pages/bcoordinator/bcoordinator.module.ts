import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BcoordinatorPage } from './bcoordinator';

@NgModule({
  declarations: [
    BcoordinatorPage,
  ],
  imports: [
    IonicPageModule.forChild(BcoordinatorPage),
  ],
  exports: [
    BcoordinatorPage
  ]
})
export class BcoordinatorPageModule {}
