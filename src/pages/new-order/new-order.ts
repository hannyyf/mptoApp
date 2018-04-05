import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, Events } from 'ionic-angular';
// import { NewOrderAlamatPage } from '../new-order-alamat/new-order-alamat';
import { HomePage } from '../home/home';
import { DataOrder } from '../../models/order-model'
import { OrderServiceProvider } from '../../providers/order-service/order-service'

/**
 * Generated class for the NewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-order',
  templateUrl: 'new-order.html',
})
export class NewOrderPage {

  order: DataOrder;
  // dataOrder: DataOrder[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public orderService: OrderServiceProvider
  ) 
    {
      this.order = new DataOrder();
    }

  goToNewOrderAlamat()
  {
    console.log("Cek isi data sebelum postData ke server", this.order)
    this.orderService.pushItems(this.order);

    // this.navCtrl.push(NewOrderAlamatPage, this.order);
  }

  goToHome()
  {
    this.navCtrl.getPrevious();
  }
  
}
