import { Injectable } from '@angular/core';
import { ConnectionService } from 'app/utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userLogin: boolean = false;
  private userAuthLevel: string = "basic";
  private userName: string = "";

  constructor(
    private connection: ConnectionService
  ) {}

  loginUser() {
    this.connection.getOwnUser().subscribe({
      next: (user: any) => {
        this.userName = user.username;
        this.userAuthLevel = user.accessLevel;
      },
      error: (e) => console.error(e.error),
      complete: () => console.info('complete')
    });
    this.userLogin = true;
  }

  logOutUser() {
    this.userLogin = false;
    this.userName = "";
  }

  isUserLoggedIn() {
    return this.userLogin;
  }

  getUserName(): string {
    return this.userName;
  }

  isAdmin(): boolean {
    return this.userAuthLevel == "admin";
  }
  
}
