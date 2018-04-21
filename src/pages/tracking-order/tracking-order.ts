import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import { TrackingOrderResultPage } from '../tracking-order-result/tracking-order-result';

/**
 * Generated class for the TrackingOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tracking-order',
  templateUrl: 'tracking-order.html',
})
export class TrackingOrderPage {
 
  id = {
    "idorder": ""
  }
  dataOrder: any = {} ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController) {   
  
  }

  ionViewDidLoad() {
    
  }

  backToMenu(){
    this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  findById() {
      this.authService.postData(this.id,'findById').then((result)=>{
      this.dataOrder = result;
      localStorage.setItem('dataOrder', JSON.stringify(this.dataOrder));  
      console.log("cek hasil data order", this.dataOrder);      
      this.navCtrl.push(TrackingOrderResultPage, {param: this.dataOrder}); 
      // this.navCtrl.setRoot(TrackingOrderResultPage);
    });
      
  
    }
  

}
