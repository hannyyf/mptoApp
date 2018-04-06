import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingOrderDetailPage } from './tracking-order-detail';

@NgModule({
  declarations: [
    TrackingOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingOrderDetailPage),
  ],
})
export class TrackingOrderDetailPageModule {}
