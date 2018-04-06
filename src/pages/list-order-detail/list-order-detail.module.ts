import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOrderDetailPage } from './list-order-detail';

@NgModule({
  declarations: [
    ListOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOrderDetailPage),
  ],
})
export class ListOrderDetailPageModule {}
