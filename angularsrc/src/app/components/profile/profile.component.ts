import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserActivities } from '../../UserActivities';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userLastThreeDateActivities: UserActivities[] = []
  user: Object;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile()
    .subscribe( profile => {
      this.user = profile.user;
      // console.log(this.user);
      this.getActivities();
    },
    err => {
      // console.log(err);
      return false;
    });
  }

  getActivities(){
    this.authService.getUserActivities(this.user)
    .subscribe( data => {
      this.userLastThreeDateActivities = []
      let current = new Date();
      let yesterday = new Date();
      let dayBeforeYest = new Date();
      yesterday.setDate(current.getDate() - 1);
      dayBeforeYest.setDate(yesterday.getDate() - 1);
      let lastThreeDates = [current.getDate(), yesterday.getDate(), dayBeforeYest.getDate()];
      let lastThreeMonths = [current.getMonth(), yesterday.getMonth(), dayBeforeYest.getMonth()];
      let lastThreeYears = [current.getFullYear(), yesterday.getFullYear(), dayBeforeYest.getFullYear()];
      for(let entry of data){
        let entryDate = new Date(entry.date);
        if(lastThreeDates.includes(entryDate.getDate()) 
            && lastThreeMonths.includes(entryDate.getMonth())
            && lastThreeYears.includes(entryDate.getFullYear())){
              this.userLastThreeDateActivities.push(entry);
        }
      }
    });
  }

  reverseArray(array){
    return array.slice(0).reverse();
  }

  getDay(date){
    let temp = new Date(date);
    let weekday = [
      "Sunday",
      "Monday", 
      "Tuesday", 
      "Wednesday", 
      "Thursday", 
      "Friday", 
      "Saturday",
      ];
    return weekday[temp.getDay()];
    // return "";
  }
}
