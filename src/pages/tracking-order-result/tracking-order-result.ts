import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrackingOrderPage } from '../tracking-order/tracking-order';
import { TrackingOrderDetailPage } from '../tracking-order-detail/tracking-order-detail';

/**
 * Generated class for the TrackingOrderResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking-order-result',
  templateUrl: 'tracking-order-result.html',
})
export class TrackingOrderResultPage {
  dataOrder : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataOrder = this.navParams.get('param');
  }

  ionViewDidLoad() {
    console.log("get data from tracking page", this.dataOrder);
  }

  back(){
    this.navCtrl.push(TrackingOrderPage);
    this.navCtrl.setRoot(TrackingOrderPage);
  }

  detail(){
    this.navCtrl.push(TrackingOrderDetailPage, {param: this.dataOrder})
    // this.navCtrl.setRoot(TrackingOrderDetailPage);


  }

}
