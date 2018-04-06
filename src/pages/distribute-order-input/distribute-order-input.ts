import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DistributeOrderPage } from '../distribute-order/distribute-order';
import { HomePage } from '../home/home';

/**
 * Generated class for the DistributeOrderInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-distribute-order-input',
  templateUrl: 'distribute-order-input.html',
})
export class DistributeOrderInputPage {

  listfv: any[];
  dataOrder: any = {} ;
  dataDistribute = {
    "idorder" : "",
    "namafv" : ""
  };
  responseData : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public network: AuthServiceProvider,
    public toastCtrl:ToastController) {

    this.dataDistribute.idorder = this.navParams.get('param');
  }

  ionViewDidLoad() {
    this.getDataFv();
    this.getDetail();
    console.log("cek id order",this.dataDistribute.idorder);
    console.log('ionViewDidLoad DistributeOrderInputPage');
  }

  getDataFv()
  {
    let url='http://localhost/mpto/page/read_fv.php';
    // let url='http://www.order-is.xyz/php/page/read_fv.php';
    let serverResponse : Promise<any>;
    serverResponse = this.network.callServer(url);
    serverResponse.then(data=>{
     
      console.log("Received nama fv" + JSON.stringify(data));
      this.parseJson(data);
    }).catch(err =>{
      console.log("Error :" + err );
    })
  }

  parseJson(data) {
   
        let jsonArray = data.fv;
        this.listfv = []
        for (let i=0; i< jsonArray.length; i++)
        {
          let jsonObject = jsonArray[i];
          this.listfv.push(jsonObject.namakaryawan);
        }
    
  }

  getDetail()
  {
    this.network.postData(this.dataDistribute,'getDetail').then((result)=>{
    console.log('Tes response data dari result :',result)
    this.dataOrder = result;
    localStorage.setItem('dataOrder', JSON.stringify(this.dataOrder));  
    console.log("cek hasil data order", this.dataOrder);       
    });

  }

  distribute()
  {
      this.network.postData(this.dataDistribute,'updateDistribute').then((result)=>{
      console.log('Tes response data dari result :',result)
      this.responseData = result;
       
      this.dataOrder = this.responseData;
      localStorage.setItem('dataOrder', JSON.stringify(this.responseData));         
      this.toastBerhasil();
      this.navCtrl.push(DistributeOrderPage);
    
    });

  }

  toastBerhasil(){
    let toast = this.toastCtrl.create
      ({
      message: 'Order berhasil terdistribute',
      duration: 2000,
      position: 'top'
      });
      toast.present();
  }

}
