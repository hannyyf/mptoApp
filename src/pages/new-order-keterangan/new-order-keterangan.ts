import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NewOrderPage } from '../new-order/new-order';
import { NewOrderStrukturPage } from '../new-order-struktur/new-order-struktur';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataOrder } from '../../models/order-model';
import { OrderServiceProvider } from '../../providers/order-service/order-service'
import { HomePage } from '../home/home';

/**
 * Generated class for the NewOrderKeteranganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-order-keterangan',
  templateUrl: 'new-order-keterangan.html',
})
export class NewOrderKeteranganPage {

  namaao: any[];
  namacs: any[];
  namaca: any[];
  responseData: any;
  dataOrder: DataOrder;
  newDataOrder: DataOrder;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public network: AuthServiceProvider,
    public toastCtrl:ToastController,
    public orderService: OrderServiceProvider) {

      this.dataOrder = this.orderService.getDataOrder();
      
      this.newDataOrder = new DataOrder();
  }

  ionViewDidLoad() {
    this.getDataAo();
    this.getDataCa();
    this.getDataCs();
  }
  
  sendDataToServer()
  {
    this.insertToObject();
    this.orderService.pushItems(this.dataOrder);
    console.log("Cek isi data sebelum postData ke SERVEEER", this.dataOrder)

    this.network.postData(this.dataOrder,'setData').then((result)=>{
      this.responseData = result;
       
        this.dataOrder = this.responseData;
        localStorage.setItem('dataOrder', JSON.stringify(this.responseData));         
        this.toastBerhasil();
    
    });
  }

  toastBerhasil(){
    let toast = this.toastCtrl.create
      ({
      message: 'Data berhasil di simpan di database',
      duration: 3000,
      position: 'top'
      });
      toast.present();
      this.clearData();
  }

  goToHomePage()
  {
    this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  clearData(){
    this.newDataOrder.namacs = '';
    this.newDataOrder.namaao = '';
    this.newDataOrder.namaca = '';
    this.newDataOrder.keterangan = '';

    this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  insertToObject(){
    this.dataOrder.namacs = this.newDataOrder.namacs;
    this.dataOrder.namaao = this.newDataOrder.namaao;
    this.dataOrder.namaca = this.newDataOrder.namaca;
    this.dataOrder.keterangan = this.newDataOrder.keterangan;
  }

  getDataAo()
  {
    // let url='http://localhost/mpto/page/read_ao.php';
    let url='http://192.168.43.35/mpto/page/read_ao.php';
    // let url='http://www.order-is.xyz/php/page/read_ao.php';
    let serverResponse : Promise<any>;
    serverResponse = this.network.callServer(url);
    serverResponse.then(data=>{   
      console.log("Received data ao" + JSON.stringify(data));
      this.parseJsonAo(data);
      // this.namaao = data;
      console.log('tttttttttt', this.namaao)
    }).catch(err =>{
      console.log("Error :" + err );
    })
  }

  getDataCa()
  {
    // let url='http://localhost/mpto/page/read_ca.php';
    let url='http://192.168.43.35/mpto/page/read_ca.php';
    // let url='http://www.order-is.xyz/php/page/read_ca.php';
    let serverResponse : Promise<any>;
    serverResponse = this.network.callServer(url);
    serverResponse.then(data=>{
     
      console.log("Received data ca" + JSON.stringify(data));
      this.parseJsonCa(data);
      // this.namaca = data;
      // this.dealer = data;
      // console.log("ttttttt", data.dealer)
    }).catch(err =>{
      console.log("Error :" + err );
    })
  }

  getDataCs()
  {
    // let url='http://localhost/mpto/page/read_cs.php';
    let url='http://192.168.43.35/mpto/page/read_cs.php';
    // let url='http://www.order-is.xyz/php/page/read_cs.php';
    let serverResponse : Promise<any>;
    serverResponse = this.network.callServer(url);
    serverResponse.then(data=>{
     
      console.log("Received data cs" + JSON.stringify(data));
      this.parseJsonCs(data);
      // this.dealer = data;
      // console.log("ttttttt", data.dealer)
    }).catch(err =>{
      console.log("Error :" + err );
    })
  }

  parseJsonAo(data) {
        let jsonArray = data.ao;
        this.namaao = [];
        for (let i=0; i< jsonArray.length; i++)
        {
          let jsonObject = jsonArray[i];
          this.namaao.push(jsonObject.namakaryawan);
        }
  }

  parseJsonCa(data) {
    let jsonArray = data.ca;
    this.namaca = [];
    for (let i=0; i< jsonArray.length; i++)
    {
      let jsonObject = jsonArray[i];
      this.namaca.push(jsonObject.namakaryawan);
    }
  }

  parseJsonCs(data) {
    let jsonArray = data.cs;
    this.namacs = [];
    for (let i=0; i< jsonArray.length; i++)
    {
      let jsonObject = jsonArray[i];
      this.namacs.push(jsonObject.namakaryawan);
    }
  }

  
}
