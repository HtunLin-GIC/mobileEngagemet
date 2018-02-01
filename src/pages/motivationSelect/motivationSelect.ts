import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-motivationSelect',
  templateUrl: 'motivationSelect.html'
})
export class MotivationSelectPage {

  dataFromModal: any;

  constructor( public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    this.dataFromModal=this.params;
    console.log("aaaa"+this.dataFromModal.get('date'));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  settingFeeling(data){

    var arr=["soHappy", "happy", "normal","bad","soBad"];
    var selectedDate="today";


  }

}



