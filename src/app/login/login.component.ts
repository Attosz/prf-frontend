import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  msg: string;

  constructor(
      private router: Router,
      private userService: UserService
    ) {
    this.username = '';
    this.password = '';
    this.msg = '';
  }
  
  ngOnInit(): void { }

  login() {
    console.log(this.username + " " + this.password)
    if (this.username && this.password) {
      // most még csak statikus, hogy szerver oldalról ne kelljen a cors-al foglalkozni, a végleges logint a következő, teljes stack összeállítást bemutató órán nézzük meg
      if (this.username === 'user' && this.password === 'valami') {
        this.userService.loginUser(this.username);
        this.router.navigate(['/products']);
      } else {
        this.msg = 'Username or Password is incorrect';
      }
    }
  }

}
