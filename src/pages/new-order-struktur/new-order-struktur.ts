import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { NewOrderPage } from '../new-order/new-order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewOrderKeteranganPage } from '../new-order-keterangan/new-order-keterangan';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataOrder } from '../../models/order-model';
import { OrderServiceProvider } from '../../providers/order-service/order-service'
import { NewOrderAlamatPage } from '../new-order-alamat/new-order-alamat';

/**
 * Generated class for the NewOrderStrukturPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-order-struktur',
  templateUrl: 'new-order-struktur.html',
})
export class NewOrderStrukturPage {

  namadealer: any[];
  namamotor: any[];
  dataOrder: DataOrder;
  newDataOrder: DataOrder;
  formCust: FormGroup;
  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public network: AuthServiceProvider,
    public orderService: OrderServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

      this.dataOrder = this.orderService.getDataOrder();     
      this.newDataOrder = new DataOrder();
      this.formCust = formBuilder.group({
        dealer: ['', Validators.required],
        motor: ['',Validators.required],
        otr: ['',Validators.compose([Validators.maxLength(8), Validators.required])],
        dp: ['', Validators.compose([Validators.maxLength(7),Validators.required])],
        angsuran: ['', Validators.compose([Validators.maxLength(7), Validators.required])],
        top: ['', Validators.compose([Validators.maxLength(2), Validators.required])],
    });
  }
  ionViewDidLoad() {
    this.getDataDealer();
    this.getDataMotor();
    console.log("cek data order dari alamatpage", this.dataOrder)
    console.log("NewOrderStrukturPage")
  }

  goToKeteranganPage()
  {
    this.submitAttempt = true;
    if(this.formCust.valid){
    this.insertToObject();
    this.orderService.pushItems(this.dataOrder);
    console.log("Cek isi data sebelum postData ke page selanjutnya", this.dataOrder)
    this.navCtrl.push(NewOrderKeteranganPage);
    this.navCtrl.setRoot(NewOrderKeteranganPage);
  } else {
    console.log("LENGKAPIN DATA DULU");
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Ada data yang masih kosong / tidak valid',
      buttons: ['OK']
    });
    alert.present();
  }
}

  back()
  {
    this.navCtrl.push(NewOrderAlamatPage);
    this.navCtrl.setRoot(NewOrderAlamatPage);
  }

  getDataDealer()
  {
    // let url='http://localhost/mpto/page/read_dealer.php';
    let url='http://192.168.43.35/mpto/page/read_dealer.php';
    // let url='http://www.order-is.xyz/php/page/read_dealer.php';
    let serverResponse : Promise<any>;
    serverResponse = this.network.callServer(url);
    serverResponse.then(data=>{
     
      console.log("Received dealer" + JSON.stringify(data));
      this.parseJson(data);
    }).catch(err =>{
      console.log("Error :" + err );
    })
  }

  getDataMotor()
  {
    // let url='http://localhost/mpto/page/read_motor.php';
    let url='http://192.168.43.35/mpto/page/read_motor.php';
    // let url='http://www.order-is.xyz/php/page/read_motor.php';
    let serverResponse : Promise<any>;
    serverResponse = this.network.callServer(url);
    serverResponse.then(data=>{
     
      console.log("Received motor" + JSON.stringify(data));
      this.parseJson(data);
    }).catch(err =>{
      console.log("Error :" + err );
    })
  }

  parseJson(data) {
    if (data.dealer !== undefined) {
        let jsonArray = data.dealer;
        this.namadealer = []
        for (let i=0; i< jsonArray.length; i++)
        {
          let jsonObject = jsonArray[i];
          this.namadealer.push(jsonObject.namadealer);
        }
    } if (data.motor !== undefined){
      let jsonArray = data.motor;
        this.namamotor = []
        for (let i=0; i< jsonArray.length; i++)
        {
          let jsonObject = jsonArray[i];
          this.namamotor.push(jsonObject.namamotor);
        }
    }
  }

  insertToObject(){
    this.dataOrder.namamotor = this.newDataOrder.namamotor;
    this.dataOrder.namadealer = this.newDataOrder.namadealer;
    this.dataOrder.hargaotr = this.newDataOrder.hargaotr;
    this.dataOrder.dp = this.newDataOrder.dp;
    this.dataOrder.angsuran = this.newDataOrder.angsuran;
    this.dataOrder.top = this.newDataOrder.top;
  }
  
 
}
