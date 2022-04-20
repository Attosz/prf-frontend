import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ConnectionService } from 'app/utils/connection.service';
import { Order } from './Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private connection: ConnectionService,
    private userService: UserService
  ) {
    this.userName = "";
    this.productName = "";
    this.itemcount = 0;
    this.status = "";
    this.iscompleated = false;
    this.msg = "";
    this.toggle = false;
    this.orderList = []
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.orderList = [];
    this.connection.getOrders().subscribe({
      next: (orders) => {
        this.fillOrderArray(orders)
      },
      error: (e) => console.error(e.error),
      complete: () => console.info('complete')
    });
  }

  private fillOrderArray(orders: any): void {
    for (const order of orders) {
      this.orderList.push(
        new Order(order._id, order.username, order.productname, order.itemcount, order.status, order.iscompleated));
    }
  }


  userName: string;
  productName: string;
  itemcount: number;
  status: string;
  iscompleated: boolean;
  msg: string;
  toggle: boolean
  orderList: Array<Order>;

}
