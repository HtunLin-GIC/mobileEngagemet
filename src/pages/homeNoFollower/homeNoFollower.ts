import {Component, OnInit} from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { MotivationSelectPage } from '../motivationSelect/motivationSelect';
import { RestProvider } from '../../providers/rest/rest';
import {LoginPage} from "../login/login";

declare var jquery:any;
declare const $;

@Component({
  selector: 'page-homeNoFollower',
  templateUrl: 'homeNoFollower.html'
})

export class HomeNoFollowerPage implements OnInit {

  arisData={ userId: '' };

  arr: any;
  date: any;
  daysInThisCalendar: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  coloredDays: any;
  currentYear: any;
  currentDate: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;

  /** for segment tab **/
  appType = 'follower-tab';

  /** end of segment tab **/

  /**constructor **/
  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController,
              public navCtrl: NavController, public restProvider : RestProvider) {

    var sessionData = localStorage.getItem('userData');
    console.log("session"+sessionData)
    this.arisData.userId=sessionData;
    if(sessionData){
      console.log(this.arisData);
      this.getCalendarColor(this.arisData);
    }else {
      this.goToOtherPage(LoginPage);
    }


  }

  goToOtherPage(page) {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(page);
  }

  /** jquery **/
  ngOnInit(){
    function sticky_relocate() {
      var window_top = $('.scroll-content').scrollTop();

      if (window_top > 40) {
        $('#imgscroll').addClass('user-card-image-scroll');
        $('#imgcirclescroll').removeClass('image-circle-box');
        $('#sticky-anchor').height($('#imgscroll').outerHeight());

        if (window_top > 390) {
          $('#sticky').addClass('stick');
          $('#sticky-anchor').height($('#sticky').outerHeight());
          $('ion-segment').addClass('resize-ion-segment');
        }
        else{
          $('#sticky').removeClass('stick');
          $('ion-segment').removeClass('resize-ion-segment');
        }
      }

      else {
        $('#imgscroll').removeClass('user-card-image-scroll');
        $('#sticky-anchor').height(0);
        $('#imgcirclescroll').addClass('image-circle-box');
      }
    }

    $(function() {
      $('.scroll-content').scroll(sticky_relocate);
      sticky_relocate();
    });

    $(document).ready(function() {
      $('.supportbuttondiv').show();
      $('.closebuttondiv').hide();
      $('.speakerpink').hide();
      $('.speakergray').hide();
      $('.speakergreen').hide();


      var elems = document.getElementsByClassName("supportbuttondiv");
      Array.from(elems).forEach(v => v.addEventListener('click', function() {
        this.parentElement.getElementsByClassName('speakerpink')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('speakergreen')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('speakergray')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('closebuttondiv')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('supportbuttondiv')[0].classList.toggle('hidden');


        this.parentElement.getElementsByClassName('speakerpink')[0].classList.add('show');
        this.parentElement.getElementsByClassName('speakergreen')[0].classList.add('show');
        this.parentElement.getElementsByClassName('speakergray')[0].classList.add('show');
        this.parentElement.getElementsByClassName('closebuttondiv')[0].classList.add('show');

        this.parentElement.getElementsByClassName('speakerpink')[0].classList.remove('disappearspeaker');
        this.parentElement.getElementsByClassName('speakergreen')[0].classList.remove('disappearspeaker');
        this.parentElement.getElementsByClassName('speakergray')[0].classList.remove('disappearspeaker');
        this.parentElement.getElementsByClassName('closebuttondiv')[0].classList.remove('disappearspeaker');

      }));

      var closediv = document.getElementsByClassName("closebuttondiv");
      Array.from(closediv).forEach(closeV => closeV.addEventListener('click', function() {
        this.parentElement.getElementsByClassName('speakerpink')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('speakergreen')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('speakergray')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('closebuttondiv')[0].classList.toggle('show');
        this.parentElement.getElementsByClassName('supportbuttondiv')[0].classList.toggle('hidden');
      }));
    });

  }
/*
  ionViewWillEnter() {

  }*/

  getCalendarColor(data) {
    this.restProvider.getCalendarColor(data).then((result) => {
      console.log("result"+result);
      this.arr=result;
      console.log("this.arr"+this.arr[0].feeling_type)
      this.date = new Date();
      this.getDaysOfMonth();
      console.log(this.arr);
    }, (err) => {
      console.log(err);
    });
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.daysInThisCalendar = new Array();
    this.currentYear = this.date.getFullYear();

    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    console.log(this.date.getMonth())
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    console.log("firstDayThisMonth:"+firstDayThisMonth);
    var dayToday = new Date().getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    console.log("prevNumOfDays:"+prevNumOfDays);
    var daysBefore = (firstDayThisMonth+this.currentDate-1)/7;
    console.log("daysBefore"+daysBefore)
    var weeksForLastMonth = 4-Math.floor(daysBefore);
    console.log("weeksForLastMonth:"+weeksForLastMonth);

    console.log(prevNumOfDays-(firstDayThisMonth-1+(weeksForLastMonth*7)));

    if(this.date.getMonth()==0){
      for(var i = prevNumOfDays-(firstDayThisMonth-1+(weeksForLastMonth*7)); i <= prevNumOfDays; i++) {
        if(i<1){
          var lastDayLastLastMonth = new Date(this.date.getFullYear()-1, this.date.getMonth()+11, 0).getDate();
          console.log("lastDayLastLastMonth"+lastDayLastLastMonth);
          this.daysInLastMonth.push({date: this.formatDate(lastDayLastLastMonth+i,this.date.getMonth()+12,this.date.getFullYear()-1),
            day: lastDayLastLastMonth+i,
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }else {
          this.daysInLastMonth.push({date: this.formatDate(i,this.date.getMonth()+12,this.date.getFullYear()-1),
            day: i,
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }
      }
    }else if (this.date.getMonth()==1){
      for(var i = prevNumOfDays-(firstDayThisMonth-1+(weeksForLastMonth*7)); i <= prevNumOfDays; i++) {
        if(i<1){
          var lastDayLastLastMonth = new Date(this.date.getFullYear()-1, this.date.getMonth()+11, 0).getDate();
          console.log("lastDayLastLastMonth"+lastDayLastLastMonth);
          this.daysInLastMonth.push({date: this.formatDate(lastDayLastLastMonth+i,this.date.getMonth()+11,this.date.getFullYear()-1),
            day: lastDayLastLastMonth+i,
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        } else {
          this.daysInLastMonth.push({date: this.formatDate(i,this.date.getMonth(), this.date.getFullYear()),
            day: i,
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }
      }
    }else {
      for(var i = prevNumOfDays-(firstDayThisMonth-1+(weeksForLastMonth*7)); i <= prevNumOfDays; i++) {
        if(i<1){
          console.log("here" +
            "hert")
          var lastDayLastLastMonth = new Date(this.date.getFullYear(), this.date.getMonth()-1, 0).getDate();
          console.log("lastDayLastLastMonth"+lastDayLastLastMonth);
          this.daysInLastMonth.push({date: this.formatDate(lastDayLastLastMonth+i,this.date.getMonth()+12,this.date.getFullYear()),
            day: lastDayLastLastMonth+i,
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        } else {
          this.daysInLastMonth.push({date: this.formatDate(i,this.date.getMonth(), this.date.getFullYear()),
            day: i,
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }
      }
    }


    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    var lastDayCalendar = this.currentDate-dayToday+6;

    console.log(thisNumOfDays);
    console.log(lastDayCalendar);

    if(lastDayCalendar > thisNumOfDays){
      for (var j = 0; j < thisNumOfDays; j++) {
        if(this.currentDate == (j+1)){
          this.daysInThisMonth.push({date: '',
            day: (j+1),
            isToday: true,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }else if(this.currentDate < (j+1)){
          this.daysInThisMonth.push({date: this.formatDate((j+1),this.date.getMonth()+1, this.date.getFullYear()),
            day: (j+1),
            isToday: false,
            isFuture: true,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }else{
          this.daysInThisMonth.push({date: this.formatDate((j+1),this.date.getMonth()+1, this.date.getFullYear()),
            day: (j+1),
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }
      }
    }else{
      for (var j = 0; j < this.currentDate+6-dayToday; j++) {
        if(this.currentDate == (j+1)){
          this.daysInThisMonth.push({date: '',
            day: (j+1),
            isToday: true,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }else if(this.currentDate < (j+1)){
          this.daysInThisMonth.push({date: this.formatDate((j+1),this.date.getMonth()+1, this.date.getFullYear()),
            day: (j+1),
            isToday: false,
            isFuture: true,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }else{
          this.daysInThisMonth.push({date: this.formatDate((j+1),this.date.getMonth()+1, this.date.getFullYear()),
            day: (j+1),
            isToday: false,
            isFuture: false,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }

      }
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();

    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length;

    if(totalDays<35) {
      if(this.date.getMonth()==11){
        for(var l = 1; l < (7-lastDayThisMonth); l++) {
          this.daysInNextMonth.push({date: this.formatDate(l,this.date.getMonth()-10, this.date.getFullYear()+1),
            day: l,
            isToday: false,
            isFuture: true,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }
      }else{
        for(var l = 1; l < (7-lastDayThisMonth); l++) {
          this.daysInNextMonth.push({date: this.formatDate(l,this.date.getMonth()+2, this.date.getFullYear()),
            day: l,
            isToday: false,
            isFuture: true,
            isSoHappy: false,
            isHappy: false,
            isNormal: false,
            isBad: false,
            isSoBad: false});
        }
      }

    }

    this.daysInThisCalendar = this.daysInThisCalendar.concat(this.daysInLastMonth, this.daysInThisMonth, this.daysInNextMonth);
    var soHappy = false;
    var happy = false;
    var normal = false;
    var bad = false;
    var soBad = false;

    for(var k = 0; k < this.arr.length; k++) {
      for (var l = 0; l < this.daysInThisCalendar.length; l++) {


        console.log(this.arr[k].feeling_type);
        if (this.arr[k].activity_date == this.daysInThisCalendar[l].date) {

          console.log(this.daysInThisCalendar[l].date)
          console.log(this.arr[k].activity_date);
          console.log("equal once")
          if (this.arr[k].feeling_type == 1) {
            soHappy = true;
            happy = normal = bad = soBad = false;
          } else if (this.arr[k].feeling_type == 2) {
            happy = true;
            soHappy = normal = bad = soBad = false;
          } else if (this.arr[k].feeling_type == 3) {
            normal = true;
            soHappy = happy = bad = soBad = false;
          } else if (this.arr[k].feeling_type == 4) {
            bad = true;
            soHappy = happy = normal = soBad = false;
          } else if (this.arr[k].feeling_type == 5) {
            soBad = true;
            soHappy = happy = normal = bad = false;
          }
          this.daysInThisCalendar[l].isSoHappy = soHappy;
          this.daysInThisCalendar[l].isHappy = happy;
          this.daysInThisCalendar[l].isNormal = normal;
          this.daysInThisCalendar[l].isBad = bad;
          this.daysInThisCalendar[l].isSoBad = soBad;
            break;


        }


      }
    }
    for(var k = 0; k < this.daysInThisCalendar.length; k++) {
      if(this.daysInThisCalendar[k].isToday==true && this.daysInThisCalendar[k].isSoHappy==false && this.daysInThisCalendar[k].isHappy==false && this.daysInThisCalendar[k].isNormal==false && this.daysInThisCalendar[k].isBad==false && this.daysInThisCalendar[k].isSoBad==false){
        console.log("this is modal")
        let modal = this.modalCtrl.create(MotivationSelectPage, this.daysInThisCalendar[k]);
        modal.present();
      }
    }

  }

  selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
    this.eventList.forEach(event => {
      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);
      }
    });
  }

  show(day){
    console.log("showday"+day.date);
    if(day.isFuture!=true){
      let modal = this.modalCtrl.create(MotivationSelectPage, day);
      modal.present();
    }

  }

  formatDate(day, month, year){
    var newDay = day;
    var newMonth= month;
    var newYear= year;
    var twoDigit = ['01','02','03','04','05','06','07','08','09'];
    if (day< 10){
      newDay = twoDigit[day-1];
    }
    if(month< 10){
      newMonth = twoDigit[month-1];
    }
    return newYear+"/"+newMonth+"/"+newDay;

  }

}
