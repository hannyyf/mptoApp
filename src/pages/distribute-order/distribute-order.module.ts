import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributeOrderPage } from './distribute-order';

@NgModule({
  declarations: [
    DistributeOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(DistributeOrderPage),
  ],
})
export class DistributeOrderPageModule {}
