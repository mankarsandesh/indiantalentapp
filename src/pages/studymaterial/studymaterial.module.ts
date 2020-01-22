import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudymaterialPage } from './studymaterial';

@NgModule({
  declarations: [
    StudymaterialPage,
  ],
  imports: [
    IonicPageModule.forChild(StudymaterialPage),
  ],
  exports: [
    StudymaterialPage
  ]
})
export class StudymaterialPageModule {}
