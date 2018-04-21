import { Component } from '@angular/core';
import { NavController,App,AlertController, MenuController  } from 'ionic-angular';
import { NewOrderPage } from '../new-order/new-order';
import { DistributeOrderPage } from '../distribute-order/distribute-order';
import { ListOrderPage } from '../list-order/list-order';
import { TrackingOrderPage } from '../tracking-order/tracking-order';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'; 
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  userDetails : any;
  responseData: any;

  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public app:App,
    public authService:AuthServiceProvider,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController ) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    if(this.userDetails.jabatan == 4){
      this.activeMenuCs();
    }if(this.userDetails.jabatan == 3){
      this.activeMenuCoc();
    }if(this.userDetails.jabatan == 1){
      this.activeMenuCsh();
    }  
  
  }

  activeMenuCs() {
    this.menuCtrl.enable(true, 'cs');
    this.menuCtrl.enable(false, 'coc');
    this.menuCtrl.enable(false, 'csh');
  }

  activeMenuCoc() {
    this.menuCtrl.enable(true, 'coc');
    this.menuCtrl.enable(false, 'cs');
    this.menuCtrl.enable(false, 'csh');
  }

  activeMenuCsh() {
    this.menuCtrl.enable(true, 'csh');
    this.menuCtrl.enable(false, 'cs');
    this.menuCtrl.enable(false, 'coc');
  }
  
  backToWelcome(){
     this.navCtrl.push(LoginPage);
     this.navCtrl.setRoot(LoginPage);
  }
  
  logout(){

    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi Keluar Aplikasi',
      message: 'Apakah anda mau keluar dari aplikasi ini?',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Iya',
          handler: () => {
            localStorage.clear();
            setTimeout(() => this.backToWelcome(), 1000);
          }
        }
      ]
    });
    confirm.present();
  }

  goToNewOrder()
  {
    this.navCtrl.push(NewOrderPage);
    this.navCtrl.setRoot(NewOrderPage);
  }


  goToListOrder()
  {
    this.navCtrl.push(ListOrderPage);
    this.navCtrl.setRoot(ListOrderPage);
  }

  goToTrackingOrder()
  {
    this.navCtrl.push(TrackingOrderPage);
    this.navCtrl.setRoot(TrackingOrderPage);
  }

}
