import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'app/services/user.service';
import { ConnectionService } from 'app/utils/connection.service';

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
      private userService: UserService,
      private connectionService: ConnectionService
    ) {
    this.username = '';
    this.password = '';
    this.msg = '';
  }
  
  ngOnInit(): void { }

  login() {
    console.log(this.username + " " + this.password)

    if (this.username && this.password) {
      this.connectionService.postLogin(this.username, this.password).subscribe({
        next: (v) => {
          this.userService.loginUser(this.username)
        },
        error: (e) => { if(e) this.msg = e.error },
        complete: () => this.router.navigate(['/products']) 
      })
    }
  }

}
