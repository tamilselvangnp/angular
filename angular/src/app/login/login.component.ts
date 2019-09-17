import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form1;
  constructor(public route: Router, private auth: AuthorizationService) { }

  ngOnInit() {
    this.form1 = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  login1(){
  this.auth.Login(this.form1.value).subscribe(data => {
    this.route.navigate(['/display']);
});
  }

  logout(){  this.auth.logout() }
}
