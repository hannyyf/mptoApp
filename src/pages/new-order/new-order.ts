import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage,NavController, NavParams, AlertController} from 'ionic-angular';
import { NewOrderAlamatPage } from '../new-order-alamat/new-order-alamat';
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
  formCust: FormGroup;
  submitAttempt: boolean = false;
  // dataOrder: DataOrder[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public orderService: OrderServiceProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) 
    {
      this.order = new DataOrder();
      this.formCust = formBuilder.group({
        nama: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        pob: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        dob: ['',Validators.required],
        jk: ['',Validators.required],
        sp: ['',Validators.required],
        nohp: ['',Validators.compose([Validators.maxLength(13), Validators.required])],
        nohp2: ['',Validators.compose([Validators.maxLength(13)])]
    });
    }

  goToNewOrderAlamat()
  {
    this.submitAttempt = true;
    if(this.formCust.valid){
      console.log("Cek isi data sebelum postData ke server", this.order)
      this.orderService.pushItems(this.order);
      this.navCtrl.push(NewOrderAlamatPage, this.order);
      this.navCtrl.setRoot(NewOrderAlamatPage);
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

  goToHome()
  {
    this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  
}
