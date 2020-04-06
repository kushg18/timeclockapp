import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router }from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    }
    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    } 
    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {
        cssClass: "alert alert-danger",
        timeout: 3000
      });
      return false;
    } 

    // Register User
    this.authService.registerUser(user)
    .subscribe( data => {
      // console.log(data);
      // console.log(data.success);
      if(data.success){
        this.flashMessage.show('You are now registered and can log in.', {
          cssClass: "alert alert-success",
          timeout: 3000
        });
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Something went wrong.', {
          cssClass: "alert alert-danger",
          timeout: 3000
        });
        this.router.navigate(['/register']);
      }
    });
  }
}