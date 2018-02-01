import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { NavParams } from "ionic-angular";


@Component({
  selector: 'page-diamondSelectLists',
  templateUrl: 'diamondSelectLists.html'
})

@Injectable()
export class DiamondSelectListsPage {

  diamondSelectList: any;
  sessionEmail={ email: '' };


  constructor(public navCtrl: NavController, public navParams: NavParams, public http : HttpClient, public restProvider : RestProvider) {
    var email = localStorage.getItem('userData');
    this.sessionEmail.email=email;
    if(email){
      console.log(this.sessionEmail);
      this.getDiamondSelectList(this.sessionEmail);
    }
  }

  getDiamondSelectList(data) {
    this.restProvider.getData(data).then((result) => {
      this.diamondSelectList=result;
      console.log(this.diamondSelectList);
    }, (err) => {
      console.log(err);
    });
  }



}

