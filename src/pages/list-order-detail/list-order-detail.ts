import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListOrderPage } from '../list-order/list-order';

/**
 * Generated class for the ListOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-order-detail',
  templateUrl: 'list-order-detail.html',
})
export class ListOrderDetailPage {
  dataOrder : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.dataOrder = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log("terima data dari list order", this.dataOrder)
    console.log('ionViewDidLoad ListOrderDetailPage');
  }

  back(){
    this.navCtrl.push(ListOrderPage);
    this.navCtrl.setRoot(ListOrderPage);
  }

}
