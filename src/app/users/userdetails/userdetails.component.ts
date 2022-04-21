import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ConnectionService } from 'app/utils/connection.service';
import { User } from '../User';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private connection: ConnectionService,
    private userService: UserService
  ) {
    this.user = undefined;
    this.userList = [];
    this.userName = "";
    this.email = "";
    this.wallet = 0;
    this.accessLevel = "";
    this.msg = "";
    this.toggle = false;
    this.allUserToggle = false;
  }

  ngOnInit(): void {
    this.getUser();
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  toggleAdd(): void {
    this.toggle = !this.toggle;
    if (this.user) {
      this.wallet = this.user?.getWallet();
    }
  }

  toggleAllUser() {
    if (this.userService.isAdmin()) {
      this.allUserToggle = !this.allUserToggle;
      this.getUsers();
    }
  }

  submitUpdate(): void {
    if (this.user != undefined) {
      this.connection.putWalletUser(this.user?.getUserName(), this.wallet).subscribe({
        next: (v) => { },
        error: (e) => { if(e) this.msg = e.error },
        complete: () => {
          this.getUser();
          this.msg = "Succesfully updated: " + this.wallet;
        }
      })
    } else {
      this.msg = "This isn't supposed to happen: No product found!"
    }
  }

  submitDelete(): void {
    if (this.user != undefined) {
      this.connection.deleteOrder(this.user?.getUserName()).subscribe({
        next: (v) => { },
        error: (e) => { if(e) {this.msg = e.error.text; console.log(e.error.text)} },
        complete: () => {
          this.msg = "Succesfully deleted user"
        }
      })
    } else {
      this.msg = "This isn't supposed to happen: Product already not found!"
    }
  }

  private getUser() {
    this.route.params.subscribe((params: any) => {
      if (params['id'] != undefined && params['id'] != '') {
        this.connection.getUser(params['id']).subscribe({
          next: (user: any) => {
            this.user = new User(user._id, user.username, user.email, user.wallet, user.accessLevel);
          },
          error: (e) => console.error(e.error),
          complete: () => console.info('complete')
        });
      } else {
        this.connection.getOwnUser().subscribe({
          next: (user: any) => {
            this.user = new User(user._id, user.username, user.email, user.wallet, user.accessLevel);
          },
          error: (e) => console.error(e.error),
          complete: () => console.info('complete')
        });
      }
    });
  }

  private getUsers() {
    this.userList = [];
    this.connection.getUsers().subscribe({
      next: (users) => {
        this.fillUserArray(users)
      },
      error: (e) => console.error(e.error),
      complete: () => console.info('complete')
    });
  }

  private fillUserArray(users: any): void {
    for (const user of users) {
      this.userList.push(
        new User(user._id, user.username, user.email, user.wallet, user.accessLevel));
    }
  }

  userName: string;
  email: string;
  wallet: number;
  accessLevel: string;
  msg: string;
  toggle: boolean
  allUserToggle: boolean

  user?: User;
  userList: Array<User>;

}
