import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingOrderPage } from './tracking-order';

@NgModule({
  declarations: [
    TrackingOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingOrderPage),
  ],
})
export class TrackingOrderPageModule {}
