import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController  } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  responseData : any;
  userData = {
    "name": "",
    "email": "",
    "username": "",
    "password":"", 
    "jabatan":"",
  };
  listJabatan : any [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService:AuthServiceProvider,
    public toastCtrl:ToastController,
    public loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad(){
    this.getJabatan();
    console.log("page register");
  }

  signup(){

      this.authService.postData(this.userData,'signup').then((result)=>{
        console.log('Tes response data dari result :',result)
        this.responseData = result;
       
        if(this.responseData.user_id !== null){
          this.userData = this.responseData;
          localStorage.setItem('userData', JSON.stringify(this.responseData));         
          this.toastBerhasil(); 
          this.navCtrl.push(LoginPage);
          this.navCtrl.setRoot(LoginPage);
          
        }else 
        {
          this.toastGagal();
       } 
      });
    }


 login(){
   //Login page link
   this.navCtrl.push(LoginPage);
   this.navCtrl.setRoot(LoginPage);
 }

toastBerhasil(){
  let toast = this.toastCtrl.create
    ({
    message: 'Pendaftaran Berhasil',
    duration: 3000,
    position: 'top'
    });
    toast.present();
}

toastGagal(){
  let toast = this.toastCtrl.create
    ({
      message: 'Give valid details',
      duration: 3000
    });
    toast.present();
}

// getJabatan()
//   {   
//     this.authService.getData('getJabatan').then((result)=>{
//     this.listJabatan = result;
//     localStorage.setItem('listJabatan', JSON.stringify(this.listJabatan));  
//     console.log("cek hasil listJabatan", this.listJabatan);    
//     });
//   }

getJabatan()
  {
    let url='http://localhost/mpto/page/read_jabatan.php';
    // let url='http://www.order-is.xyz/php/page/read_motor.php';
    let serverResponse : Promise<any>;
    serverResponse = this.authService.callServer(url);
    serverResponse.then(data=>{
     
      console.log("Received jabatan" + JSON.stringify(data));
      this.parseJson(data);
    }).catch(err =>{
      console.log("Error :" + err );
    })
  }

  parseJson(data) {
        let jsonArray = data.jabatan;
        this.listJabatan = []
        for (let i=0; i< jsonArray.length; i++)
        {
          let jsonObject = jsonArray[i];
          this.listJabatan.push(jsonObject.deskripsi);
        }

  }
}