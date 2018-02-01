import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { NavParams } from "ionic-angular";
import {DiamondSelectListsPage} from "../diamondSelectLists/diamondSelectLists";
import {HomeNoFollowerPage} from "../homeNoFollower/homeNoFollower";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

@Injectable()
export class LoginPage {
  eyeState : any;
  users= { email: '', password: ''};
  returnType : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http : HttpClient, public restProvider : RestProvider) {

    this.eyeState={
      eyeClass:"eye_close",
      texBoxType:"password",
      eyeStyle:"assets/img/icon_eye_off.png"
    };
  }
  goToOtherPage(page) {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(page);
  }

  iconClick() {

    if (this.eyeState.eyeClass == "eye_close") {
      this.eyeState.eyeClass = "eye_open";
      this.eyeState.texBoxType = "text";
      this.eyeState.eyeStyle = "assets/img/icon_eye_on.png";
    }
    else {
      this.eyeState.eyeClass = "eye_close";
      this.eyeState.texBoxType = "password";
      this.eyeState.eyeStyle = "assets/img/icon_eye_off.png";
    }

  }

  login() {
    console.log(this.users.email);
    this.restProvider.login(this.users).then((result) => {
      this.returnType=result;
      console.log(this.returnType.status);
      if(this.returnType.status=="successful"){
        localStorage.setItem('userData', this.returnType.user_id );
        this.goToOtherPage(HomeNoFollowerPage);
      }else {

      }
    }, (err) => {
      console.log(err);
    });
  }



}

