import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"username": "","password": ""};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService:AuthServiceProvider,
    public alertCtrl: AlertController) {
  }

    login(){

      if(this.userData.username == "" && this.userData.password == ""){
        let alert = this.alertCtrl.create({
          subTitle: 'Username dan password masih kosong',
          buttons: ['OK']
        });
        alert.present();
      }else if(this.userData.username == "" || this.userData.password == ""){
        let alert = this.alertCtrl.create({
          subTitle: 'Username / password masih kosong',
          buttons: ['OK']
        });
        alert.present();
      }else{
        this.authService.postData(this.userData,'login').then((result) => {
        this.responseData = result;
        if(this.responseData.userData){
        console.log(this.responseData);
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(HomePage);  
        this.navCtrl.setRoot(HomePage);    
      }else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Username / Password Salah',
          buttons: ['OK']
        });
        alert.present();
      }
      });
    }
  }
}
