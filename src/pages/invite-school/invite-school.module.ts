import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteSchoolPage } from './invite-school';

@NgModule({
  declarations: [
    InviteSchoolPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteSchoolPage),
  ],
  exports: [
    InviteSchoolPage
  ]
})
export class InviteSchoolPageModule {}
