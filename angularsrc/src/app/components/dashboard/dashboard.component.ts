import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserActivities } from '../../UserActivities';
import { BrowserViewportScroller } from '@angular/common/src/viewport_scroller';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
  interval;
  user: Object;
  userActivities: UserActivities[] = []

  punchIn: boolean = true;
  punchOut: boolean = false;
  breakIn: boolean = true;
  breakOut: boolean = false;
  lunchIn: boolean = true;
  lunchOut: boolean = false;
  date: Date;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) {
      this.authService.getProfile()
      .subscribe( profile => {
        this.user = profile.user;
        this.getActivities();
      },
      err => {
        // console.log(err);
        return false;
      });
  }

  ngOnInit(){
    this.interval = setInterval(this.clock, 1000); 
    this.clock();
  }

  ngOnDestroy(){
    if(this.interval){
      clearInterval(this.interval);
    }
  }

  storeActivity(actType, time){
    this.authService.addUserActivity(this.user, actType, this.date, time)
    .subscribe( data => {
      if(data.success){
        this.flashMessage.show(actType, {
          cssClass: "alert alert-success",
          timeout: 2000
        });
      }else{
        this.flashMessage.show('Something went wrong.', {
          cssClass: "alert alert-danger",
          timeout: 2000
        });
      }
      this.getActivities();
    });
  }

  getActivities(){
    this.authService.getUserActivities(this.user)
    .subscribe( data => {
      this.userActivities = []
      let date = new Date();
      let currentDate = date.getDate();
      let currentMonth = date.getMonth();
      let currentYear = date.getFullYear();
      // console.log("Current Day: ", currentDate);
      for(let entry of data){
        let entryDate = new Date(entry.date);
        if(entryDate.getDate() == currentDate 
            && entryDate.getMonth() == currentMonth
            && entryDate.getFullYear() == currentYear){
              this.userActivities.push(entry);
        }
      }
      // this.userActivities = data;
      if(!(this.userActivities === undefined || this.userActivities.length == 0)){
        let lastActivity = this.userActivities[this.userActivities.length - 1]["activityType"];
        if(lastActivity == "Punch In"){
          this.setPunchInElems();
        }else if(lastActivity == "Lunch In"){
          this.setLunchInElems();
        }else if(lastActivity == "Break In"){
          this.setBreakInElems();
        }else{
          // console.log("Setting checkouts");
          this.checkedOut();
        }
      }
    });
    // var scroller = document.querySelector("#scrollBody");
    // scroller.scrollTop = scroller.scrollHeight - scroller.clientHeight;
  }

  reverseArray(array){
    return array.slice(0).reverse();
  }

  punchedIn(){
    var actType = "Punch In";
    this.date = new Date();
    let punchInTime = this.beautifyTime(this.date);
    this.storeActivity(actType, punchInTime);
  }

  setPunchInElems(){
    this.punchIn = false;
    this.punchOut = true;
    this.breakIn = false;
    this.breakOut = false;
    this.lunchIn = false;
    this.lunchOut = false;
  }

  punchedOut(){
    var actType = "Punch Out";
    this.date = new Date();
    let punchOutTime = this.beautifyTime(this.date);
    this.storeActivity(actType, punchOutTime);
  }

  lunchedIn(){
    var actType = "Lunch In";
    this.date = new Date();
    let lunchInTime = this.beautifyTime(this.date);
    this.storeActivity(actType, lunchInTime);
  }

  setLunchInElems(){
    this.punchIn = false;
    this.punchOut = false;
    this.breakIn = false;
    this.breakOut = false;
    this.lunchIn = false;
    this.lunchOut = true;
  }

  lunchedOut(){
    var actType = "Lunch Out";
    this.date = new Date();
    let lunchOutTime = this.beautifyTime(this.date);
    this.storeActivity(actType, lunchOutTime);
  }

  breakedIn(){
    var actType = "Break In";
    this.date = new Date();
    let breakInTime = this.beautifyTime(this.date);
    this.storeActivity(actType, breakInTime);
  }

  setBreakInElems(){
    this.punchIn = false;
    this.punchOut = false;
    this.breakIn = false;
    this.breakOut = true;
    this.lunchIn = false;
    this.lunchOut = false;
  }

  breakedOut(){
    var actType = "Break Out";
    this.date = new Date();
    let breakOutTime = this.beautifyTime(this.date);
    this.storeActivity(actType, breakOutTime);
  }

  checkedOut(){
    this.punchIn = true;
    this.punchOut = false;
    this.breakIn = true;
    this.breakOut = false;
    this.lunchIn = true;
    this.lunchOut = false
  }

  beautifyTime(date){
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    var hour1 = ("0" + hour).slice(-2);
    var minute1 = ("0" + minute).slice(-2);
    var second1 = ("0" + second).slice(-2);
    return hour1+":"+minute1+":"+second1+" "+ampm;
  }

  clock(){
    let weekday = [
        "Sunday",
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday",
        ];

    this.date = new Date();
    let day = weekday[this.date.getDay()];
    let dd = this.date.getDate();
    let mm = (this.date.getMonth()+1); //January is 0!
    let yyyy = this.date.getFullYear();
    
    let dd1 = ("0" + dd).slice(-2); 
    let mm1 = ("0" + mm).slice(-2); 
    let today = dd1 + '/' + mm1 + '/' + yyyy;

    var hour = this.date.getHours();
    var minute = this.date.getMinutes();
    var second = this.date.getSeconds();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    var hour1 = ("0" + hour).slice(-2);
    var minute1 = ("0" + minute).slice(-2);
    var second1 = ("0" + second).slice(-2);

    document.getElementById('hour').innerHTML = hour1;
    document.getElementById('minute').innerHTML = ":"+minute1;
    document.getElementById('second').innerHTML = ":"+second1;
    document.getElementById('ampm').innerHTML = " "+ampm;
    document.getElementById('day').innerHTML = day;
    document.getElementById('date').innerHTML = today;
  }

}


