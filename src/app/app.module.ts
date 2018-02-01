import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';


import { IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RestProvider } from '../providers/rest/rest';
import {DiamondSelectListsPage} from "../pages/diamondSelectLists/diamondSelectLists";
import {HomeNoFollowerPage} from "../pages/homeNoFollower/homeNoFollower";
import { Calendar } from '@ionic-native/calendar';
import { CommonModule } from '@angular/common';
import { MotivationSelectPage} from "../pages/motivationSelect/motivationSelect";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DiamondSelectListsPage,
    HomeNoFollowerPage,
    MotivationSelectPage
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(HomeNoFollowerPage)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DiamondSelectListsPage,
    HomeNoFollowerPage,
    MotivationSelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Calendar
  ]
})
export class AppModule {}
