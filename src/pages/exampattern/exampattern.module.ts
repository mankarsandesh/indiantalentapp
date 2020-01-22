import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExampatternPage } from './exampattern';

@NgModule({
  declarations: [
    ExampatternPage,
  ],
  imports: [
    IonicPageModule.forChild(ExampatternPage),
  ],
  exports: [
    ExampatternPage
  ]
})
export class ExampatternPageModule {}
