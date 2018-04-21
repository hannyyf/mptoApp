import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrackingOrderPage } from '../tracking-order/tracking-order';

/**
 * Generated class for the TrackingOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tracking-order-detail',
  templateUrl: 'tracking-order-detail.html',
})
export class TrackingOrderDetailPage {
  dataOrder: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataOrder = this.navParams.get('param');
  }

  ionViewDidLoad() {
    console.log("tes data from track order result", this.dataOrder)
  }

  back(){
    this.navCtrl.push(TrackingOrderPage);
    this.navCtrl.setRoot(TrackingOrderPage);
  }

}
