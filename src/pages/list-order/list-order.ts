import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DataOrder } from '../../models/order-model';
import { HomePage } from '../home/home';
import { ListOrderDetailPage } from '../list-order-detail/list-order-detail';

/**
 * Generated class for the ListOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-order',
  templateUrl: 'list-order.html',
})
export class ListOrderPage {


    namadealer: any[];
    dataOrder : any = [];
    searchListData: FormGroup;
    submitAttempt: boolean = false;
    getDataListOrder = {
      "dtfrom": "",
      "dtthru": "",
      "namadealer": ""
    }


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public network: AuthServiceProvider,
    public formBuilder: FormBuilder) {

      this.searchListData = formBuilder.group({
        namadealer: ['', Validators.required],
        dtfrom: ['', Validators.required],
        dtthru: ['', Validators.required]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderPage');
    this.getDataDealer();
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

  parseJson(data) {
        let jsonArray = data.dealer;
        this.namadealer = []
        for (let i=0; i< jsonArray.length; i++)
        {
          let jsonObject = jsonArray[i];
          this.namadealer.push(jsonObject.namadealer);
        }
    }

  backToMenu(){
    this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(HomePage);
  }

  getListOrder()
  {
    this.submitAttempt = true;

    if(!this.searchListData.valid){
      console.log("gagal validasi")
    } else {
    console.log("berhasil validasi nih",this.searchListData.value);
    this.network.postData(this.searchListData.value,'getListOrder').then((result)=>{
    this.dataOrder = result;
    localStorage.setItem('dataOrder', JSON.stringify(this.dataOrder));  
    console.log("cek hasil data order", this.dataOrder); 
    this.navCtrl.push(ListOrderDetailPage,{data: this.dataOrder})      
    });
  }

  }

  

}
