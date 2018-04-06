import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataOrder } from '../../models/order-model'
import { OrderServiceProvider } from '../../providers/order-service/order-service'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { DistributeOrderInputPage } from '../distribute-order-input/distribute-order-input';

/**
 * Generated class for the DistributeOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distribute-order',
  templateUrl: 'distribute-order.html',
})
export class DistributeOrderPage {

  dataOrders: DataOrder[];
  idorder: any [];
  namacust: any[];
  responseData: any;
  dataSet : any;

  constructor (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderService: OrderServiceProvider,
    public network: AuthServiceProvider
  ) {
     this.getDataDistribute();
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad DistributeOrderPage');
    }
    goToHomePage()
    {
      this.navCtrl.push(HomePage);
    }

    detail(id)
    {
      this.navCtrl.push(DistributeOrderInputPage,{param: id});
      console.log("cek data sebelum dikirim ke menu", id);
    }

    getDataFromServer()
    {
  
      this.network.getData('getListDistribute').then((result)=>{
        console.log('Data dari result :',result)
        this.responseData = result;
        localStorage.setItem('dataOrders', JSON.stringify(this.responseData));   
        this.dataOrders = this.responseData;
      });
    }

    getDataDistribute()
    {
      let url='http://localhost/mpto/page/read_dataorder.php';
      // let url='http://www.order-is.xyz/php/page/read_dataorder.php';
      let serverResponse : Promise<any>;
      serverResponse = this.network.callServer(url);
      serverResponse.then(data=>{
       
        console.log("Received data order" + JSON.stringify(data));
        this.parseJson(data);
        this.dataOrders = data;
      }).catch(err =>{
        console.log("Error :" + err );
      })
    }
  
    parseJson(data) {
          let jsonArray = data.dataorder;
          this.idorder = [];
          this.namacust = [];
          for (let i=0; i< jsonArray.length; i++)
          {
            let jsonObject = jsonArray[i];
            this.idorder.push(jsonObject.idorder);
            this.namacust.push(jsonObject.namacust);
          }
    }

}
