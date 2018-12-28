import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Users } from '../../Users';
import { UserActivities } from '../../UserActivities';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  users: Users[] = []
  userActivities: UserActivities[] = []


  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getUsers()
    .subscribe( users => {
      // console.log(users);
      this.users = users;
    },
    err => {
      // console.log(err);
      return false;
    });
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  }

  getActivities(user){
    // console.log("Getting activities for: ",user);
    this.authService.getUserActivities(user)
    .subscribe( data => {
      this.userActivities = data;
    });
    this.closeNav();
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
