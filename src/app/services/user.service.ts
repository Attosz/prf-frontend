import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userLogin: boolean = false;
  private userName: string = "";
  constructor() {}

  loginUser(username: string) {
    this.userLogin = true;
    this.userName = username;
  }

  isUserLoggedIn() {
    return this.userLogin;
  }

  getUserName(): string {
    return this.userName;
  }
  
}
