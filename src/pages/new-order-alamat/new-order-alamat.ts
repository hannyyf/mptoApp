import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewOrderPage } from '../new-order/new-order';
// import { NewOrderStrukturPage } from '../new-order-struktur/new-order-struktur';
import { DataOrder } from '../../models/order-model';
import { OrderServiceProvider } from '../../providers/order-service/order-service'
import { NewOrderStrukturPage } from '../new-order-struktur/new-order-struktur';

/**
 * Generated class for the NewOrderAlamatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-order-alamat',
  templateUrl: 'new-order-alamat.html',
})
export class NewOrderAlamatPage {

  dataOrder: DataOrder;
  newDataOrder: DataOrder;
  formCust: FormGroup;
  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderService: OrderServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController ) {

      this.dataOrder = this.orderService.getDataOrder();
      this.newDataOrder = new DataOrder();
      this.formCust = formBuilder.group({
        alamat: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
        rt: ['',Validators.compose([Validators.maxLength(3), Validators.required])],
        rw: ['',Validators.compose([Validators.maxLength(3), Validators.required])],
        desa: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        kecamatan: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        kabupaten: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log("cek data di alamaat from cust", this.dataOrder);
  }

  goToNewOrderStruktur()
  {
    // this.dataOrder.push(this.newDataOrder)
    this.submitAttempt = true;
    if(this.formCust.valid){
    this.insertToObject();
    this.orderService.pushItems(this.dataOrder);
    console.log("Cek isi data sebelum postData ke page selanjutnya", this.dataOrder)
    this.navCtrl.push(NewOrderStrukturPage);
    this.navCtrl.setRoot(NewOrderStrukturPage);
  }else {
    console.log("LENGKAPIN DATA DULU");
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Ada data yang masih kosong / tidak valid',
      buttons: ['OK']
    });
    alert.present();
  }
  
}

  backToNewOrder()
  {
    this.navCtrl.push(NewOrderPage);
    this.navCtrl.setRoot(NewOrderPage);
  }

  insertToObject(){
    this.dataOrder.alamat = this.newDataOrder.alamat;
    this.dataOrder.rt = this.newDataOrder.rt;
    this.dataOrder.rw = this.newDataOrder.rw;
    this.dataOrder.kelurahan = this.newDataOrder.kelurahan;
    this.dataOrder.kecamatan = this.newDataOrder.kecamatan;
    this.dataOrder.kabupaten = this.newDataOrder.kabupaten;
  }

}
