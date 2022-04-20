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

  private getOrder() {
    this.route.params.subscribe((params: any) => {
      if (params['id'] != '') {
        this.connection.getOrder(params['id']).subscribe({
          next: (order: any) => {
            this.order = new Order(order._id, order.username, order.productname, order.itemcount, order.status, order.iscompleated);
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
  msg: string;
  toggle: boolean
  order?: Order;

}
