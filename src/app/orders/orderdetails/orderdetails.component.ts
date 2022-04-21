import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ConnectionService } from 'app/utils/connection.service';
import { Order } from '../Order';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private connection: ConnectionService,
    private userService: UserService
  ) {
    this.order = undefined;
    this.userName = "";
    this.productName = "";
    this.itemcount = 0;
    this.status = "";
    this.iscompleated = false;
    this.created_at = "";
    this.updated_at = "";
    this.msg = "";
    this.toggle = false;

  }

  ngOnInit(): void {
    this.getOrder();
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  toggleAdd(): void {
    this.toggle = !this.toggle
    if (this.order) {
      this.status = this.order?.getStatus();
    }
  }

  submitUpdate(): void {
    if (this.order != undefined) {
      this.connection.putOrder(this.order?.getId(), this.status).subscribe({
        next: (v) => { },
        error: (e) => { if(e) this.msg = e.error },
        complete: () => {
          this.getOrder();
          this.msg = "Succesfully updated: " + this.order?.getId();
        }
      })
    } else {
      this.msg = "This isn't supposed to happen: No product found!"
    }
  }

  submitDelete(): void {
    if (this.order != undefined) {
      this.connection.deleteOrder(this.order?.getId()).subscribe({
        next: (v) => { },
        error: (e) => { if(e) {this.msg = e.error.text; console.log(e.error.text)} },
        complete: () => {
          this.msg = "Succesfully deleted"
        }
      })
    } else {
      this.msg = "This isn't supposed to happen: Product already not found!"
    }
  }

  private getOrder() {
    this.route.params.subscribe((params: any) => {
      if (params['id'] != '') {
        this.connection.getOrder(params['id']).subscribe({
          next: (order: any) => {
            console.log(order)
            this.order = new Order(order._id, order.username, order.productname, order.itemcount, order.status, order.iscompleated);
            this.created_at = order.created_at;
            this.updated_at = order.updated_at;
          },
          error: (e) => console.error(e.error),
          complete: () => console.info('complete')
        });
      }
    });
  }

  userName: string;
  productName: string;
  itemcount: number;
  status: string;
  iscompleated: boolean;
  created_at: string;
  updated_at: string;
  msg: string;
  toggle: boolean
  order?: Order;

}
