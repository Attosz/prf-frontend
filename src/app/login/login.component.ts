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

  constructor(
      private router: Router,
      private userService: UserService,
      private connectionService: ConnectionService
    ) {
    this.username = '';
    this.password = '';
    this.msg = '';
    this.email = '';
    this.toggle = false;
  }
  
  ngOnInit(): void { }

  isUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  toggleView(): void {
    this.toggle = !this.toggle;
  }

  registerUser() {
    this.connectionService.postUser(this.username, this.password, this. email).subscribe({
      next: (v) => {
        this.userService.loginUser();
      },
      error: (e) => { if(e) this.msg = e.error },
      complete: () => this.toggleView()
    })
  }

  login(): void {
    if (this.username && this.password) {
      this.connectionService.postLogin(this.username, this.password).subscribe({
        next: (v) => {
          this.userService.loginUser();
        },
        error: (e) => { if(e) this.msg = e.error },
        complete: () => this.router.navigate(['/products']) 
      })
    }
  }

  logout(): void {
    if (this.isUserLoggedIn()) {
      this.connectionService.postLogout().subscribe({
        next: (v) => {
          this.userService.logOutUser()
          console.log("LoggedOut")
        },
        error: (e) => { if(e) this.msg = e.error },
        complete: () => {}
      })
    } else {
      this.msg = "User not logged in"
    }
  }

  username: string;
  password: string;
  msg: string;
  email: string;
  toggle: boolean;

}
